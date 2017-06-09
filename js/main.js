var keys = new Tone.MultiPlayer({
    urls : {
        "hat" : "../samples/hat.wav",
        "snare" : "../samples/snare.wav",
        "kick" : "../samples/kick.wav"
    },
    volume : -10,
    fadeOut : 0.1,
});

var noteNames = Object.keys(keys.buffers._buffers);
var stepLength = 8;
var subDivision = "16n";

function stepLengthCalc(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push(i);
  }
  return arr;
}
var vel = Math.random() * 0.5 + 0.5;


var volume = new Tone.Volume({volume:1});

Tone.Transport.start();
Tone.Transport.bpm.value = 120;

keys.chain(volume, Tone.Master);

var vel = 0;
var newVel = {
    'kick':1,
    'snare':1,
    'hat':1
};
var loop = new Tone.Sequence(function(time, col){
	var column = matrix1.matrix[col];
    for (var i = 0; i < 4; i++){
        matrix1.jumpToCol(col);
        if (column[i] === 1){
            // var vel = Math.random() * 0.5 + 0.5;
            keys.start(noteNames[i], time, 0, "32n", 0, newVel[noteNames[i]]);
        }
    }
}, stepLengthCalc(stepLength), subDivision);


nx.onload = function(){
        nx.colorize("#333");
        matrix2.col = 1;
        matrix2.row = 1;

        matrix1.col = stepLengthCalc(stepLength).length;
        matrix1.row = noteNames.length;
        matrix1.resize($("#content").width(), 250);
        matrix1.init();
        matrix2.init();
        matrix1.draw();
        matrix2.draw();
        matrix2.on('*', function(data){
            data.level === 1 ? loop.start() : loop.stop();
        });


        number.resize(60, 30);
        number.min = 0;
        number.set({value: 120});
        number.on('*', function(data){Tone.Transport.bpm.value = data.value;});

        hatVel.set({value: 50})
        hatVel.on('*', function(data){
            newVel['hat'] = data.value / 100;
        });
        snareVel.set({value: 50})
        snareVel.on('*', function(data){
            newVel['snare'] = data.value / 100;
        });
        kickVel.set({value: 50})
        kickVel.on('*', function(data){
            newVel['kick'] = data.value / 100;
        });
    }
