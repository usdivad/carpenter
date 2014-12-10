var metro = new Metronome(226, 13, function(){
    console.log("beep!");

    //figuring out metronome sync
    var sprite = sprite_gtr.slice(250, 500);
    sprite.play();

    //NEW looping mechanism
    if (v_piano.playbackState == 1) {
        v_piano.play();
    }
    v_piano.bang();

}, function() {
    console.log("boop.");

    // var sprite = sprite_gtr.slice(1000, 500);
    // sprite.play();
}, function() {
    v_piano.pause();
});

//VERSE
var v_loop_backpiano = to_loop("mp3/v_backpiano_loop.mp3");
var v_loop_piano = to_loop("mp3/v_piano_loop.mp3");
var v_loops = new LoopMaster([v_loop_backpiano, v_loop_piano]);
var sprite_gtr = to_audio("mp3/sprite_gtr.mp3");
var v_piano = to_audio("mp3/v_backpiano_loop.mp3");

//trying out scheduler using loops, sim playing
var all_loaded = false;
var scheduler = window.setInterval(function() {
    v_loops.checkAllLoaded();
    if (v_loops.all_loaded && sprite_gtr.isLoaded) {
        metro.start();
        // v_loops.start();
        window.clearInterval(scheduler);
        console.log("let's play");
    }
    else {
        console.log("not yet");
    }
}, 500)