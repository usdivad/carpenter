//Shepard scale

//Constants and ctrl vars
var STEP_MAX = 100;
var STEP_INCREMENT = 2.5;
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


// //Timer to prevent pops? it's at least a little better I think...
// var timer = T("interval", {interval: TIMER_INTERVAL}, function() {
//     setOscs();
//     if (playing) {
//         playAll(oscillators);
//     }
// }).start();

//Control keys
var KEY_UPARROW = 38;
var KEY_DOWNARROW = 40;
$("body").keydown(function(event) {
    var keycode = event.which;

    //up/down
    if (keycode == KEY_UPARROW) {
        stepForward();
        $("#button_up").css("border-color", "transparent transparent #FF8C00 transparent");
    }
    else if (keycode == KEY_DOWNARROW) {
        stepBackward();
        $("#button_down").css("border-color", "#FF8C00 transparent transparent transparent");
    }
    else {
        return;
    }

    setOscs();
    playAll(oscillators);

}).keyup(function() {
    $("#button_up").css("border-color", "transparent transparent #000000 transparent");
    $("#button_down").css("border-color", "#000000 transparent transparent transparent");

});

//prevent scrolling
document.body.addEventListener("touchmove", function(e) {
    e.preventDefault();
});

//Control buttons
var buttonInterval;
$("#button_up").on("touchstart mousedown", function() {
    clearInterval(buttonInterval); //in case mouseup doesn't register
    stepForward();
    setOscs();
    playAll(oscillators);
    buttonInterval = setInterval(function() {
        stepForward();
        setOscs();
        playAll(oscillators);
    }, 100);
    $(this).css("border-color", "transparent transparent #FF8C00 transparent");
}).on("touchend mouseup", function() {
    clearInterval(buttonInterval);
    $(this).css("border-color", "transparent transparent #000000 transparent");
});

$("#button_down").on("touchstart mousedown", function() {
    clearInterval(buttonInterval);
    stepBackward();
    setOscs();
    playAll(oscillators);
    buttonInterval = setInterval(function() {
        stepBackward();
        setOscs();
        playAll(oscillators);
    }, 100);
    $(this).css("border-color", "#FF8C00 transparent transparent transparent");
}).on("touchend mouseup", function() {
    clearInterval(buttonInterval);
    $(this).css("border-color", "#000000 transparent transparent transparent");
});

function stepForward() {
    if (curStep < STEP_MAX) {
        curStep += STEP_INCREMENT;
    }
    else {
        curStep = 0 + STEP_INCREMENT;
    }
}

function stepBackward() {
    if (curStep > 0) {
        curStep -= STEP_INCREMENT;
    }
    else {
        curStep = STEP_MAX - STEP_INCREMENT;
    }
}

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
    this.osc = T("osc", {wave: "fami", freq: base_freq, mul: OSC_MUL});
    this.env = T("env", {table: [OSC_MUL, [0, 1000]]}, this.osc).on("ended", function() {
        this.pause();
    }).bang();
    this.base_freq = base_freq;
    this.fade = fade;
}

ShepardOsc.prototype.play = function() {
    this.env.play();
    this.env.bang();
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