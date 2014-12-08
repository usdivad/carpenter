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