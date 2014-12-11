//GLOB
// var bpm = btom(232);
var bpm = 232;
var v_timesig = 13 * 4; //13 beats * 4 bars
var c_timesig = 24;


var metro = new Metronome(bpm, c_timesig, function(){
    console.log("beep!");

    //figuring out metronome sync
    var sprite = sprite_gtr.slice(250, 500);
    // sprite.play();

    //NEW looping mechanism
    // if (c_piano.playbackState == 1) {
        // c_piano.play();
    // }
    // c_piano.bang();

    for (var i=0; i<c_arr.length; i++) {
        c_arr[i].play();
    }

}, function() {
    console.log("boop.");

    // var sprite = sprite_gtr.slice(1000, 500);
    // sprite.play();
}, function() {
    for (var i=0; i<c_arr.length; i++) {
        c_arr[i].pause();
    }
});

//VERSE
var v_piano = new Loop("mp3/v_piano_loop.mp3", "mp3/v_piano_init.mp3");

//CHORUS
var c_piano = new Loop("mp3/c_piano_loop.mp3", "mp3/c_piano_init.mp3");
var c_backpiano = new Loop("mp3/c_backpiano_loop.mp3")
var c_drums = new Loop("mp3/c_drums_loop.mp3")
var c_arr = [c_piano, c_backpiano, c_drums];

var sprite_gtr = to_audio("mp3/sprite_gtr.mp3");

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