//encapsulate it all in a fn later
function AudioEngine(options) {
    // this.vars = {
    //     'loops': [],
    //     'pads': []
    // }
}


/*
    Metronome object.

    Vars:
    - bpm = beats per minute (tempo)
    - timesig = time signature
    - function_downbeat = function that is called on beat 1 of the bar
    - function_upbeat = function that is called on every other beat of the bar
*/
function Metronome(bpm, timesig, function_downbeat, function_upbeat) {
    this.bpm = bpm;
    this.timesig = timesig;
    var function_downbeat = function_downbeat;
    var function_upbeat = function_upbeat;
    this.metro = T("interval", {interval: "BPM " + this.bpm + " L4"}, function(count) {
        if (count % timesig == 0) {
            function_downbeat();
            // console.log("zero");
        }
        else {
            function_upbeat();
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

//Constructor
function LoopMaster(loops) {
    this.loops = loops;
    this.master = T("+", loops);
}

//Start and set all loop offsets to 0
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

//Stop and set all loop offsets to 0
LoopMaster.prototype.stop = function() {
    this.master.pause();
    for (var i=0; i<this.loops.length; i++) {
        var loop = this.loops[i];
        loop.currentTime = 0;
    }
}




function to_loop(url) {
    return T("audio", {loop: true}).loadthis(url, function() {
        console.log("Done loading " + url);
    }, function() {
        console.log("Failed to load " + url);
    });
}