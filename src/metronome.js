/**
 Metronome class
 **/

//Constructor 
function Metronome(tempo, signature) {
    this.tempo = tempo;
    this.signature = signature;
    this.beat = signature;
    this.timer = null;
}

//Click and queue call each other for each beat
Metronome.prototype.click = function() {
    this.queue();
    if (this.beat == this.signature) {
        this.beat = 0;
        //sound.play('tick'); //test
    }
    else {
        //sound.play('tock'); //test
    }
    this.beat++;
    console.log(this.beat);
};

Metronome.prototype.queue = function() {
    this.timer = setTimeout(this.click.bind(this), Math.round(((60/this.tempo)*1000)*100000) / 100000);
};

//Start and stop the entire metronome
Metronome.prototype.start = function() {
    clearTimeout(this.timer);
    this.queue(this.tempo);
};

Metronome.prototype.stop = function() {
    clearTimeout(this.timer);
};


//Setter functions
Metronome.prototype.setSignature = function(signature) {
    this.signature = signature;
    this.beat = signature;
}

Metronome.prototype.setTempo = function(tempo) {
    this.tempo = tempo;
}