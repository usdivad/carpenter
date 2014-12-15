//encapsulate it all in a fn later
function AudioEngine(options) {
    // this.vars = {
    //     'loops': [],
    //     'pads': []
    // }
}


/*
    Conductor object. A glorified Metronome.

    Vars:
    - bpm = beats per minute (tempo)
    - timesig = time signature; currently includes multiple bars, e.g. 4 bars of 13/4 makes a timesig of 13*4=52
    - players = an array of loops
    - function_downbeat = function that is called on beat 1 of the bar
    - function_upbeat = function that is called on every other beat of the bar
    - function_stop = function that is called when metronome is stopped
*/

//Constructor
function Conductor(bpm, timesig, players, function_downbeat, function_upbeat, function_stop) {
    var conductor = this;
    this.bpm = bpm;
    this.timesig = timesig;
    this.interval = "BPM" + this.bpm + " L4";
    console.log(this.bpm);
    this.players = players;

    // this.toNextSection = false;

    //functions
    this.function_stop = function_stop;
    this.function_downbeat = function_downbeat;
    this.function_upbeat = function_upbeat;

    //metro construct (use "conductor" not "this" to point at Conductor)
    var timesig = this.timesig;
    this.metro = T("interval", {interval: conductor.interval}, function(count) {
        var beat = count % timesig;
        if (beat == 0) {
            timesig = conductor.timesig;
            conductor.function_downbeat();
            // console.log("beep");
        }
        else {
            conductor.function_upbeat();
            // console.log("boop");
        }
        console.log(beat);
    });
}

Conductor.prototype.start = function() {
    this.metro.start();
}
Conductor.prototype.stop = function() {
    this.function_stop();
    this.metro.stop();
}

Conductor.prototype.setTimesig = function(timesig) {

}

// Conductor.prototype.setFunctionDownbeat = function(fn) {
//     this.function_downbeat = fn;

//     var function_downbeat = this.function_downbeat;
//     var function_upbeat = this.function_upbeat;
//     var function_stop = this.function_stop;
//     var timesig = this.timesig;

//     console.log("resetting metro");
//     function_stop();
//     this.metro.stop();
//     this.metro = T("interval", {interval: this.interval}, function(count) {
//         if (count % timesig == 0) {
//             function_downbeat();
//             // console.log("zero");
//         }
//         else {
//             function_upbeat();
//         }
//         console.log(count % timesig);
//     });
//     this.metro.start();
// }

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

    Vars:
    - loop = the looped audio
    - init = the initial audio (first play)
    - initPlayed = whether init has been played yet
    - activated = whether loop is "activated" or not within current cycle (on/off ctrl)

    - mute/unmute is similar to on/off but takes place immediately
*/
function Loop(loop, init) {
    this.loop = to_audio(loop);
    this.init = 0;
    this.initPlayed = true;
    this.activated = true;
    this.url_loop = loop;
    // this.loopPlaying = false;
    if (init == undefined) {
        this.init = this.loop;
        this.url_init = loop;
    }
    else {
        this.init = to_audio(init);
        this.initPlayed = false;
        this.url_init = init;
    }
}

//Play/pause
Loop.prototype.play = function() {
    if (!this.activated) {
        return;
    }
    if (this.initPlayed) {
        //this.init.pause();
        //this.init.currentTime = 0;
        this.loop.play();
        this.loop.bang();
        console.log("playing loop: " + this.url_loop);
    }
    else {
        this.init.play();
        this.init.bang();
        this.initPlayed = true;
        console.log("playing init: " + this.url_init);
    }
}

Loop.prototype.pause = function() {
    this.loop.pause();
    this.init.pause();
    this.initPlayed = false;
}

//Reset; prepare for next play session
Loop.prototype.reset = function() {
    this.loop.currentTime = 0;
    this.init.currentTime = 0;
    this.initPlayed = false;
    this.on();
    this.unmute();
}

//On/off
Loop.prototype.on = function() {
    this.activated = true;
}
Loop.prototype.off = function() {
    this.activated = false;
}

//Volume control
Loop.prototype.setMul = function(mul) {
    this.loop.mul = mul;
    this.init.mul = mul;
}
Loop.prototype.mute = function() {
    this.setMul(0);
}

Loop.prototype.unmute = function() {
    this.setMul(1);
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