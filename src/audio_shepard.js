//Shepard scale

//Constants and ctrl vars
var STEP_MAX = 100;
var STEP_INCREMENT = 2;
var OSC_MUL = 0.25;
var TIMER_INTERVAL = 55;
var curStep = 0;

//Oscillators
var osc55 = new ShepardOsc(55, "bottom");
var osc110 = new ShepardOsc(110, "none");
var osc220 = new ShepardOsc(220, "none");
var osc440 = new ShepardOsc(440, "none");
var osc880 = new ShepardOsc(880, "none");
var osc1760 = new ShepardOsc(1760, "none");
var osc3520 = new ShepardOsc(3520, "top");
// var osc7040 = new ShepardOsc(7040, "top");
var oscillators = [osc55, osc110, osc220, osc440, osc880, osc1760, osc3520];


//Timer to prevent pops? it's at least a little better I think...
// var timer = T("interval", {interval: TIMER_INTERVAL}, function() {
//     setOscs();
// }).start();

//Control
var KEY_UPARROW = 38;
var KEY_DOWNARROW = 40;
$("body").keydown(function(event) {
    var keycode = event.which;

    //up/down
    if (keycode == KEY_UPARROW) {
        if (curStep < STEP_MAX) {
            curStep += STEP_INCREMENT;
        }
        else {
            curStep = 0 + STEP_INCREMENT;
        }
    }
    else if (keycode == KEY_DOWNARROW) {
        if (curStep > 0) {
            curStep -= STEP_INCREMENT;
        }
        else {
            curStep = STEP_MAX - STEP_INCREMENT;
        }
    }

    setOscs();

});

$("#button_play").on("click", function() {
    playAll(oscillators);
});
$("#button_pause").on("click", function() {
    pauseAll(oscillators);
});

//Set oscillator frequencies and amplitudes based on current step
function setOscs() {
    var percentage = curStep / STEP_MAX;
    console.log("percentage = " + percentage);
    for (var i=0; i<oscillators.length; i++) {
        var oscillator = oscillators[i];
        oscillator.osc.freq.value = oscillator.base_freq * (1+percentage);
        if (oscillator.fade == "bottom") {
            oscillator.osc.mul = OSC_MUL * percentage;
            console.log("bottom mul = " + oscillator.osc.mul);
        }
        if (oscillator.fade == "top") {
            oscillator.osc.mul = OSC_MUL * (1-percentage);
            console.log("top mul = " + oscillator.osc.mul);
        }
    }
}

/**
    ShepardOsc object (wraps a T("osc"))
**/
function ShepardOsc(base_freq, fade) {
    this.osc = T("osc", {wave: "sin", freq: base_freq, mul: OSC_MUL});
    this.base_freq = base_freq;
    this.fade = fade;
}

ShepardOsc.prototype.play = function() {
    this.osc.play();
}

ShepardOsc.prototype.pause = function() {
    this.osc.pause();
}


//Works for both Loops and ShepardOscs!
function playAll(arr) {
    for (var i=0; i<arr.length; i++) {
        arr[i].play();
    }
}

function pauseAll(arr) {
    for (var i=0; i<arr.length; i++) {
        arr[i].pause();
    }
}

// function shepardPercentage(percentage) {
//     return 
// }