/**
    Helper functions
**/

//BPM to milliseconds
function btom(bpm) {
    return Math.round(((60/bpm)*1000)*100000) / 100000;
}