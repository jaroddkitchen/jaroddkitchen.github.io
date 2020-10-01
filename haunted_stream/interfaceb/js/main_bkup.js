//--------------------------
// Global Vars
//--------------------------
var chatTarget = "webcam";


//is called automatically when the html page is loaded
/* var wshshell=new ActiveXObject("wscript.shell");
var username=wshshell.ExpandEnvironmentStrings("%username%"); */

	var camLoaded = false;
	var webcamLoaded = false;
	var videoBuffered = false;
	var webcamvideoBuffered = false;	

function init()
{
	loadCam();
	loadWebCam();
	setupInterface();
}

function loadCam(){
	videojs('main-video').ready(function(){
		var video = this;
		console.log("player ready");
		camLoaded = true;
		video.setAttribute("poster", "../img/art/svg/blank_poster.png");		
	})
}

function loadWebCam(){
	$("#webcam-video").ready(function(){
		var webvideo = this;
		console.log("webcam player ready");
		webcamLoaded = true;
	})	
}


function setupInterface()
{
	addListeners();
    makeSettings();
	toggleSettings();
	initWebcam();
	toggleCamera(0);	
	loadDictionary();
    //spam();
	//darkmode();	
	//initVideoControlBar();
	//hideInterface();	
}


// Event listeners
function addListeners()
{
	var video = document.getElementsByTagName('video')[0];
	var webcamvideo = document.getElementsByTagName('video')[1];

/* 	video.oncanplaythrough = function() {
	  // Ready to play whole video?
		console.log("video can play through");
		videoBuffered = true;
		if (videostart){
			video.play();
		}	  
	} */
	
/* 	webcamvideo.oncanplaythrough = function() {
	  // Ready to play whole video?
		console.log("webcamvideo can play through");
		webcamvideoBuffered = true;
		if (videostart){
			webcamvideo.play();
		}	  
	} */

	
	video.addEventListener('waiting', function () {log('waiting');});

	video.addEventListener('playing', function () {log('playing');
	});	

	video.addEventListener('pause', function () {log('pause');});

	video.addEventListener('play', function () {
		log('play');
		if (!videostart){
			initVideoStartup();
		}
	});

	video.addEventListener('stalled', function () {log('stalled');});

	video.addEventListener('seeking', function () {log('seeking');});

	video.addEventListener('seeked', function () {log('seeked');});
	
	video.addEventListener('timeupdate', function() {
		//speechCheck();
		//timeCheck();
		updateWebCam();
		
	});
}

window.addEventListener('resize', scrollToBottom);

document.addEventListener("fullscreenchange", function() {
  console.log("fullscreenchange event fired!");
  scrollToBottom();
});

function initVideoStartup(){
	var video = document.getElementsByTagName('video')[0];
	var webcamvideo = document.getElementsByTagName('video')[1];
	video.setAttribute("poster", "../img/art/svg/blank_poster.png");	
	document.body.requestFullscreen();	
	videostart = true;
	showInterface();
	video.pause();
	webcamvideo.pause();
	video.play();
	webcamvideo.play();
	spam();	
}


//----------------------------------------------------
// Interface Display
//----------------------------------------------------

//Hide and Show the chat interface
function hideInterface()
{
	//var chatElement =  document.getElementById('chat');
	$("#chat").css("display", "none");
}

function showInterface()
{
	$("#chat").css("display", "inline");
}



//----------------------------------------------------
// Sound FX Functions
//----------------------------------------------------


function audioPlay(audio,vol) {;
	audio.volume = vol;
	audio.play();
}

	var a_timer,audio = 0;

function audioFadeOut(audio, dur){
    audio[0].volume = 0.1;
    audio.animate({volume: 0.0}, dur);
}

function audioFadeIn(audio, dur){
    audio[0].volume = 0.0;
    audio.animate({volume: 0.1}, dur);
}


//----------------------------------------------------
// Visual FX Modules
//----------------------------------------------------


function objTransform(obj, transIn, duration, transOut){
	// scale effect
	var webcamvideo = document.getElementsByTagName('video')[1];		
	webcamvideo.classList.add("scale-up-element");
}


function translates (el, wait){
	var tl = new TimelineMax({onComplete:el.remove()}) ;
	//tl.to(elem, 0.2, {left:200});	
	tl.fromTo(el, 0.6, { x: 0, opacity: 1 }, {x: 100, opacity:0, delay:0 });	
}


