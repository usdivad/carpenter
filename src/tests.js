//howler test
var sound = new Howl({
    src: ['wav/v_backpiano_loop.wav'],
    sprite: {
        tick: [0, 250],
        tock: [23900, 250]
    },
    loop: false,
    volume: 0.5
});

id_tick = sound.play('tick');
id_tock = sound.play('tock');



//metronome based on SO 20954650
var m_tempo = 240;
var m_signature = 5+8;
var m = new Metronome(m_tempo, m_signature);