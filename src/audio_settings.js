//GLOB
// var bpm = btom(232);
var bpm = 232;
var v_timesig = 13 * 4; //13 beats * 4 bars
var c_timesig = 24;

//VERSE
var v_piano = new Loop("mp3/v_piano_loop.mp3", "mp3/v_piano_init.mp3");
var v_backpiano = new Loop("mp3/v_backpiano_loop.mp3");
var v_drums = new Loop("mp3/v_drums_loop.mp3");
var v_arr = [v_piano, v_backpiano, v_drums];

//CHORUS
var c_piano = new Loop("mp3/c_piano_loop.mp3", "mp3/c_piano_init.mp3");
var c_backpiano = new Loop("mp3/c_backpiano_loop.mp3");
var c_drums = new Loop("mp3/c_drums_loop.mp3");
var c_arr = [c_piano, c_backpiano, c_drums];

var sprite_gtr = to_audio("mp3/sprite_gtr.mp3");


//Conductor settings
var loop_arr = v_arr;
var loop_timesig = v_timesig;
var conductor = new Conductor(bpm, loop_timesig, c_arr, function(count) {
    if (count % loop_timesig == 0) {
        pauseLoops(loop_arr);
        playLoops(loop_arr);
    }
    else {
        console.log("boop.");
    }
    //console.log(count % loop_timesig);
}, function() {
    pauseLoops(loop_arr);
});

function toChorus() {
    loop_arr = c_arr;
    loop_timesig = c_timesig;
}

function playLoops(loop_arr) {
    for (var i=0; i<loop_arr.length; i++) {
        loop_arr[i].play();
    }
}

function pauseLoops(loop_arr) {
    for (var i=0; i<loop_arr.length; i++) {
        loop_arr[i].pause();
    }
}
var dbf = function() {
    var sprite = sprite_gtr.slice(250, 500);
    sprite.play();
}

//conductor.setFunctionDownbeat(dbf);

// var v_loop_backpiano = to_loop("mp3/v_backpiano_loop.mp3");
// var v_loop_piano = to_loop("mp3/v_piano_loop.mp3");
// var v_loops = new LoopMaster([v_loop_backpiano, v_loop_piano]);
// var sprite_gtr = to_audio("mp3/sprite_gtr.mp3");
// var v_piano = to_audio("mp3/v_backpiano_loop.mp3");

// //trying out scheduler using loops, sim playing
// var all_loaded = false;
// var scheduler = window.setInterval(function() {
//     v_loops.checkAllLoaded();
//     if (v_loops.all_loaded && sprite_gtr.isLoaded) {
//         metro.start();
//         // v_loops.start();
//         window.clearInterval(scheduler);
//         console.log("let's play");
//     }
//     else {
//         console.log("not yet");
//     }
// }, 500)