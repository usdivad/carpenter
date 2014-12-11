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
    - function_stop = function that is called when metronome is stopped
*/

//Constructor
function Metronome(bpm, timesig, function_downbeat, function_upbeat, function_stop) {
    this.bpm = bpm;
    this.interval = "BPM" + this.bpm + " L4";
    // this.bpm = btom(bpm);
    console.log(this.bpm);
    this.timesig = timesig;

    //functions
    var function_downbeat = function_downbeat;
    var function_upbeat = function_upbeat;
    this.function_stop = function_stop;

    //metro construct
    this.metro = T("interval", {interval: this.interval}, function(count) {
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
    var function_stop = this.function_stop;
    function_stop();
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
    this.all_loaded = false;
}

//Start and set all loop offsets to 0
LoopMaster.prototype.start = function() {
    this.checkAllLoaded();
    if (this.all_loaded) {
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

//Check if all tracks are loaded
LoopMaster.prototype.checkAllLoaded = function() {
    if (this.all_loaded) {
        return true;
    }
    else {
        var all_loaded = true;
        for (var i=0; i<this.loops.length; i++) {
            var loop = this.loops[i];
            if (!loop.isLoaded) {
                console.log(loop);
                all_loaded = false;
                break;
            }
        }
        this.all_loaded = all_loaded;
        return all_loaded;
    }
}

/*
    Loop object.

    Either constructed with an init sound + loop or just loop.
    Note that the loop audio may have a tail as well
*/
function Loop(loop, init) {
    this.loop = to_audio(loop);
    this.init = 0;
    this.initPlayed = true;
    // this.loopPlaying = false;
    if (init !== undefined) {
        this.init = to_audio(init);
        this.initPlayed = false;
    }
}

Loop.prototype.play = function() {
    if (this.initPlayed) {
        //this.init.pause();
        //this.init.currentTime = 0;
        this.loop.play();
        this.loop.bang();
        console.log("playing loop");
    }
    else {
        this.init.play();
        this.initPlayed = true;
        console.log("playing init");
    }
}

Loop.prototype.pause = function() {
    this.loop.pause();
    this.init.pause();
}

Loop.prototype.reset = function() {
    this.loop.currentTime = 0;
    this.init.currentTime = 0;
    this.initPlayed = false;
}

/*
    Audio wrapping; converts audio from URLs to T("audio") objects
*/

//Regular audio
function to_audio(url) {
    return T("audio").loadthis(url, function() {
        console.log("Done loading " + url);
    }, function() {
        console.log("Failed to load " + url);
    });
}

//Loop
function to_loop(url) {
    return T("audio", {loop: true}).loadthis(url, function() {
        console.log("Done loading " + url);
    }, function() {
        console.log("Failed to load " + url);
    });
}


/**
    Helper functions
**/

//BPM to milliseconds
function btom(bpm) {
    // return Math.round(((60/bpm)*1000)*100000) / 100000;
    return (((60/bpm)*1000)*100000) / 100000;
}