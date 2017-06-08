var keys = new Tone.MultiPlayer({
    urls : {
        "hat" : "../samples/hat.wav",
        "kick" : "../samples/kick.wav",
        "snare" : "../samples/snare.wav"
    },
    volume : -10,
    fadeOut : 0.1,
}).toMaster();

var noteNames = ["hat", "snare", 'kick'];


var loop = new Tone.Sequence(function(time, col){
	var column = matrix1.matrix[col];
    for (var i = 0; i < 4; i++){

if (column[i] === 1){
            var vel = Math.random() * 0.5 + 0.5;
            keys.start(noteNames[i], time, 0, "32n", 0, vel);
}
    }
}, [0, 1, 2, 3], "8n");

Tone.Transport.start();

nx.onload = function(){
        nx.colorize("#333");
        matrix2.col = 1;
        matrix2.row = 1;
        matrix1.col = 4;
        matrix1.row = 3;
        matrix1.init();
        matrix2.init();
        matrix1.draw();
        matrix2.draw();
    }
var matrix2 = $('#matrix2');

matrix2.on('click', function(){
    matrix2.val.level === 1 ? loop.start() : loop.stop()
});
