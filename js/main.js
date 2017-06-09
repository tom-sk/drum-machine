var keys = new Tone.MultiPlayer({
    urls : {
        "hat" : "../samples/hat.wav",
        "snare" : "../samples/snare.wav",
        "kick" : "../samples/kick.wav"
    },
    volume : -10,
    fadeOut : 0.1,
});
var synth = new Tone.Synth().toMaster();

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
var pitch = {
    'kick':10,
    'snare':1,
    'hat':1
};
var loop = new Tone.Sequence(function(time, col){
	var column = matrix1.matrix[col];
    for (var i = 0; i < 4; i++){
        matrix1.jumpToCol(col);
        if (column[i] === 1){
            // var vel = Math.random() * 0.5 + 0.5;
            keys.start(noteNames[i], time, 0, "32n", pitch[noteNames[i]], newVel[noteNames[i]]);
        }
    }
}, stepLengthCalc(stepLength), subDivision);

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
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
        hatPitch.set({value: 5})
        hatPitch.on('*', function(data){
            // pitch['hat'] = data.value;
            pitch['hat'] = convertRange(data.value, [0,10], [-10,10]);
        });
        snarePitch.set({value: 5})
        snarePitch.on('*', function(data){
            // pitch['snare'] = data.value;
            pitch['snare'] = convertRange(data.value, [0,10], [-10,10]);
        });

        kickPitch.on('*', function(data){
            pitch['kick'] = data.value;

        });

    }
