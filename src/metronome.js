/**
    Metronome class

    The callback function operates on signature and beat
    and thus must be of the format function(signature, beat)

**/

//Constructor 
function Metronome(options) {
    this.tempo = options.tempo;
    this.signature = options.signature;
    this.beat = options.signature;
    this.timer = null;
    this.callback = function() {options.callback(this.signature, this.beat);};
}

//Click and queue call each other for each beat
Metronome.prototype.click = function() {
    this.queue();
    this.callback();
    if (this.beat == this.signature) {
        this.beat = 0;
    }
    this.beat++;
};

Metronome.prototype.queue = function() {
    this.timer = setTimeout(this.click.bind(this), (((60/this.tempo)*1000)*100000) / 100000);
};

//Metronome play/pause without resetting beat 
Metronome.prototype.play = function() {
    clearTimeout(this.timer);
    this.queue(this.tempo);
};

Metronome.prototype.pause = function() {
    clearTimeout(this.timer);
};

//Start and stop the entire metronome; resets beat
Metronome.prototype.start = function() {
    this.beat = this.signature;
    this.play()
}
Metronome.prototype.stop = function() {
    this.pause();
    this.beat = this.signature;
}


//Setter functions
Metronome.prototype.setSignature = function(signature) {
    this.signature = signature;
    this.beat = signature;
}

Metronome.prototype.setTempo = function(tempo) {
    this.tempo = tempo;
}

Metronome.prototype.setCallback = function(callback) {
    this.callback = function() {
        callback(this.signature, this.beat);
    }
}