// //howler test
// var v_backpiano_loop = new Howl({
//     src: ["wav/v_backpiano_loop.wav"],
//     loop: true,
//     volume: 0.5,
//     onload: function(){
//         console.log("backpiano ready");
//         backpiano_ready = true;
//     }
// });

// var v_piano_loop = new Howl({
//     src: ["wav/v_piano_loop.wav"],
//     loop: true,
//     volume: 0.5,
//     onload: function(){
//         console.log("piano ready");
//         piano_ready = true;
//     }
// })

// var sprite = new Howl({
//     src: ["wav/sprite_gtr.wav"],
//     sprite: {
//         tick: [250, 500],
//         tock: [2500, 250]
//     },
//     loop: false,
//     volume: 0.1
// });

// // id_tick = sound.play("tick");
// // id_tock = sound.play("tock");

// backpiano_ready = false;
// piano_ready = false;


//using timbre.js
var v_backpiano_loop = T("audio", {loop:true}).loadthis("wav/v_backpiano_loop.wav", function() {
    console.log("asdf");
});
var v_piano_loop = T("audio", {loop:true}).loadthis("wav/v_piano_loop.wav");
var master_play;

$.when(v_piano_loop, v_backpiano_loop).then(function() {
    // master_play = T("+", v_piano_loop, v_backpiano_loop).play();


});

var sprite_src = T("audio").loadthis("wav/sprite_gtr.wav");
// var sprite = sprite_src.slice("250, 500").bang();
var sprite;
$.when(sprite_src.isLoaded).then(function() {
    console.log("sprite src loaded");
    sprite = sprite_src.slice(250, 500);
    sprite.play();
})

var metro = T("interval", {interval: "BPM 240 L4"}, function(count){
    sprite = sprite_src.slice(250, 500);
    sprite.play();
    console.log("bang" + count);
}).start();

//metronome based on SO 20954650
var m_tempo = 232;
var m_signature = 5+8;
var m_callback = function(signature, beat) {
    console.log(beat);
    // if (beat == signature) {
    //     sprite.play("tick");
    // }
    // else{
    //     sprite.play("tock");
    // }

}
// var m = new Metronome(m_tempo, m_signature, m_callback);
var m = new Metronome({
    tempo: m_tempo,
    // signature: m_signature,
    callback: m_callback
});

// function startAll() {
//     // m.start();
//     v_backpiano_loop.play();
//     v_piano_loop.play();
// }

// function stopAll() {
//     // m.stop();
//     v_backpiano_loop.stop();
//     v_piano_loop.stop();
// }

