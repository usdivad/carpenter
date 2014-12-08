//encapsulate it all in a fn later
function AudioEngine(options) {
    // this.vars = {
    //     'loops': [],
    //     'pads': []
    // }
}


function Metronome(bpm, timesig, callback) {
    this.bpm = bpm;
    this.timesig = timesig;
    this.callback = callback;
    this.metro = T("interval", {interval: "BPM " + this.bpm + " L4"}, function(count) {
        // var timesig = this.timesig; //bugged
        var callback = this.callback; //callback still buggy
        if (count % this.timesig == 0) {
            callback();
        }
        console.log(count % timesig);
    });
}

Metronome.prototype.start = function() {
    this.metro.start();
}
Metronome.prototype.stop = function() {
    this.metro.stop();
}

/*
    LoopMaster object handles synchronization of loops for a section
    (the loops themselves exist outside of the LoopMaster object)
*/

//constructor
function LoopMaster(loops) {
    this.loops = loops;
    this.master = T("+", loops);
}

//start and set all loop offsets to 0
LoopMaster.prototype.start = function() {
    var all_loaded = true;
    for (var i=0; i<this.loops.length; i++) {
        var loop = this.loops[i];
        if (!loop.isLoaded) {
            console.log(loop);
            all_loaded = false;
            break;
        }
    }
    if (all_loaded) {
        for (var i=0; i<this.loops.length; i++) {
            var loop = this.loops[i];
            loop.currentTime = 0;
        }
        this.master.play();
    }
    else {
        console.log("loops not yet all loaded; try again later~");
    }
}

//stop and set all loop offsets to 0
LoopMaster.prototype.stop = function() {
    this.master.pause();
    for (var i=0; i<this.loops.length; i++) {
        var loop = this.loops[i];
        loop.currentTime = 0;
    }
}




function to_loop(url) {
    return T("audio", {loop: true}).loadthis(url);
}