document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    console.log('Space pressed')
/* 	if (dDialogueCount < dDialogueStop){
		writeDarkMessage();
		dDialogueCount++;
		setTimeout(function() {dKeepSpamming(); }, dSpamSpeed);
	} */
  }
})


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
		log("pressed up");		
    }
    else if (e.keyCode == '40') {
        // down arrow
		log("pressed down");
    }
    else if (e.keyCode == '37') {
       // left arrow
	   	log("pressed left");
    }
    else if (e.keyCode == '39') {
		log("pressed right");
		clearInterval(waitInterval);
		dSpamTimer.stop();
		dKeepSpamming();
    }

}