  function getVideo() {
    return document.getElementsByTagName('video')[0];
  }

  var jog = 0;

  function rev() {
    console.log('rev')
	//getVideo().playbackRate = -1;	
    jog--
    tryJog();
  }
  function ff() {
    console.log('ff')
    jog++
    tryJog();
  }

  function stop() {
    console.log('stop')
    jog = 0;
    getVideo().pause();
    tryJog();
  }

  function tryJog() {
    var j = jog
    console.log('jog=' + jog);
    if (j != 0) {

      // from 1 to 4 html playback is adjusted
      if (j >= 1 && j <= 4) {
        console.log('playbackRate=' + j);
        getVideo().playbackRate = j;
        getVideo().play();
      }

      // lower than zero or higher than 4
      // implements a jump and wait seek
      if (j < 0 || j > 4) {
        var interv = 0; // playing interval before jog
        var s = 0; // the increase seek position
        if (j > 0) {
          s = j / 2;
          interv = 50;
        } else {
          s = j / 2;
          interv = 50;
        }

        console.log('jumping=' + j);
        getVideo().playbackRate = 1;
        getVideo().play(); // better user xp
        setTimeout(function () {
          getVideo().currentTime += (s); // after jumping oncanplay will be fired
        }, interv);
      }
    }
  }

  getVideo().oncanplay = function() {
    // every time the video is repositioned try jog
    tryJog();
  }
