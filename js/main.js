var keys = new Tone.MultiPlayer({
    urls : {
        "ht" : "samples/artoms21.wav",
        "mt" : "samples/artoms18.wav",
        "lt" : "samples/artoms15.wav",
        "hat" : "samples/vntg_hts03.wav",
        "hat2" : "samples/clhat.wav",
        "openHat" : "samples/ophat.wav",
        "clap" : "samples/clap.wav",
        "snare" : "samples/arsn.wav",
        "kick" : "samples/kick.wav",
        "kick2" : "samples/arkck.wav",

    },
    volume : -10,
    fadeOut : 0.1,
});
var synth = new Tone.Synth().toMaster();

var noteNames = Object.keys(keys.buffers._buffers);
// var noteNames = ['hat', 'clhat', 'ophat', 'snare', 'kick', 'hardkick'];
var stepLength = 16;
var subDivision = "16n";
// console.log(Object.keys(keys.buffers._buffers))


function arrToObj(array, val){
  var obj = {};
  for(var i = 0; i < array.length; i++){
    obj[array[i]] = val;
  }
  return obj;
}

function stepLengthCalc(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push(i);
  }
  return arr;
}

function clearAllNotes() {
  for (var i = 0; i < 16; i++)
  {
    for (var j = 0; j < 10; j++)
    {
      matrix1.matrix[i][j] = 0;
      matrix1.draw()
    }
  }
}

var vel = Math.random() * 0.5 + 0.5;
var volume = new Tone.Volume({volume:1});

Tone.Transport.start();
Tone.Transport.bpm.value = 120;

keys.chain(volume, Tone.Master);

var vel = 0;
var newVel = arrToObj(noteNames, 1);
var pitch = arrToObj(noteNames, 0);

var loop = new Tone.Sequence(function(time, col){
	var column = matrix1.matrix[col];
    for (var i = 0; i < 16; i++){
        matrix1.jumpToCol(col);
        if (column[i] === 1){
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
        matrix1.resize($("#content").width(), 450);
        matrix1.init();
        matrix2.init();
        matrix1.draw();
        matrix2.draw();
        matrix2.on('*', function(data){
            data.level === 1 ? loop.start() : loop.stop();
        });


        number.resize(70, 30);
        number.min = 0;
        number.set({value: 120});
        number.on('*', function(data){Tone.Transport.bpm.value = data.value;});

        htVel.set({value: 50})
        htVel.on('*', function(data){
            newVel['ht'] = data.value / 100;
        });
        htPitch.set({value: 5})
        htPitch.on('*', function(data){
            pitch['ht'] = convertRange(data.value, [0,10], [-10,10]);
        });
        mtVel.set({value: 50})
        mtVel.on('*', function(data){
            newVel['mt'] = data.value / 100;
        });
        mtPitch.set({value: 5})
        mtPitch.on('*', function(data){
            pitch['mt'] = convertRange(data.value, [0,10], [-10,10]);
        });

        ltVel.set({value: 50})
        ltVel.on('*', function(data){
            newVel['lt'] = data.value / 100;
        });
        ltPitch.set({value: 5})
        ltPitch.on('*', function(data){
            pitch['lt'] = convertRange(data.value, [0,10], [-10,10]);
        });

        hatVel.set({value: 50})
        hatVel.on('*', function(data){
            newVel['hat'] = data.value / 100;
        });
        hatPitch.set({value: 5})
        hatPitch.on('*', function(data){
            pitch['hat'] = convertRange(data.value, [0,10], [-10,10]);
        });
        hat2Vel.set({value: 50})
        hat2Vel.on('*', function(data){
            newVel['hat2'] = data.value / 100;
        });
        hat2Pitch.set({value: 5})
        hat2Pitch.on('*', function(data){
            pitch['hat2'] = convertRange(data.value, [0,10], [-10,10]);
        });

        openHatVel.set({value: 50})
        openHatVel.on('*', function(data){
            newVel['openHat'] = data.value / 100;
        });
        openHatPitch.set({value: 5})
        openHatPitch.on('*', function(data){
            pitch['openHat'] = convertRange(data.value, [0,10], [-10,10]);
        });

        clapVel.set({value: 50})
        clapVel.on('*', function(data){
            newVel['clap'] = data.value / 100;
        });
        clapPitch.set({value: 5})
        clapPitch.on('*', function(data){
            pitch['clap'] = convertRange(data.value, [0,10], [-10,10]);
        });

        snareVel.set({value: 50})
        snareVel.on('*', function(data){
            newVel['snare'] = data.value / 100;
        });
        snarePitch.set({value: 5})
        snarePitch.on('*', function(data){
            pitch['snare'] = convertRange(data.value, [0,10], [-10,10]);
        });

        kickVel.set({value: 50})
        kickVel.on('*', function(data){
            newVel['kick'] = data.value / 100;
        });
        kickPitch.on('*', function(data){
            pitch['kick'] = data.value;
        });

        kick2Vel.set({value: 50})
        kick2Vel.on('*', function(data){
            newVel['kick2'] = data.value / 100;
        });
        kick2Pitch.on('*', function(data){
            pitch['kick2'] = data.value;
        });

        function clearAllNotes() {
          for (var i = 0; i < 16; i++)
          {
            for (var j = 0; j < 7; j++)
            {
              matrix1.matrix[i][j] = 0;
              matrix1.draw()
            }
          }
        }

    }