(function() {
    var FX = {
        easing: {
            linear: function(progress) {
                return progress;
            },
            quadratic: function(progress) {
                return Math.pow(progress, 2);
            },
            swing: function(progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function(progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function(progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function(progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function(progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function(options) {
            var start = new Date;
            var id = setInterval(function() {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function(element, options) {
            var to = 1;
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = to - delta;
                }
            });
        },
        fadeIn: function(element, options) {
            var to = 0;
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };
    window.FX = FX;
})()




//--------------------------
// Camera Controls	
//--------------------------


var videoplaylist = [
	["chapel", "https://video.wixstatic.com/video/bde2cd_fb6fbe2bce7249969ee1ea57b2288668/720p/mp4/file.mp4"],
	["pennhurst", "https://video.wixstatic.com/video/bde2cd_29fc09fb61cd469fa5e1de604ddd8be6/720p/mp4/file.mp4"],
	["desert", "https://video.wixstatic.com/video/bde2cd_0b465ccc294f4786bd45df5fa6edee4d/720p/mp4/file.mp4"]
];

var webcamplaylist = [
		["Ms5K", "https://video.wixstatic.com/video/bde2cd_f447f30577a74aba829138597bb3f323/720p/mp4/file.mp4"],
		["Wimpy", "https://video.wixstatic.com/video/bde2cd_7935ef80ed5d44e09380e36140265934/720p/mp4/file.mp4"],
		["Ryan", "https://video.wixstatic.com/video/bde2cd_385539cd85ff4cb0a0eff3967da87bf2/720p/mp4/file.mp4"]
];

/* var videoplaylist = [
	["chapel", "../video_src/Chapel to Cellar.mp4"],
	["pennhurst", "../video_src/Penhurst Explorers.mp4"],
	["desert", "../video_src/Biker Explorer.mp4"]
];

var webcamplaylist = [
		["Ms5K", "../video_src/Face-cams1.mp4"],
		["Wimpy", "../video_src/Face-cams2.mp4"],
		["Ryan", "../video_src/Face-cams3.mp4"]
];
 */

var videostart = false;

function initWebcam()
{
	var myWebcam = document.getElementsByTagName('video')[1];
	myWebcam.currentTime = 37;
}

function toggleCamera(n){
	var camera = n;
	console.log("camera " + camera);
	
	var myPlayer = document.getElementsByTagName('video')[0];
	var curtime = myPlayer.currentTime;
	myPlayer.setAttribute("src", videoplaylist[n][1]);
	myPlayer.setAttribute("type", "video/mp4");
	myPlayer.currentTime = curtime;

/* 	var myWebcam = document.getElementsByTagName('video')[1];
	myWebcam.setAttribute("src", webcamplaylist[n][1]);
	myWebcam.setAttribute("type", "video/mp4");
	myWebcam.currentTime = curtime; */
	
	if(videostart){
		myPlayer.play();
		//myPlayer.load();
		//myWebcam.play();
		
		//hideInterface();		
	}
	
	var curButton = "#" + event.srcElement.id;
	var curName = "#" + event.srcElement.name;
	var curText = "#" + "cameraText" + event.srcElement.name;
	console.log(curText);

	
	if (!camera){
		camera = 0;
		curButton = "#" + "cameraButton1";
		curText = "#" + "cameraText0";		
	}	
	
	$('.cameraIconButton').css("background-color", "transparent");
	$('.cameraIconButton').attr("src", "../img/art/svg/camera_off.svg");
	$('.cameraIconText').css("color", "#3f3131ff");

	
    $(curButton).css("background-color", "transparent");
	$(curButton).attr("src", "../img/art/svg/camera_on.svg");	
    
    if($(curButton).css('display') == 'none')
    {
        $(curButton).css("background-color", "transparent");
		$(curButton).attr("src", "../img/art/svg/camera_off.svg");
		$(curText).css("color", "#3f3131ff");		
		
    }
    else
    {
        $(curButton).css("background-color", "transparent");
		$(curButton).attr("src", "../img/art/svg/camera_on.svg");
		$(curText).css("color", "#866767ff");		
    }
}


//--------------------------
// Video Control	
//--------------------------

//jump to time
function jumpToTime(landTime)
{
	// var player = VideoJS.setup("current_video");
	var video = document.getElementsByTagName('video')[0];	
	
	video.currentTime = landTime;
	video.play();
}



//----------------------------------------------------
// Global Timer Objects	
//----------------------------------------------------

var minutes = 0;
var seconds = 0;

setInterval(function() {
    var video = videojs('main-video');
    var curTime = video.currentTime();
    minutes = Math.floor(curTime  / 60);   
    seconds = Math.floor(curTime - minutes * 60)
    var x = minutes < 10 ? "0" + minutes : minutes;
    var y = seconds < 10 ? "0" + seconds : seconds;	
	
	//var timeLeft = c_timer.getTimeLeft();
	//console.log(timeLeft);

// check for scheduled events
	var eventTime = Math.floor(curTime);
	var eventsLength = timedEvents.length;
	if (eventsLength>0){
		if (eventTime===timedEvents[0][1])
		{
			if (timedEvents[0][0]){
				for (i=0; i< timedEvents[0][3].length; i++){					
					timedEvents[0][3][i]();
				}
				pastEvents.push(timedEvents[0]);
				timedEvents.splice(0,1);
				console.log(pastEvents);
			} else {
				timedEvents.splice(0,1);
				console.log("event skipped");
			}
		}
	}
    document.getElementById("timer").innerHTML = x + ":" + y;
}, 400);



// Ubiquitous interval object
function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};


// Ubiquitous timer object
function timer(callback, delay) {
    var id, started, remaining = delay, running
    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }
    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }
        return remaining
    }
    this.getStateRunning = function() {
        return running
    }
    this.start()
}



//------------------------------------------------------------------------------
// Demon - Main Programming 
//------------------------------------------------------------------------------

//----------------------------------------------------
// Demon Aspects
//----------------------------------------------------

// Traits
	var dIntellect = 5;
	var dMagic = 5;
	var dPower = 5;
	var dPresence = 5;

// Moods	
	var dGlee = 5;
	var dPatience = 4;
	var dCruelty = 5;
	var dAnger = 5;
	var dFear = 5;





//----------------------------------------------------
// Demon Communications
//----------------------------------------------------

	var curEventId;
	
	var dSpamming = false;
	var dSpamType = "";
	var dSpamMood = "";
	var dSpamSpeed = 0;

	var dMsgCount = 0;
	var dDialogueCount = 0;
	var dDialogueNode = 0;
	var dPrevDialogueNode = 0;

	var c_array = [];
	var c_timer = 0;
	var dChatTimer;
	var dChatTimeout;
	
	var plReply;
	

//--------------------------
// Init Demon Chat Module
//--------------------------

function summon_dChat(array, mem, mood, speed, timeout)
{
/* 	var video = document.getElementsByTagName('video')[0];
	var webcamvideo = document.getElementsByTagName('video')[1];
	video.pause();
	webcamvideo.pause(); */
	
	curEventId = timedEvents[0][2];
	
	chatTarget = "demon";
	plReply = null;
	
	c_array = array;
	document.getElementById("chapter").innerHTML = c_array.name;
	
	dSpamType = c_array.type;
	dSpamMood = mood;
	dSpamSpeed = speed;
	
	dPrevDialogueNode = dDialogueNode;
	
	//dDialogueNode = 0;
	dDialogueCount = 0;
	dDialogueStop = c_array[dDialogueNode].length - 1;

	dTaunt = false;
	//dWaitTimeout = timeout/4;
	dWaitTimeout = dPatience * 1000;	
	dListen = true;
	
	spamming = false;
	$("#chattext").css("overflow", "hidden");
	
	dMsgCount = 0;
	dSpam();

/* 	dChatTimeout = timeout;
	clearTimeout(c_timer);
	c_timer = window.setTimeout(banish_dChat, timeout); */
	
	dChatTimeout = timeout;
	c_timer = new timer(function() {banish_dChat()}, dChatTimeout);
	//c_timer.pause();
	
	dChatTimeLeft = c_timer.getTimeLeft();
	var dChatTimer = setInterval(function() {
		if (dChatTimeLeft > 0){
			dChatTimeLeft = c_timer.getTimeLeft();
			document.getElementById("chapter-time").innerHTML = Math.round(dChatTimeLeft/1000);
		} else {
			dChatTimeLeft = 0;
			clearInterval(dChatTimer);
		}
	}
	, 400);
	
	console.log("demon speaks");
	//$('#textfield').prop("disabled", true);
}




//--------------------------
// Exit Demon Chat 
//--------------------------

function banish_dChat(){
	//if (dSpamming === true){	
		dSpamming = false;
		dTaunt = false;
		dListen = false;
		clearInterval(waitInterval);
		dChatTimeLeft = 0;
		clearInterval(dChatTimer);		

		var element = $("#chattext");
		elements = document.querySelectorAll('#chatbubble.darkbubble, #chatbubble.imgbubble');
		
		for (i=0; i<dMsgCount; i++){
			//var lastDMsg = dMsgCount-1; 		
			var element = elements[i];
			element.classList.add('scalingbubble');
			delayedFade(i,element);
			scrollToBottom();
		}
		
		if (c_array.exit == "banishAll"){
			banish_allLayers(dSpamSpeed);
			banish_allSounds(dSpamSpeed);
			banish_Apparition();
		}
		
		restoreChat();
		
		console.log("demon is silent");
		document.getElementById("chapter").innerHTML = "";
		document.getElementById("chapter-time").innerHTML = "";
	//}
}


// erase all demon messages 
function delayedFade(i, el){
	var wait = i * 0.1;	
	var tl = new TimelineMax();
	tl.to(el, 1, {
		  force3D:true,
		  delay:wait,
		  onComplete:removeDemonMsg,
		  onCompleteParams:[el,i],
		  css: { 
			width: 0.0,
			height: 0.0,
			transformOrigin:"top right",
		  }
	});
}
function removeDemonMsg (el,i){	
	el.remove();
	if (i === (dMsgCount-1)){
		$("#chattext").css("overflow-y", "auto");	
		$("#chattext").css("overflow", "scroll");
		$("#chattext").css("overflow-x", "hidden");		
	}		
}

// return to normal chat mode
function restoreChat(){
	elements = document.querySelectorAll('#chatbubble');
	for (var i = 0; i < elements.length; i++){
		var element = elements[i];	
		element.classList.remove('fade-out-element');
		element.classList.add('fade-in-element');
	}
	chatTarget = "webcam";
	spam();
}



//--------------------------
// Listening For Response
//--------------------------

	var dChatTimeLeft;
	var dListen = true;

	var dWaitTimeout;
	var dTaunt = false;

	var waitInterval;

function dWaitsForResponse()
{	
	plReply = null;
	
	//$('#textfield').prop("disabled", false);
	//$('#textfield').focus();
	
	if (!dListen){
		console.log("demon stopped listening." + dSpamType);
		return;
	}
	
	console.log("demon is listening for " + dQuestionType);

	//Set wait-time according to demon's patience stat	
	dWaitTimeout = dPatience * 1000;

	var waitInterval = setInterval(function()
	{
		if (dSpamming){
			if (plReply !== null) {
				dListen = false;
				dTaunt = false;
				stopInterval(waitInterval);
				console.log("player responded");
				dWriteMore();			
			} else {
				dWaitTimeout = dWaitTimeout - 1000;
				if (dWaitTimeout == 0){
					dWriteMore();
					dWaitTimeout = dPatience * 1000;
					stopInterval(waitInterval);
				}			
			}
		}
		//log("demon waiting"); 
		document.getElementById("debug").innerHTML = Math.round(dWaitTimeout/1000);				
	}
	, 1000);
}

function stopInterval(i) { 
   clearInterval(i);
   //log(i + " was cleared"); 
} 


	var dRepeatQuestion = true;

function dWriteMore(){
	if (plReply!=null){;
		dParseReply();
		dWaitsForResponse();
	} else {
		dRepeatQuestion = !dRepeatQuestion
		dTaunt = true;
		writeDarkMessage();
		dWaitsForResponse();
	}
}


//--------------------------
// Parse the chat reply
//--------------------------

	var dQuestionNode;
	var dQuestionType = "";
	
	var dAnswerNode;
	var dKeyNode;

	var word;
	var letters;	
	var lastWord;
	
	var valid_nouns = [];
	var valid_verbs = [];
	var non_words = [];
	
	var keywords = [];
	var keyactions = [];	
	var triggerWords = [];
	var dContextStr;
	var pos;


// Prepare parser 
function dParseReply(){
	valid_nouns = [];
	valid_verbs = [];
	non_words = [];
	triggerWords = [];	
	
	dSenseNode();
	
	wiki = plReply;
	if (dQuestionType == "wikiSearch") {
		dGetWiki(wiki);
	} else {	
		dStrToArray(plReply);
	}
	plReply=null;
	return;
}


function dSenseNode(){
	dAnswerNode = c_array[dDialogueNode].length-1;
	dKeyNode = c_array[dDialogueNode][dAnswerNode];
	dQuestionType = dKeyNode[0][0];
	dContextStr = dKeyNode[0][1];
}


function dGetWiki(wiki)
{		
	keywords = [];
	keyactions = [];
	
	for (var i = 1; i < dKeyNode.length; i++){
		keywords.push(dKeyNode[i][0]);
		keyactions.push(dKeyNode[i][1]);
		log(dKeyNode[i][1]);
	}	
	
	findWiki(wiki);
}


function dStrToArray(str)
{
	var newStr = str;
	
	newStr = newStr.replace(/[.*+\-!^${}()|[\]\\]/gi, "");
	newStr = newStr.replace(/\?/gi, " ? ");
	newStr = newStr.replace(/'/gi, "");
	newStr = newStr.replace(/yes|yeah|okay|ok|yup|yep|agree|affirmative|always/gi, "ACCEPT");
	newStr = newStr.replace(/noop|nope|no|nay|nah|naw|negative|disagree|never/gi, "DECLINE");
	newStr = newStr.replace(/maybe|dont know|not sure|depends/gi, "MAYBE");


    // Get an array of all the words	
    playerwords = newStr.split( " " );
	
	// Eliminate removal words
	const removeWords = ["", " "];
	playerwords = playerwords.filter( ( el ) => !removeWords.includes( el ) );	

	// search for words that trigger actions
	for (var i = 0; i < playerwords.length; i++){	
		dSearchCommands(playerwords[i]);
	}
	var lastValidWord = triggerWords.length - 1;	
	
	// form a response based on the last validated word
	dAssembleResponse(triggerWords[lastValidWord]);
	console.log(playerwords);
}


// Search for keyword triggers
function dSearchCommands(word)
{
	keywords = [];
	keyactions = [];

	dAnswerNode = c_array[dDialogueNode].length-1;
	dKeyNode = c_array[dDialogueNode][dAnswerNode];
	
	for (var i = 0; i < dKeyNode.length; i++){
		keywords.push(dKeyNode[i][0]);
		keyactions.push(dKeyNode[i][1]);
	}
	
	// validate english
	findWord(word);
	
	//check for relevance
	const result = keywords.includes(word);
	pos = keywords.indexOf(word);
	if (result){
		curResponse = pos;
		triggerWords.push(word);
    }
}


// Conduct a dictionary search
function findWord(letters) {
	
	//let searchword = letters.toLowerCase();
	let searchword = letters;
	//searchword = searchword.replace(/\s+/g, '');

	// search for verbs
	var v = verbs.includes(searchword);	
	if (v==true){
		console.log(searchword + " is a verb!");
		valid_verbs.push(searchword);
	}

	// search for nouns	
	var n = nouns.includes(searchword);
	if (n==true){
		console.log(searchword + " is a noun!");
		valid_nouns.push(searchword);
	}
	
	// neither a noun or a verb
	if (!v){
		if(!n){
			console.log(searchword + " is not a noun or a verb!");
			non_words.push(searchword);
		}
	}
}


// Trigger a reply function
function dAssembleResponse(word)
{
	// trigger actions
	if (triggerWords.length > 0) {		
		console.log('"' + word + '" will trigger a game action.');
		for (i=0; i < keyactions[pos].length; i++){
			keyactions[pos][i]();
		}
	// search wiki
	} else {
		console.log('This word does not affect the story');
		findWiki(wiki);
	}
}


function dJumpToDialogueNode(num, dlis, restart){
	dListen = dlis;
	dTaunt = false;
	
	dPrevDialogueNode = dDialogueNode;
	dDialogueNode = num;
	dDialogueStop = c_array[dDialogueNode].length - 1;
	
	if (restart){
		dDialogueCount = 0;
	} else {
		dDialogueCount = dDialogueStop;
	}

	dSenseNode();

	dSpamming = true;
	dKeepSpamming();
}


function titleCase(str)
{
  return str.toLowerCase().split(' ').map(function(w) {
    return (w.charAt(0).toUpperCase() + w.slice(1));
  }).join(' ');
}




//----------------------------------------------------
// Wikipedia Context Module
//----------------------------------------------------
//This module retrieves the a Wikipedia article using JSONP with the Wikipedia API: http://en.wikipedia.org/w/api.php
//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&exintro&explaintext&generator=search&gsrsearch=intitle:planet%20mars&gsrlimit=1&redirects=1

	//var searchStr;	
	var wiki = "";
	var wikiText = "";
	var wikiTitle = "";
	var wikiData = "";
	var wikiImg = "";
	
	var wikiDialogueNode = [];


function findWiki(wikiStr)
{
let surl = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=extracts|pageimages&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=' + wikiStr + " " + dContextStr;
	
    $.ajax({
      url: surl,
      header: {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'jsonp',
      data: '',
      beforeSend: function(){
		  log("loading");
        // $("#loader").show();
        $('#chapter-time').html('<div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block;" width="25%" height="25%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(50 50)"><g transform="scale(0.7)"><g transform="translate(-50 -50)"><g transform="translate(-3.20642 -20)"><animateTransform attributeName="transform" type="translate" repeatCount="indefinite" dur="1s" values="-20 -20;20 -20;0 20;-20 -20" keyTimes="0;0.33;0.66;1"></animateTransform><path fill="#5699d2" d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"></path><path fill="#1d3f72" d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"></path></g></g></g></g></svg></div>')
       },   
		success: function(data){
			wikiText = "";
			wikiData = "";
			wikiImg = "";
			wikiImgHash = "";
			
			if(typeof data.query == 'undefined'){
				//Respond with random insult
				dWriteDarkWiki(wikiText, wikiTitle);
			} else {
				dataNum = Object.keys(data.query.pages)[0];
	
				//get title
				wikiTitle = data.query.pages[dataNum].title;
				//dGetWikiCat(wikiTitle);
				
				wikiText = data.query.pages[dataNum].extract
				wikiText = wikiText.replace(/\s*\(.*?\)/g, "");
				wikiText = wikiText.replace(/\[\.*?\]/g, "");	
				wikiText = wikiText.replace(/<(?:.|\n)*?>/gm, '');
				
				replaceHonorifics();
				log("replacing honorifics");				
				
				wikiText = wikiText.split(".");
				for (i=0; i < wikiText.length; i++){ 
					wikiText[i] = wikiText[i] + ".";
				}
				
				wikiDialogueNode = wikiText;
				wikiDialogueNode[0] = wikiDialogueNode[0] + wikiDialogueNode[1];
				wikiDialogueNode.splice(1,1);
				wikiDialogueNode.splice(3);

				if (dQuestionType !== "wikiSearch"){
					var wikismTitle = wikiTitle.toLowerCase();
					wikiDialogueNode.push("but we aint talking about " + wikismTitle + " rite now");
					wikiDialogueNode.push("i asxed u a qwestion");
					wikiDialogueNode.push([ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]);
				} else {
				// Score context
					if (wikiText !== ""){
						pos = 0; //GOODSEARCH
					} else {
						pos = 1; //BADSEARCH
					}
					for (i=0; i < keyactions[pos].length; i++){					
						wikiDialogueNode.push([ keyactions[pos][i] ]);
					}
				}					
				
				c_array[c_array.length-1] = wikiDialogueNode;
				wikiText = wikiDialogueNode[0];
			}
		},
		complete: function(data){
			log("wiki search complete");
			$('#textfield').focus();
			//$('#textfield').val('type bullshit here');
			
			//get wikidata
			if (wikiText !== ""){
				dGetWikiData(wikiTitle);
			}			
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("findWiki error");
		}			
	});
}



/* function isUpperCaseAt(str, index) {
 return str.charAt(index).toUpperCase() === str.charAt(index);
	}
console.log(isUpperCaseAt('Js STRING EXERCISES', 1));	 */




function dGetWikiData(wikiTitle)
{
	let qurl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles="+wikiTitle+"&format=json";

	$.ajax({
		url: qurl,
		header: {
			'Access-Control-Allow-Origin' : '*',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		dataType: 'jsonp',
		data: '',   
		success: function(data){
			dataNum = Object.keys(data.query.pages)[0];
			wikiData = data.query.pages[dataNum].pageprops.wikibase_item;
			log(wikiData);
			log("data search complete");
			// get image
			//dGetWikiImage(wikiData, wikiTitle);
			iri = "http://www.wikidata.org/entity/" + wikiData;
			dLookUpEntity();
		},
		complete: function(){
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("getWikiData error");
		}
	}); 	
}	


	var iri;
	var wikiProps;
	var isoLanguage = 'en';
	
	var wikiVideo;		// P10
	var wikiGenre; 		// P136
	
	var wikiInstancesOf = [];	// P31
	var wikiInstanceOf;
	
	var wikiSex;		// P21
	var wikiJobs = [];
	var wikiJob;		// P106
	var wikiOffice;		// P39
	var wikiBirthDate;  // P569
	var wikiDeathDate;  // P570
	
	var wikiImages = [];
	var wikiImage;
	var wikiImgHash;	

function dLookUpEntity(){
		console.log(iri);
		// create URI-encoded query string to get names and IRIs
		var string = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'
                    +'PREFIX wd: <http://www.wikidata.org/entity/>'
                    +'PREFIX wdt: <http://www.wikidata.org/prop/direct/>'
                    +'SELECT DISTINCT ?property ?value WHERE {'
                    + '<' + iri + '> ?propertyUri ?valueUri.'
                    +'?valueUri rdfs:label ?value.'
                    +'?genProp <http://wikiba.se/ontology#directClaim> ?propertyUri.'
                    +'?genProp rdfs:label ?property.'
                    +'FILTER(substr(str(?propertyUri),1,36)="http://www.wikidata.org/prop/direct/")'
                    +'FILTER(LANG(?property) = "'+isoLanguage+'")'
                    +'FILTER(LANG(?value) = "'+isoLanguage+'")'
                    +'}'
                    +'ORDER BY ASC(?property)';
		var encodedQuery = encodeURIComponent(string);

		// send query to endpoint
		$.ajax({
			type: 'GET',
			url: 'https://query.wikidata.org/sparql?query=' + encodedQuery,
			headers: {
				Accept: 'application/sparql-results+json'
			},
			success: function(returnedJson) {
				//text = '';
				//wikiProps = '';
				wikiSex = '';
				wikiJobs = [];
				wikiJob = '';
				wikiInstancesOf = [];
				wikiInstanceOf = '';
				wikiImages = [];
				for (i = 0; i < returnedJson.results.bindings.length; i++) {
					property = returnedJson.results.bindings[i].property.value
					value = returnedJson.results.bindings[i].value.value
					if (property == "sex or gender"){
						wikiSex = value;
					}
					if (property == "occupation"){
						wikiJobs.push(value);
						wikiJob = wikiJobs[0];
					}
					if (property == "instance of"){
						wikiInstancesOf.push(value);
						wikiInstanceOf = wikiInstancesOf[0];
					}
					if (property == "image"){
						wikiImages.push(value);
						wikiImage = wikiImages[0];
						log("THE IMAGE IS " + wikiImage);
					}
					
					//wikiProps = wikiProps + text;
				//$('#searchSpinner').hide();
				}
				//dGetWikiImage(wikiData, wikiTitle);
				if (wikiImages.length > 0){
					dGetFileHash(wikiImage);
				} else {
					dComposeWiki(wikiText, wikiTitle, wikiImage, wikiImgHash);
				}
			}
		});
}
	

/* function dGetWikiImage(wikiData, wikiTitle)
{	
	let iurl = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&sites=enwiki&props=claims&titles=" + wikiTitle
	//let iurl = "https://www.wikidata.org/w/api.php?action=wbgetclaims&formatversion=2&property=P18&entity=" + wikiData;
	//let iurl = "https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=" + wikiData + "&property=P18";
	log(iurl) 

	$.ajax({
		url: iurl,
		header: {
			'Access-Control-Allow-Origin' : '*',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		dataType: 'jsonp',
		data: '', 
		success: function(data){
			// Image
			if ( data.entities[wikiData] !== 'undefined'){
				if ( data.entities[wikiData].claims.hasOwnProperty('P18') ){;
					wikiImg = Object(data.entities[wikiData].claims.P18[0].mainsnak.datavalue.value);
					wikiImg = wikiImg.replace(/\s/gi, "_");
					console.log("found an image!");
					dGetFileHash(wikiImg);
				} else {
					log("no image found");
					dComposeWiki(wikiText, wikiTitle, wikiImg, wikiImgHash);
				}
			}
			
			//dComposeWiki(wikiText, wikiTitle, wikiImg, wikiImgHash);
		},
		complete: function(){
			log("image search complete");
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("getWikiData error");
		}		
	});  
} */


function dGetFileHash(wikiImage)
{
	let hurl = "https://helloacm.com/api/md5/?cached&s=" + wikiImage;

	$.ajax({
		url: hurl,
		header: {
			'Access-Control-Allow-Origin' : '*',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		data: '',  
		success: function(data){
			wikiImgHash = data;
			log("image hash is " + wikiImgHash);
			dComposeWiki(wikiText, wikiTitle, wikiImage, wikiImgHash);		
		},
		complete: function(){
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("getImgHash error");
		}			
	});
}


function dComposeWiki(wikiText, wikiTitle, wikiImg, wikiImgHash)
{
	// add sex
	if (wikiSex !== ""){
		wikiText = wikiText + "<br/> sex: " + wikiSex;
	}
	// add job
	if (wikiJob !== ""){
		wikiText = wikiText + "<br/> job: " + wikiJob;
	}	
	// add type
	if (wikiInstanceOf !== ""){
		wikiText = wikiText + "<br/> type of: " + wikiInstanceOf;
	}
	
	if (wikiImage !== ""){
		var wikiImgLoad = "he kinda looks like this<br/><img width='100%' onload='scrollToBottom()' src='https://upload.wikimedia.org/wikipedia/commons/"
		+ wikiImgHash[0] + "/" + wikiImgHash[0] + wikiImgHash[1] +  "/" + wikiImage + "' />"
		//wikiText = wikiText + wikiImgLoad;
		wikiInsertImg = wikiDialogueNode.length - 3;
		wikiDialogueNode.splice(wikiInsertImg, 0, wikiImgLoad); 
		log(wikiImgLoad);
	} else {
		log("no image");
	}
	
	log(wikiImage);
	log(wikiSex);
	log(wikiJob);
	log(wikiInstanceOf);
	
	dJumpToDialogueNode(c_array.length-1,false,true);
}


/* function fileHash( file, hasher, callback ){
	//Instantiate a reader		  
	var reader = new FileReader();
		  
	//What to do when we gets data?
	reader.onload = function( e ){
		var hash = hasher(e.target.result);
		callback( hash );
	}
		
	reader.readAsBinaryString( file );

} */


/* function dGetWikiCat(wikiTitle)
{
	log(wikiTitle);

	var curl = "https://en.wikipedia.org/w/api.php"; 

	var params = {
		action: "query",
		format: "json",
		prop: "categories",
		cllimit: 15,
		clshow: "!hidden",
		titles: wikiTitle
	};
	
	curl = curl + "?origin=*";
	Object.keys(params).forEach(function(key){curl += "&" + key + "=" + params[key];});

	fetch(curl)
		.then(function(response){return response.json();})
		.then(function(response) {
			var pages = response.query.pages;
			for (var p in pages) {
				for (var cat of pages[p].categories) {
					console.log(cat.title);
				}
			}
		})
		.catch(function(error){console.log(error);});
} */


// print an article
function dWriteDarkWiki(wikiText, wikiTitle){	
	var was_taunting = false;
	if (dTaunt) {dTaunt = false; was_taunting = true}
		if (dQuestionType !== "wikiSearch"){
			var element = $("#chattext");
			element.append(getDarkWiki(wikiText, wikiTitle));
			cutTopOfChat();
			scrollToBottom();
		}
	if (was_taunting) {dTaunt = true};
	
	if (dQuestionType !== "wikiSearch"){ 
		dListen = true;
		dWaitsForResponse();
	} else {
		if (wikiText !== ""){
			pos = 0; //GOODSEARCH
		} else {
			pos = 1; //BADSEARCH
		}
		for (i=0; i < keyactions[pos].length; i++){
			keyactions[pos][i]();
			log(keyactions[pos][i]); 
		}
	}
}

function getDarkWiki(wikiText, wikiTitle)
{
	// get the sound effect
	var snd_heartbeat = new Audio('../snd/fx/scrape.mp3');	
	audioPlay(snd_heartbeat,0.7);
	snd_heartbeat.onended = function() {
		snd_heartbeat.remove();
	};
	//style the bubble
	var message = $('<div id="chatbubble"></div>');
	message.attr("class", "fly-in-element darkbubble");
	
	// apply css changes
	dApplyMsgTransforms(message);
	
	if (wikiText == ""){
		msgBody = (dRefusals[Math.floor(Math.random()*dRefusals.length)]);
	} else {
		// Make replacements
		// var wikiTitleRegEx = new RegExp(wikiTitle,'g');
		// wikiText = wikiText.replace(wikiTitleRegEx,"that shit");
		
		// convert to message 
		msgBody = wikiText;
	}
	
	message.append(msgBody);
	
	dMsgCount++;
    
	return message;
}




//--------------------------
// Chat Functions
//--------------------------

//starts spamming, calls dKeepSpamming()
function dSpam()
{   
    if(dSpamming){
        dSpamming = false;
		//$('#textfield').prop("disabled", false);
    }else{
		dSpamming = true;
		//$('#textfield').prop("disabled", true);
		dKeepSpamming();
    }
}


//recursive function that writes a message every 0-249ms
function dKeepSpamming()
{
    if(dSpamming){
		//curEventId = timedEvents[0][2];
		if (dSpamType=="rant") {
			if (dMsgCount < dDialogueStop){
				writeDarkMessage();
				setTimeout(function() {dKeepSpamming(); }, dSpamSpeed);
			}
			else
			{
				banish_dChat();
			}
		}
		if (dSpamType=="conversation"){			
			if (dDialogueCount < dDialogueStop){
				writeDarkMessage();
				dDialogueCount++;
				setTimeout(function() {dKeepSpamming(); }, dSpamSpeed);
			}
			else
			{
				if (dListen){
					dTaunt = false;
					dWaitsForResponse();
				} else {
					console.log("not listening");
					var dExitNode = c_array[dDialogueNode].length-1;
					var dExitFunc = c_array[dDialogueNode][dExitNode];
					console.log(dExitFunc.length);
					for (i=0; i< dExitFunc.length; i++){
						dExitFunc[i]();
					}
				}
			}
		}
		if (dSpamType=="random"){
			writeDarkMessage();
			//setTimeout(function() {dKeepSpamming(); }, Math.floor(Math.random() * spamSpeed));
			setTimeout(function() {dKeepSpamming(); }, dSpamSpeed);
		}
    }
}

/* main.js:1481 Uncaught TypeError: message.replace is not a function
    at replaceEmotes (main.js:1481)
    at getDarkMessage (main.js:1204)
    at writeDarkMessage (main.js:1142)
    at dKeepSpamming (main.js:1108)
    at main.js:1110 */



//writes a random message in the chat
function writeDarkMessage()
{
    var element = $("#chattext");
	element.append(getDarkMessage());
	cutTopOfChat();
    scrollToBottom();
}


//returns a demon name
function getDemonName()
{
    var username = $('<span></span>');
    username.attr("class", "demonname");
	username.append("000:");
    
    return username;	
}




//returns a demon message
	var dMsgOriginX = 80;
	var dMsgBaseWidth = 20;
	var dMsgScale = 1.0;
	var dMsgRandomX;
	var dMsgAdjX;

function getDarkMessage()
{
	// get the sound effect
	var snd_heartbeat = new Audio('../snd/fx/heartbeat.mp3');	
	audioPlay(snd_heartbeat,0.7);
	snd_heartbeat.onended = function() {
		snd_heartbeat.remove();
	};
	//style the bubble
	var message = $('<div id="chatbubble"></div>');
	message.attr("class", "fly-in-element darkbubble");
	
	// apply css changes
	dApplyMsgTransforms(message);

	var msgBody = "";
	
	if(dSpamType=="rant"){
		msgBody = c_array[dDialogueNode][dMsgCount];
	}
	if(dSpamType=="conversation"){
		msgBody = c_array[dDialogueNode][dDialogueCount];
	}
    if (dTaunt){
		msgBody = (dTaunts[Math.floor(Math.random()*dTaunts.length)]);
		if (dRepeatQuestion){
			var curQuestion = dDialogueCount-1;
			msgBody = c_array[dDialogueNode][curQuestion];
		}
	}
	
    if (dSpamType=="random"){
		msgBody = (dRandoms[Math.floor(Math.random()*dRandoms.length)]);
		//loadRandomImg(message);		
	}	
	
    msgBody = replaceEmotes(msgBody);
    msgBody = replacePics(msgBody);
	if (imgMsg){
		message.attr("class", "fly-in-element darkbubble imgbubble");
		message.css("padding", "0vw");	
	}
	
	message.append(msgBody);
	
	dMsgCount++;
    
	return message;
}




function dApplyMsgTransforms(message)
{
	dMsgRandomX = Math.floor(Math.random()*3.5);
	dMsgAdjX = dMsgOriginX - dMsgRandomX;
	
	if (dTaunt){	
		//random font
		var fontType = ["Crafty Girls", "Henny Penny", "Gloria Hallelujah", "Eater", "Lacquer", "Homemade Apple"];
		var num;
		num=Math.floor(Math.random()*fontType.length);
		message.css("font-family", fontType[num]);
		if (dRepeatQuestion){
			var fontType = "Courier Prime";
			message.css("font-family", fontType);		
		}		
		
		//increased size
		dMsgScale = dMsgScale + 0.1;
		dMsgAdjX = dMsgAdjX - (dMsgScale*1.5);
		message.css("font-size", dMsgScale +"vw");
		message.css("line-height", (dMsgScale*1.5) + "vw");
		message.css("padding", (dMsgScale*1.5) + "vw");			
		message.css("width", dMsgBaseWidth + (dMsgScale*1.5) + "vw");
	}
	
	message.css("margin-left", dMsgAdjX + "vw");
}

//--------------------------
// Chat Generic Array Objects
//--------------------------


var dRandoms = ["i can see you", "i can hear you breathing", "im right over here ------>", "do you wanna meet me?", "do you wanna see my face?", "everbody hates you", "i can smell you", "i cant taste you", "chosen 4 whut?", "la diablo estas vivanta ene de mia korpo", "mi sangas pro la vundoj de inferaj trancxoj", "mi glutos vian animon","ni vekigu la lordon de la abismo", "im coming for you", "7:31", "mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon", "naw im just fukkin around with you chosen one", "we breathe chocolate over here", "guess what's for dinner?", "i want to show you something", "these people are already dead. their blood is on your hands", "did you ever think about ending things?","i know things", "i know your secret","i can do things","do you wanna see whut i can do","_eye1","_eye2","_eye3","_eye4","_burn_girl","_face1","_face2","_face3","_face4","_face5","_face6","_face7","_face8","_face9"];

var dTaunts = ["answer the question, claire!", "just answer the question", "times a wastin", "answer me", "speak up", "_just_answer", "_still_waiting", "_answer_me", "_answer_the_question", "_use_your_voice", "_finding_his_voice", "_anyone_there", "answer", "say something", "speak","use ur words", "i need answers", "..."];

var dRefusals = ["i dont care about that", "who gives a fux about that?", "snore", "zzzzzzzzz", "is that your deep dark fantasy?", "only losers care about that", "stop trying to change the subject", "dont make me come over there"];



var pics = [
    ["_eye1", "eyescan.gif"],
    ["_eye2", "eyebug.gif"],
    ["_eye3", "eyered.gif"],
    ["_eye4", "eyeblood.gif"],
    ["_burn_girl", "burning_girl.gif"],	
    ["_face1", "facetougues.gif"],
    ["_face2", "face_flower.gif"],
    ["_face3", "girlmad.gif"],
    ["_face4", "girlcry1.gif"],
    ["_face5", "girlcry2.gif"],
    ["_face6", "girlcry3.gif"],
    ["_face7", "babyface.gif"],
    ["_face8", "monsterwoman.gif"],
    ["_face9", "mirrorgirl.gif"],
	["_just_answer", "just_answer.gif"],
	["_cant_ignore", "cant_ignore_me.gif"],
	["_answer_me", "answer_me.gif"],
	["_answer_the_question", "answer_the_question.gif"],
	["_still_waiting", "still_waiting.gif"],
	["_use_your_voice", "use_your_voice.gif"],
	["_finding_his_voice", "finding_his_voice.gif"],
	["_anyone_there", "anyone_there.gif"]
];


//--------------------------
// Demon Layers
//--------------------------

var d_timer = 5000;

function summon_Layer(layernum, layertype, bckcolor, bckimg, speedin, speedout, alpha, timeout){	
	var targetLayer = $("#overlay"+layernum);
	
	targetLayer.attr("class", layertype);
	targetLayer.css("background-color", bckcolor);
	if (bckimg != null){
		targetLayer.css("background-image", "url('"+ bckimg +"')");
	}	
	
	targetLayer.fadeTo( speedin, alpha, function(){
	});
	
	clearTimeout(d_timer[layernum]);
	d_timer[layernum] =  window.setTimeout(function(){banish_Layer(layernum, speedout)}, timeout);
}

function banish_Layer(layernum, speedout){
	$("#overlay"+layernum).fadeTo( speedout, 0.0, function(){
	});
}

function banish_allLayers(speedout)
{
	banish_Layer(0, speedout);
	banish_Layer(1, speedout);
	banish_Layer(2, speedout);
}


//--------------------------
// Demon Sounds
//--------------------------

	var s_timer = 5000;
	var vol = 0.05;
	var pbr = 0.5;
	var snd_plyr = 0;

function summon_Sound(snd, snd_plyr, speedin, speedout, vol, pbr, timeout){
	var music_player = $("#audio" + snd_plyr);
	var music = $("#audio" + snd_plyr)[0];
	music.volume = vol;
	music.src = '../snd/' + snd;	
	music.play();
	audioFadeIn(music_player, speedin);
	music.playbackRate = pbr;
	
	clearTimeout(s_timer[snd_plyr]);
	s_timer[snd_plyr] =  window.setTimeout(function(){banish_Sound(snd_plyr, speedout)}, timeout);		
}

function banish_Sound(snd_plyr, speedout){
	var audio = $("#audio"+snd_plyr);
	audioFadeOut(audio, speedout);	
}

function banish_allSounds(speedout){
	banish_Sound(0, speedout);
	banish_Sound(1, speedout);
	banish_Sound(2, speedout);		
}


//--------------------------
// Demon Manifestations
//--------------------------

	var t_timer = 5000;

function summon_Apparition(speed, scale, timeout){

	tentacleIsActive = true;
	tentacleVel = speed;
	tentacleScale = scale;

	if (!tentacleInit)
	{
		initTentacle();
	}
	//tentacleInit = false;
	console.log("tentacle has arrived");
	
	clearTimeout(t_timer);
	t_timer =  window.setTimeout(banish_Apparition, timeout);	
}

function banish_Apparition(){
	tentacleIsActive = false;	
}








//--------------------------
// AutoChat module
//--------------------------

	var spamming = false;
	var spamType = "positive";
	var spamSpeed = 2400;
	var darkMode = false;


var usernamePrefixes = ["scary", "spooky", "sick", "insane", "cool", "revenge_of_", "mad", "generic", "Cpt", "nice", "xxx", "Dan", "VAC", "SWE", "Wizard", "faceless", "olof","best_", "daddy", "boo", "mister_", "davai", "Nick", "da_", "the_", "iAm", "Loungin", "extra", "BOT", "dirty", "shoutout_to_", "devil", "Only"];

var usernameSuffixes = ["Kappa", "Sniper", "maniac", "shipwreck", "M", "LULZ", "Games", "Radley101", "lolo", "_yolo", "QQ", "stone", "Trumpster", "xD", "meister", "eric", "jenna", "loser", "haha", "noob", "dude", "Bro", "shotgun", "DADDY", "OneTaps", "winner", "jarod", "pepe", "explosion", "easy", "Nut", "000", "Biceps", "gamer", "Majestic", "zzzzz", "vortex", "sound", "tv"];

var usernameColors = ["red", "green", "#40b7b5", "blue", "purple", "#aa9929"];

var positiveMessages = ["&#129505;&#129505;&#129505;&#129505;&#129505;", "<div class='bigchat'>HEY YOOOO GUYZ!</div>", "best eppie evah", "LIZZY LUV", "I can't feel my lungs", "&#128072; feels all the feels", "gettin goosebumps now &#128123;", "WTF", "LUL", "holy shit", "SAVED &#128512;", "ez", "GG", "&#128512;", "<div class='bigchat'>LOVE THIS SHOW!!!</div>", "WHAT", "Smash LIKE BUTTON, Peasants!", "&#128512;&#128512;&#128512;&#128512;&#128512;", "anyone like pasta?", "awesome clawsome", "Freddy has powerful swim swims", "Mark is my spirit animal", "KAT GREED", "The enemy of my enemy is my Freddy", "The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top", "&#128512;&#128512;&#128512;&#129505;&#129505;&#129505;","&#128077;"];

var negativeMessages = ["BOT", "WTF LMAO", "Stop moving your head! gettin dizzy", "dizzy", "&#128577; VOLUME UP, PREEZ!", "NA CS", "LOL this ridic", "WTF", "LUL", "HAHAHAHA", "OMG", "LMAO&#129315;&#129315;&#129315;", "so bad omg &#128577;", "xD", "FAKE &#128078;", "fakey-fake &#128580;", "fake as fxxk", "FAKE FAKE FAKE", "WutFace", "NotLikeThis", "4Head", "KAT GREED", "salty peanuts yum yum", "Lizzy already won this debate, move along", "PALPATINE'S BEHIND IT ALL!!!","&#128577;","&#128078;&#128078;&#128078;&#128078;"];

var scaredMessages = ["OMG WTF is was that?", "GET OUTTA THERE!", "&#128128;", "Run, Forrest, Run!", "dizzy", "Noooooooo", "OMFG", "just crapped my pantaloons", "WTF", "this is my worst nightmare", "OMG run", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "can't take this", "please jesus god no more jump scares", "&#128123;&#128577;", "NotLikeThis", "...", "<=== IS SCARED &#128556;", "heart palpittashuns","&#128123;&#128123;&#128123;&#128123;&#128123;&#128123;&#128123;","&#128552;&#128552;&#128552;&#128552;&#128552;&#128552;&#128552;&#128552;&#128552;","&#128552;","&#128552;","&#128552;"];

var weirdMessages = ["The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top", "RUINED", "SAVED", "RUINED", "CoolStoryMan"];


var emotes = [
    ["Kappa", "kappa.png"],
    ["WutFace", "wutface.png"],
    ["4Head", "4head.png"],
    ["CoolStoryMan", "bobross.png"],
    ["DansGame", "dansgame.png"],
    ["NotLikeThis", "notlikethis.png"],
    ["PogChamp", "pogchamp.png"]
];




//writes a random message in the chat
function writeMessage()
{
    var element = $("#chattext");
	element.append(getMessage());
	cutTopOfChat();
    scrollToBottom();
}


//returns a random message
function getMessage()
{	
	var snd_bubble = new Audio('../snd/fx/bubble.mp3');
	audioPlay(snd_bubble, 0.05);
	snd_bubble.onended = function() {
		snd_bubble.remove();
	};
	
    var message = $('<div id="chatbubble"></div>');
	message.attr("class", "fade-in-element userbubble");	
	message.append(getUserName());	
	message.append("&nbsp;&#58;&nbsp;");

    var msgBody = "";
    
    if(spamType=="positive")
        msgBody = (positiveMessages[Math.floor(Math.random()*positiveMessages.length)]);
    else if(spamType=="negative")
        msgBody = (negativeMessages[Math.floor(Math.random()*negativeMessages.length)]);
    else if(spamType=="scared")
        msgBody = (scaredMessages[Math.floor(Math.random()*scaredMessages.length)]);
	else if(spamType=="weird")
        msgBody = (weirdMessages[Math.floor(Math.random()*weirdMessages.length)]);
	else if(spamType=="demon")
		msgBody = (demonMessages[Math.floor(Math.random()*demonMessages.length)]);
		//loadRandomImg(message);

    msgBody = replaceEmotes(msgBody);
    msgBody = replacePics(msgBody);
	
    message.append(msgBody);
	
    return message;
}



//replace text with img
function replaceEmotes(message)
{	
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='../img/emotes/"+emotes[i][1]+"' class='emoticon' alt='"+emotes[i][0]+"' vertical-align='bottom'>");
    } 
    return message;
}


var imgMsg = false;

function replacePics(message)
{	
	imgMsg = false;

    for(var i=0;i<pics.length;i++){
		var str = message;
		var n = str.search(pics[i][0], 'g');
		if (n >=0) { 
			imgMsg = true;
		}
		message = message.replace(new RegExp(pics[i][0], 'g'), "<img loading='eager' onload='scrollToBottom()' src='../img/pics/"+pics[i][1]+"' class='pic' alt='"+pics[i][0]+"'>");	
    }
    return message;
}



//returns a random username
function getUserName()
{
    var username = $('<span></span>');
    username.attr("class", "username");
	var usercolor = getUsernameColor();
    username.css("color", usercolor);
    username.append(usernamePrefixes[Math.floor(Math.random()*usernamePrefixes.length)]);   //gets a random username from the array
    username.append(usernameSuffixes[Math.floor(Math.random()*usernameSuffixes.length)]);   //gets a random username from the array
    
    if(Math.random() > 0.5)
    {
        username.append(Math.floor(Math.random() * 120));
    }
    
    return username;
}

//returns one of the colours you could have as your username
function getUsernameColor()
{
    return usernameColors[Math.floor(Math.random()*usernameColors.length)];
}


//checks to see if the chat is too long and cuts the top elements if it is
function cutTopOfChat()
{
    var element = $("#chattext");
	chattext.scrollTop = chattext.scrollHeight;
	
	
    if(element.children().length > 100)
    {
        var chatMessages = element.children();
		chatMessages[0].remove();
/*         for(i = 0; i<10; i++)
        {
            chatMessages[i].remove();
        } */
    }
}



//starts spamming, calls keepSpamming()
function spam()
{
    var spamButton = $("#spamButton");
    spamButton.empty();
    
    if(spamming)
    {
        spamming = false;
        spamButton.append("spam");
    }
    else
    {
        spamming = true;
        keepSpamming();
        spamButton.append("stop spamming");
    }
}


//recursive function that writes a message every 0-249ms
function keepSpamming()
{
    if(spamming)
    {
        writeMessage();
        setTimeout(function() {keepSpamming(); }, Math.floor(Math.random() * spamSpeed));
    }
}


//random web image
var keytags = "scary, demon, evil";

function loadRandomImg(message)
{
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keytags,
            tagmode: "all",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

            //$('body').css('background-image', "url('" + image_src + "')");
			$("<img width='100%' />").attr({src: data.items[rnd].media.m.replace('_m.','.')}).appendTo(message);
        });
}


/* Chat scrolling functions */

//scrolls to the bottom of the chat
function scrollToBottom()
{
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;
	
	//cleanUpScroll();
}

function scrollToTop()
{
	var chattext = document.getElementById("chattext");
	chattext.scrollTop = 0;
}


var scrollDir = "down";

$(function () {
	
    var position = $("#chattext").scrollTop();

    $("#chattext").scroll(function () {
        var scroll = $("#chattext").scrollTop();

        if (scroll > position) {
			scrollDir = "down";
            //console.log('moving DOWN the page');

        } else {
			scrollDir = "up";
            //console.log('moving UP the page');			
        }

        position = scroll;
    });

});


document.addEventListener('scroll', function (event) {
    if (event.target.id === 'chattext')
	{
		// fade in and out bubbles by position and scroll direction
		var topOfScroll = chattext.getBoundingClientRect().top;	
		elements = document.querySelectorAll('#chatbubble');
		
		for (var i = 0; i < elements.length; i++)
		{
			var element = elements[i];
			var positionFromTop = element.getBoundingClientRect().top;
			var positionFromBottom = element.getBoundingClientRect().bottom;
			var messageHeight = (element.clientHeight)/2;

			if (scrollDir === "down"){
				if (positionFromBottom < topOfScroll + messageHeight)
				{
					element.classList.remove('fade-in-element');
					element.classList.add('fade-out-element');
				}
			}
			
			if (scrollDir === "up"){
				if (positionFromBottom >= topOfScroll)
				{
					element.classList.remove('fade-out-element');
					element.classList.add('fade-in-element');
				}
			}
		}
	}
}, true /*Capture event*/);





//----------------------------------------------------
// Player Interaction
//----------------------------------------------------

//--------------------------
// Trigger Nouns
//--------------------------

var nounTriggers = [
	["_INVALID_", 	0,   0, 139.5],
	["START"	, 	0,   0, 43.5],
	["AYESHA"	, 	15,  0, 54.65],
	["ROAD"		, 	50,  0, 54.65],
	["TREE"		, 	68,  0, 54.65],	
	["PENTAGRAM", 	101, 0, 54.65],
	["CHURCH"	, 	127, 0, 54.65],	
	["DOOR"		, 	142, 0, 54.65],
	["STEEPLE"	, 	151, 0, 54.65],
	["FIELD"	, 	161, 0, 54.65],	
	["FACE"		, 	170, 0, 54.65],
	["DATE"		, 	181, 0, 54.65],
	["FOUNDING"	, 	181, 0, 54.65],	
	["ENGRAVING", 	181, 0, 54.65],		
	["JENNA"	, 	224, 0, 54.65],	
	["WINDOW"	, 	248, 0, 54.65],
	["GRAFFITI"	, 	248, 0, 54.65],
	["VANDALISM", 	248, 0, 54.65],		
	["ERIC"		, 	285, 0, 54.65],
	["PENIS"	, 	294, 0, 54.65],
	["JASON"	, 	300, 0, 54.65],	
	["ANNE"		, 	309, 0, 54.65],
	["STAIRS"	, 	312, 0, 54.65]	
];



//--------------------------
// NLP Module
//--------------------------

var words = []; 
var nouns = []; 
var verbs = []; 
 

 // Load all text dictionaries
function loadDictionary() {
    // Get an array of all the words
    words = dict.split( "," );
	nouns = dict_nouns.split( "," );
	verbs = dict_verbs.split( "," );

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words [ i ] ] = true;
	}	
    for ( var i = 0; i < nouns.length; i++ ) {
		dict_nouns[ nouns [ i ] ] = true;
	}
    for ( var i = 0; i < verbs.length; i++ ) {
		dict_verbs[ verbs [ i ] ] = true;
	}
	
	//nouns = nouns.filter( ( el ) => !verbs.includes( el ) );	
	var lastVerb = verbs.length - 1;
	console.log(verbs.length + " verbs loaded: " + verbs[0] + " to " + verbs[lastVerb] );	

	var lastNoun = nouns.length - 1;
	console.log(nouns.length + " nouns loaded: " + nouns[0] + " to " + nouns[lastNoun] );		
}


function strToArray(str)
{
	var newStr = str;
	
/* 	var newStr = str.replace(/and|then/gi, ".");
	newStr = newStr.replace(/go to |go towards |go back to |travel to |travel towards |move to |move towards |go back to |walk to |walk towards| head to |head towards |head back to |return to |\s+get to /gi, " _GO_TO: ");
	newStr = newStr.replace(/\s+on |\s+in |\s+at |\s+with /gi, " _INTERACT_WITH: "); */

//Walk towards the store and make a balloon animal on their table in the back then walk to the front of the place and get on the stage then vomit andthen make a pass at the waitress!
	
    // Convert to uppercase
	let strUpper = newStr.toUpperCase();

    // Get an array of all the words	
    playerwords = strUpper.split( " " );
	
	// Eliminate removal words
	const removeWords = ["A", "AS", "THE", "TO", "OF"]; 
	playerwords = playerwords.filter( ( el ) => !removeWords.includes( el ) );	

	triggerWords = [];
	
	for (var i = 0; i < playerwords.length; i++){	
		searchCommands(playerwords[i]);
	}
	
	var lastValidWord = triggerWords.length - 1;	
	
	assembleResponse(triggerWords[lastValidWord]);
	console.log(playerwords);
}


	var curResponse = 0;
	var r_timer = null;
	var keynouns = [];
	var keyverbs = [];	
	var keytimes = [];

// Search for keyword triggers
function searchCommands(word)
{
	keynouns = [];
	keytimes = [];
	
	for (var i = 0; i < nounTriggers.length; i++)
	{
		keynouns.push(nounTriggers[i][0]);
		keytimes.push(nounTriggers[i][1]);		
	}
	
	const result = keynouns.includes(word);
	pos = keynouns.indexOf(word);
	//console.log("word=" + word + pos);
	
	findWord(word);
	
	if (result)
	{
		curResponse = pos;
		triggerWords.push(word);		
    }
	
	// a creepy tree is over there
}



function assembleResponse(word)
{
	if (chatTarget == "webcam"){	
		if (triggerWords.length > 0) {
			var speechBubble = $('<div id="response"></div>');
			speechBubble.attr("class", "fade-in-element dialoguebubble");	
			
			var speechBody = "Okay, let's look at the " + word + ".";
			speechBubble.append(speechBody);	
			
			console.log('"' + word + '" will trigger a game action.');		
			
			//invalidWords.push(word);		
			//jumpToTime(keytimes[pos]);
			//responsiveVoice.speak("Okay, let's look at the " + commandNoun,$('#voiceselection').val());
		}
		else
		{
			//findWord(word);
			curResponse = 0;
			console.log('This word does not affect the game');
			
			var speechBubble = $('<div id="response"></div>');
			speechBubble.attr("class", "fade-in-element dialoguebubble");			
			
			var speechBody = "I don't see anything like that around here.";
			speechBubble.append(speechBody);		
		}
		
		speak(speechBody);
		loadResponse(speechBubble);
	}
}


// Load a response from the webcam
function loadResponse(speechBubble)
{
	var element = $("#responsebox");
	
	if ($("#response").length === 0) {
		
		element.append(speechBubble);
		
		clearTimeout(r_timer);
		r_timer =  window.setTimeout(fadeResponse, 3093);
		$("#webcam-video")[0].currentTime = nounTriggers[curResponse][3];
	}	
	else
	{
		console.log("last response is still playing");
	}
}


// Return webcam to a waiting loop
function updateWebCam()
{
	if ($("#webcam-video")[0].currentTime >= 43.5)
	{
		if ($("#response").length === 0) {
			$("#webcam-video")[0].currentTime = 36.5;
		}
	}
}
	

function fadeResponse()
{
	var _response = document.getElementById("response");	
	_response.classList.remove('fade-in-element');
	 $("#response").fadeOut("normal", function() {
        $(this).remove();
    });
	
	console.log("response removed");
}



//writes the text of the input field into the chat with a declared username
function chat()
{    
    var textfield = $("#textfield");
    var element = $("#chattext");
    
    if(textfield.val()!="")
    {
        var message = $('<div id="chatbubble" name="bubble"></div>');	
        message.attr("class", "chatMessage playerbubble fade-in-element");		
        message.append(getPlayerName());
        message.append(" ");

        var msgBody = textfield.val();
        msgBody = replaceEmotes(msgBody);
		var msgBodyDiv = $('<div class="playertext">' + msgBody +'</div>');
		message.append(msgBodyDiv);
   
        textfield.val("");
    
        element.append(message);
		plReply = msgBody;
		if (chatTarget == "demon"){
		}
		
		if (chatTarget == "webcam"){
			strToArray(msgBody);
		}
		
		//msgCommand = "the " + msgBody;
		//searchCommandWords(msgCommand);
		
		scrollToBottom();
		cutTopOfChat();
    }
}


//returns a set player rname
function getPlayerName()
{
	var playername = $('<div text-align = "center"></div>');
	playername.attr("class", "playername");
	playername.append("&#9733;&nbsp;The Chosen One");
	playername.append("<br>");
	
	return playername;
	
}


//hides the chat text
function hideChatText()
{
    var element = $("#chattext");
    var hideButton = $("#hideButton");
    
    element.toggle();
    hideButton.empty();
    
    if(element.is(":visible"))
    {
        hideButton.append("hide");
    }
    else
    {
        hideButton.append("show");
    }
}


//clears the chat of messages
function clearChat()
{
    var element = $("#chattext");
    
    element.empty();
}






//--------------------------
// Demo Settings	
//--------------------------

//toggles between dark mode and normal mode
function darkmode()
{ 	
	var darkModeEnd = 20000;

    var chat = $("#chat");
    if(darkMode)
    {
        darkMode = false;
		$("#darkModeButton").css("background-color", "#FFFFFF");
		$("#darkModeButton").css("color", "#000000");
		banish_dChat();
    }
    else
    {
        darkMode = true;
		$("#darkModeButton").css("background-color", "#000000");
		$("#darkModeButton").css("color", "#FFFFFF");
		summon_Chat(darkModeEnd);
	}
	console.log("darkmode=" + darkMode);
}


//makes a "settings" box
function makeSettings()
{
    $("#settingsButton").css("background-color", "#4b2f7f");
        
    var settings = $('<div class="dirmenu" name="settingsButton" align="center"></div>');
    settings.attr("id", "settings");
	//settings.attr("class", "settingsMenu");
        
        
    var clearButton = $('<button></button>');
    clearButton.append("clear");
    clearButton.attr("onClick", "clearChat()");
        
        
    var spamButton = $('<button></button>');
    if(spamming)
    {
        spamButton.append("stop spamming");
    }
    else
    {
        spamButton.append("spam");
    }
    spamButton.attr("onclick", "spam()");
    spamButton.attr("id", "spamButton");
    
    var darkModeButton = $('<button id="darkModeButton"></button>');
    darkModeButton.append("toggle dark mode");
    darkModeButton.attr("onclick", "darkmode()");
    
    var selectSpam = $('<select><select>');
    selectSpam.attr("id", "selectspamtype");
    selectSpam.attr("onChange", "chooseSpam()");
    
// spam types	
	
    var loveSpam = $('<option></option>');
    loveSpam.attr("value", "positive");
    loveSpam.append("&#128525;&nbsp;&nbsp;&nbsp;Adoring");
	
    var positiveSpam = $('<option></option>');
    positiveSpam.attr("value", "positive");
    positiveSpam.append("&#128512;&nbsp;&nbsp;&nbsp;Happy");
	
    var snarkySpam = $('<option></option>');
    snarkySpam.attr("value", "positive");
    snarkySpam.append("&#128527;&nbsp;&nbsp;&nbsp;Snarky");	
	
    var neutralSpam = $('<option></option>');
    neutralSpam.attr("value", "positive");
    neutralSpam.append("&#128528;&nbsp;&nbsp;&nbsp;Neutral");
 
	var negativeSpam = $('<option></option>');
    negativeSpam.attr("value", "negative");
    negativeSpam.append("&#128577;&nbsp;&nbsp;&nbsp;Unhappy");

	var angrySpam = $('<option></option>');
    angrySpam.attr("value", "negative");
    angrySpam.append("&#128544;&nbsp;&nbsp;&nbsp;Angry");
    
	var scaredSpam = $('<option></option>');
    scaredSpam.attr("value", "scared");
    scaredSpam.append("&#128552;&nbsp;&nbsp;&nbsp;Scared");
	
	var screamSpam = $('<option></option>');
    screamSpam.attr("value", "scared");
    screamSpam.append("&#128561;&nbsp;&nbsp;&nbsp;Terrified");		

    var wackySpam = $('<option></option>');
    wackySpam.attr("value", "positive");
    wackySpam.append("&#128540;&nbsp;&nbsp;&nbsp;Wacky");
    
	var weirdSpam = $('<option></option>');
    weirdSpam.attr("value", "weird");
    weirdSpam.append("&#128565;&nbsp;&nbsp;&nbsp;Weird");

	var demonSpam = $('<option></option>');
    demonSpam.attr("value", "demon");
    demonSpam.append("&#128520;&nbsp;&nbsp;&nbsp;Demonic");	
	
    selectSpam.append(loveSpam);    
    selectSpam.append(positiveSpam);
    selectSpam.append(snarkySpam);
    selectSpam.append(neutralSpam);	
    selectSpam.append(negativeSpam);
    selectSpam.append(angrySpam);	
    selectSpam.append(scaredSpam);	
    selectSpam.append(screamSpam);
    selectSpam.append(wackySpam);	
    selectSpam.append(weirdSpam);
    selectSpam.append(demonSpam);	
    
	var selectSpeaker = $('<select><select>');
	selectSpeaker.attr("id", "voiceselection");
/* 	var voicelist = responsiveVoice.getVoices();
	var vselect = $('#voiceselection');
		$.each(voicelist, function() {
				selectSpeaker.append($("<option />").val(this.name).text(this.name));
		}); */
    
    var selectSpeed = $('<input></input>');
    selectSpeed.attr("type", "range");
	selectSpeed.attr("value", "1");	
    selectSpeed.attr("id", "selectspeed");
    selectSpeed.attr("onchange", "chooseSpeed()");
    
    settings.append($('<h3></h3>').append("chat mood"));
    settings.append(selectSpam);
    settings.append($('<h3></h3>').append("chat speed"));
    settings.append(selectSpeed);    
    settings.append("<br><br>");
    settings.append(spamButton);
    settings.append("<br><br>");
    settings.append(clearButton);
    settings.append("<br><br>");
    settings.append(darkModeButton);
    settings.append("<br>");
    settings.append($('<h3></h3>').append("voice"));
	settings.append(selectSpeaker);
	settings.append("<br><br>");
	
	
    
/*     var settingsButton = $("#settingsButton");
    settingsButton.append(settings); */
	
    var settingsMenu= $("body");
    settingsMenu.append(settings);

	var el = document.getElementById('settings');
	el.style.position = 'fixed';
	el.style.left = '5px';
	el.style.top = '40px';
	el.style.width = '250px';
}


/* videojs("main-video").ready(function(){
	console.log("video ready");
	var video = document.getElementsByTagName('video')[0];
	video.jumpToTime(50);

}); */


// toggles menus on and off

function toggleMenu()
{
	
	var curButton = "#" + event.srcElement.id;
	var curMenu = "#" + event.srcElement.name;

	$('.dirButton').css("background-color", "gray");	
	$('.dirButton').css("color", "white");	
    $(curMenu).toggle();
	$('div.dirmenu:not(' + curMenu + ')').hide();
    
    if($(curMenu).css('display') == 'none')
    {
        $(curButton).css("background-color", "gray");
		$(curButton).css("color", "white");
    }
    else
    {
        $(curButton).css("background-color", "white");
		$(curButton).css("color", "black");
    }
}

function hideMenu(hidingMenu, hidingButton)
{
	
	if($(hidingMenu).css('display') == 'none')
    {
        $(hidingButton).css("background-color", "gray");
		$(hidingButton).css("color", "white");
    }
    else
    {
        $(hidingButton).css("background-color", "white");
		$(hidingButton).css("color", "black");
    }
}



//shows or hides the settings
function toggleSettings()
{
    $("#settings").toggle();
	// $('div.dirmenu:not(#settings)').hide();
	$('div.dirmenu:not(#settings)').hide();	
	// document.getElementById('videoctrl').css.display = "none";	
    
    if($("#settings").css('display') == 'none')
    {
        $("#settingsButton").css("background-color", "gray");
		$("#settingsButton").css("color", "white");
    }
    else
    {
        $("#settingsButton").css("background-color", "white");
		$("#settingsButton").css("color", "black");
    }
}



//sets the type of spam from the input in the settings
function chooseSpam()
{
    spamType = $("#selectspamtype").val();
}

//sets the type of voice from the input in the settings
function chooseVoice()
{
}

//sets the speed from the input in the settings
function chooseSpeed()
{
    var val = $("#selectspeed").val();
    spamSpeed = 2200 - (20 * val);
}



// Monlogue triggers

var speeches = [
	["Welcome to the Haunted Stream Project's interactive demo. Uncle Jarod's latest innovations include me, a soul-less robot, programmed to respond to your asinine comments.", 2, 6] ,
	["If you would like to switch to a different camera perspective, click on the labeled camera buttons shown along the bottom of the screen.", 8, 12],
	["If you see anything in the footage you'd like to take a closer look at, try typing about it in the text message field of the chatbox, located in the lower right corner of your screen. For example, if you see a fallen tree by a roadside, you might type, &quot;Hey, check out that creepy tree!&quot;", 14, 22]
]

var curspeech = 0;
var prevspeech = 0;
var speechText = "";
var speechText = speeches[curspeech][0]
var speechStart = speeches[curspeech][1];
var speechEnd = speeches[curspeech][2];
var speechflag = false;


function speechCheck()
{
/* 	if (curspeech < speeches.length){
		RunSpeeches();
	} */
}


function RunSpeeches()
{
	var myPlayer = videojs('main-video');	
	
	speechText = speeches[curspeech][0]
	speechStart = speeches[curspeech][1];	
	speechEnd = speeches[curspeech][2];		
	if (myPlayer.currentTime() > speechStart){
		if (!speechflag)
		{
			getSpeech();
			speechflag = true;
			console.log(speechEnd);
		}
	}
	
	if (myPlayer.currentTime() >= speechEnd){
		if (speechflag)
		{		
			removeSpeech();
		}			
	}
}

function removeSpeech()
{	
	prevspeech = curspeech;
	var _speech = document.getElementById("monologue" + prevspeech);	
	_speech.classList.remove('fade-in-element');
	$("#monologue" + prevspeech).fadeOut(1000);
	curspeech = curspeech + 1;
	speechflag = false;
	console.log("fadeout");
	return;
}


function getSpeech()
{
	var nextspeech = curspeech;
	var speechBubble = $('<div id="monologue' + nextspeech + '"></div>');
	speechBubble.attr("class", "fade-in-element monologuebubble");
	var speechBody = speeches[nextspeech][0];
	speechBubble.append(speechBody);
	// responsiveVoice.speak(speechBody ,$('#voiceselection').val());
	
	var element = $("#speechbox");
	element.html(speechBubble);
	return;
}



function log(msg) {
  // document.getElementById('events').innerHTML = '';
  console.log(msg);
}