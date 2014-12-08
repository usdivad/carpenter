var metro = new Metronome(240, 13, function(){
    console.log("beep");
});

//VERSE
var v_loop_backpiano = to_loop("mp3/v_backpiano_loop.mp3");
var v_loop_piano = to_loop("mp3/v_piano_loop.mp3");
var v_loops = new LoopMaster([v_loop_backpiano, v_loop_piano]);