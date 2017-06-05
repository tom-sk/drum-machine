var audio_context = window.AudioContext || window.webkitAudioContext;

var con = new audio_context();
var osc = con.createOscillator();





var hat;
var kick;

var hat_seq = [1,1,1,0,1,0,1,1,0,0,0,0,1,1,1,1];
var kick_seq = [1,0,0,0,0,1,0,0,1,1,1];
var step = 0;
var got_up_to;
var interval = 0.125;
var wait_time = 0.2;

setInterval(function(){
    var now = con.currentTime;

    var max_future_time = now + (wait_time);
    if (got_up_to > now) {// already scheduled up to this point
        now = got_up_to;
    }

    while (now <= max_future_time){
        step ++;
        if (hat_seq[step % hat_seq.length]){
            // playSound(hat, now);
            // playSound(kick, now);
        }
        now += interval;
    }
    got_up_to = now;

}, wait_time*1000);

loadSample('../samples/hat.wav', function(buffer){
    hat = buffer;
});
loadSample('../samples/kick.wav', function(buffer){
    kick = buffer;
});

function playSound(buffer, time){
    var player = con.createBufferSource();
    player.buffer = buffer;
    player.start(time);
    player.connect(con.destination);
}






function loadSample(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function(){
        var audioData = request.response;
        con.decodeAudioData(audioData, function(buffer){
            console.log('buffer');
            callback(buffer);
        });
    }
    request.send();
}
