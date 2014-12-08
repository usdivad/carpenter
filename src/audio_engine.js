//encapsulate it all in a fn later
function AudioEngine(options) {
    // this.vars = {
    //     'loops': [],
    //     'pads': []
    // }
}

function metronome(bpm, timesig, callback) {
    return T("interval", {interval: "BPM " + bpm + " L4"}, function(count) {
        var timesig = timesig;
        if (timesig % count == 0) {
            (function() {
                callback();
            })();
        }
    });
}


function to_loops(url) {
    return T("audio", {loop: true}).loadthis(url);
}