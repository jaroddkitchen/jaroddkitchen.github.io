//----------------------------------------------------
// INIT VARS
//----------------------------------------------------

	var video;
	//var video = document.getElementsByTagName('video')[0];

	var webcamvideo;
	//var webcamvideo = document.getElementsByTagName('video')[1];	

	// Zero all video flags   
	var camLoaded = false;
	var webcamLoaded = false;
	var videoBuffered = false;
	var webcamvideoBuffered = false;
	var mainVideoStart = false;
	
	// Set conversation target to the webcam
	var chatTarget = "webcam";


//----------------------------------------------------
// INIT ROUTINES
//----------------------------------------------------

// CALL WHEN PAGE LOADS
function init(){
	loadCam();
	loadWebCam();
	setupInterface();
	loadDictionary();
}

// LOAD THE MAIN VIDEO PLAYER
function loadCam(){
	videojs('main-video').ready(function(){
		video = this;
		console.log("player ready");
		camLoaded = true;
		video.setAttribute("poster", "../img/art/svg/blank_poster.png");
		video = document.getElementsByTagName('video')[0];
		addVideoListeners();
	})
}

// LOAD THE WEBCAM VIDEO PLAYER
function loadWebCam(){
	$("#webcam-video").ready(function(){
		webvideo = this;
		console.log("webcam player ready");
		webcamLoaded = true;
		webcamvideo = document.getElementsByTagName('video')[1];
		addWebcamListeners();
	})
}

// SETUP INTERFACE ELEMENTS
function setupInterface(){
    makeSettings();
	toggleSettings();
	initWebcam();
	toggleCamera(0);
}

// CALL WHEN VIDEO IS LOADED
function initMainVideoStart(){
	video.setAttribute("poster", "../img/art/svg/blank_poster.png");	
	document.body.requestFullscreen();	
	mainVideoStart = true;
	showInterface();
	video.pause();
	webcamvideo.pause();
	video.play();
	webcamvideo.play();
	spamming = true;
	keepSpamming();	
	preloadAudio();	
}


//----------------------------------------------------
// EVENT LISTENERS
//----------------------------------------------------

// ADD VIDEO LISTENERS
function addVideoListeners(){
// Camera listeners
	// waiting
	video.addEventListener('waiting', function () {log('waiting');});
	// playing
	video.addEventListener('playing', function () {log('playing');});	
	// pause
	video.addEventListener('pause', function () {log('pause');});
	// play
	video.addEventListener('play', function () { log('play');
		// first play action
		if (!mainVideoStart){
			initMainVideoStart();
		}
	});
	// stalled
	video.addEventListener('stalled', function () {log('stalled');});
	// seeking
	video.addEventListener('seeking', function () {log('seeking');});
	// seeked
	video.addEventListener('seeked', function () {log('seeked');});
	// time update	
	//video.addEventListener('timeupdate', function() { log('time update');});
}

// ADD VIDEO LISTENERS
function addWebcamListeners(){
// Camera listeners
	// waiting
	//webcamvideo.addEventListener('waiting', function () {log('webcam waiting');});
	// playing
	//webcamvideo.addEventListener('playing', function () {log('webcam playing');});	
	// pause
	//webcamvideo.addEventListener('pause', function () {log('webcam pause');});
	// play
	//webcamvideo.addEventListener('play', function () { log('webcam play');});
	// stalled
	//webcamvideo.addEventListener('stalled', function () {log('webcam stalled');});
	// seeking
	//webcamvideo.addEventListener('seeking', function () {log('webcam seeking');});
	// seeked
	//webcamvideo.addEventListener('seeked', function () {log('webcam seeked');});
	// time update	
	webcamvideo.addEventListener('timeupdate', function() { updateWebCam();});
}

// WHEN WINDOW IS RESIZED
window.addEventListener('resize', scrollResize);

// WHEN FULLSCREEN IS TOGGLED
document.addEventListener("fullscreenchange", function() {
  console.log("fullscreenchange event fired!");
  scrollResize();
});

// WHEN CHAT IS SCROLLED
document.addEventListener('scroll', function (event) {
    if (event.target.id === 'chattext'){
		// Fade in and out bubbles by position and scroll direction
		var topOfScroll = chattext.getBoundingClientRect().top;	
		elements = document.querySelectorAll('#chatbubble');
		for (var i = 0; i < elements.length; i++){
			var element = elements[i];
			var positionFromTop = element.getBoundingClientRect().top;
			var positionFromBottom = element.getBoundingClientRect().bottom;
			var messageHeight = (element.clientHeight)/2;
			// Fade out at top of chat
			if (scrollDir === "down"){
				if (positionFromBottom < topOfScroll + messageHeight){
					element.classList.remove('fade-in-element');
					element.classList.add('fade-out-element');
				}
			}
			// Fade in at bottom of chat			
			if (scrollDir === "up"){
				if (positionFromBottom >= topOfScroll){
					element.classList.remove('fade-out-element');
					element.classList.add('fade-in-element');
				}
			}
		}
	}
}, true /*Capture event*/);


//----------------------------------------------------
// INTERFACE DISPLAY
//----------------------------------------------------

// HIDE/SHOW THE CHAT INTERFACE
function hideInterface(){ $("#chat").css("display", "none");}
function showInterface(){$("#chat").css("display", "inline");}

// REDRAW CHAT'S SCROLLFIELD
function scrollResize(){ scrollToTop(); scrollToBottom();}


//----------------------------------------------------
// DEV FUNCTIONS
//----------------------------------------------------

// LOG TO CONSOLE
function log(msg) {
  // document.getElementById('events').innerHTML = '';
  console.log(msg);
}


//----------------------------------------------------
// SOUND FX FUNCTIONS
//----------------------------------------------------

// AUDIO PRELOADER
function preloadAudio(){
	var audio_preload = 0;
	function launchApp(launch){
		audio_preload++;
		if ( audio_preload == 3 || launch == 1) {  // set 3 to # of your files
			startSound();  // set this function to your start function
		}
	}
	var support = {};
	function audioSupport() {
		var a = document.createElement('audio');
			var ogg = !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
		if (ogg) return 'ogg';
			var mp3 = !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
		if (mp3) return 'mp3';
		else return 0;
	}
	support.audio = audioSupport();
	function loadAudio(url, vol){
		var audio = new Audio();
		audio.src = url;
		audio.preload = "auto";
		audio.volume = vol;
		$(audio).on("loadeddata", launchApp);  // jQuery checking
		return audio;
	}
	if (support.audio === 'ogg') {
		var snd1 = loadAudio("../snd/music/Ice_Demon.ogg", 0.0);  // ie) the 1 is 100% volume
		var snd2 = loadAudio("../snd/music/twinkle_twinkle.ogg", 0.0);  // ie) the 0.3 is 30%
		var snd3 = loadAudio("../snd/music/horror_buzz.ogg", 0.0);
        // add more sounds here
	} else if (support.audio === 'mp3') { 
		var snd1 = loadAudio("../snd/music/Ice_Demon.mp3", 0.0);
		var snd2 = loadAudio("../snd/music/twinkle_twinkle.mp3", 0.0);
		var snd3 = loadAudio("../snd/music/horror_buzz.mp3", 0.0);
        // add more sounds here
	} else {
		launchApp(1);  // launch app without audio
 }

	// this is your first function you want to start after audio is preloaded:
	function startSound(){
		//if (support.audio) snd3.play();  // this is how you play sounds
		log("audio preloaded");
	}
}

// PLAY AUDIO
function audioPlay(audio, vol) {
	audio.volume = vol;
	audio.play();
}

// FADE AUDIO IN
function audioFadeOut(audio, dur){
    audio.animate({volume: 0.0}, dur);
}
// FADE AUDIO OUT
function audioFadeIn(audio, dur, vol){
    audio[0].volume = 0.0;
    audio.animate({volume: vol}, dur);
}


//----------------------------------------------------
// VISUAL FX MODULES
//----------------------------------------------------


//----------------------------------------------------
// VIDEO CONTROL	
//----------------------------------------------------

// MAIN VIDEO URLS
var videoplaylist = [
	["pennhurst", "https://video.wixstatic.com/video/bde2cd_29fc09fb61cd469fa5e1de604ddd8be6/720p/mp4/file.mp4"],
	["chapel", "https://video.wixstatic.com/video/bde2cd_fb6fbe2bce7249969ee1ea57b2288668/720p/mp4/file.mp4"],
	["desert", "https://video.wixstatic.com/video/bde2cd_0b465ccc294f4786bd45df5fa6edee4d/720p/mp4/file.mp4"]
];

// WEBCAM VIDEO URLS
var webcamplaylist = [
		["Ms5K", "https://video.wixstatic.com/video/bde2cd_f447f30577a74aba829138597bb3f323/720p/mp4/file.mp4"],
		["Wimpy", "https://video.wixstatic.com/video/bde2cd_7935ef80ed5d44e09380e36140265934/720p/mp4/file.mp4"],
		["Ryan", "https://video.wixstatic.com/video/bde2cd_385539cd85ff4cb0a0eff3967da87bf2/720p/mp4/file.mp4"]
];

// WEBCAM INITS
function initWebcam() {
	var myWebcam = document.getElementsByTagName('video')[1];
	myWebcam.currentTime = 37;
}

// VIDEO TOGGLES
function toggleCamera(n){
	var camera = n;
	console.log("camera " + camera);
	
	var myPlayer = document.getElementsByTagName('video')[0];
	var curtime = myPlayer.currentTime;
	myPlayer.setAttribute("src", videoplaylist[n][1]);
	myPlayer.setAttribute("type", "video/mp4");
	myPlayer.currentTime = curtime;

	if (mainVideoStart){ myPlayer.play();}
	
	var curButton = "#" + event.srcElement.id;
	var curName = "#" + event.srcElement.name;
	var curText = "#" + "cameraText" + event.srcElement.name;

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
    
    if($(curButton).css('display') == 'none'){
        $(curButton).css("background-color", "transparent");
		$(curButton).attr("src", "../img/art/svg/camera_off.svg");
		$(curText).css("color", "#3f3131ff");		
		
    } else {
        $(curButton).css("background-color", "transparent");
		$(curButton).attr("src", "../img/art/svg/camera_on.svg");
		$(curText).css("color", "#866767ff");		
    }
}


// MAIN VIDEO SKIP TO TIMESTAMP
function vidJumpToTime(landTime){
	//var video = document.getElementsByTagName('video')[0];		
	video.currentTime = landTime;
	video.play();
}

	var videoCurVolume = 1.0;
	var videoNewVolume;
	
	var videoCurPlaybackRate;
	var videoNewPlaybackRate;

function freezeVideo(){
	freezeAudio();
}	

function freezeAudio(){	
	videoCurVolume = $('video')[0].volume;
	log("volume " + videoCurVolume);
	$('video').stop(true, false).animate({volume: 0.0}, 3000, freezePicture);	
	log("freezing audio");
}

function freezePicture(){
	videoCurPlaybackRate = $('video')[0].playbackRate;
	log("pbr " + videoCurPlaybackRate)
	$('video').stop(true, false).animate({playbackRate: 0.1}, 3000, video.pause());
}

function unfreezeVideo(){
	unfreezePicture();
}

function unfreezePicture(){
	video.play();
	$('video').stop(true, false).animate({playbackRate: videoCurPlaybackRate}, 3000, unfreezeAudio );
}

function unfreezeAudio(){
	//$('video')[0].volume = videoCurVolume;
	$('video').stop(true, false).animate({volume: 1.0}, 3000);
}



//------------------------------------------------------------------------------
// DEMON - MAIN PROGRAMMING 
//------------------------------------------------------------------------------

//----------------------------------------------------
// DEMON ASPECTS
//----------------------------------------------------

// Traits
	var dIntellect = 5;
	var dMagic = 5;
	var dPower = 5;
	var dPresence = 5;

// Moods	
	var dGlee = 5;
	var dPatience = 3;
	var dCruelty = 5;
	var dAnger = 5;
	var dFear = 5;


//----------------------------------------------------
// DEMON COMMUNICATIONS
//----------------------------------------------------

	var curEventId;
	
	var dSpamming = false;
	var dChatType = "";

	var dChatMood = "";

	var dInitMask = "";
	var dChatMask = "";

	var dSpamBase = 0;
	var dSpamVar = 0;	
	var dSpamSpeed = 0;

	var dMsgCount = 0;
	var dDialogueCount = 0;
	var dDialogueNode = 0;
	var dPrevDialogueNode = 0;	
	var dDialogueStop = 0;
	var dDialogueEnd = false;	

	var c_array = [];
	var c_timer = 0;
	var dChatTimer;
	var dChatTimeout;
	
	var plReply;
	

//--------------------------
// LOAD DEMON CHAT MODULE
//--------------------------

function summon_dChat(array, mem, mood, mask, speed, timeout){
	// the parent event's unique id string
	curEventId = timedEvents[0][2];
	
	// set the input target to the demon 
	chatTarget = "demon";
	// ...and nullify current player chat replies
	plReply = null;

	// (dev mode) show the event name 
	//document.getElementById("chapter").innerHTML = array.name;
	
	// find the conversation array by its 'name' property 
	c_array = array;
	
	// Set the type of chat 
	dChatType = c_array.type;

	//Set the mood	
	dChatMood = mood;
	
	//Set the style mask
	dInitMask = mask;
	dChatMask = mask;
	
	// Set the initial bubble scale
	dMsgScale = 1.0;
	
	// Set the initial speed of demon's responses
	dSpamBase = speed;
	dSpamSpeed = dSpamBase + dSpamVar;
	
	//Init dialogue vars and node
	dMsgCount = 0;
	dDialogueCount = 1;
	dDialogueNode = 0;
	dPrevDialogueNode = 0;
	dDialogueEnd = false;
	dDialogueStop = c_array[dDialogueNode].length - 1;

	// Is the demon listening for replies yet?
	dListen = false;

	//Set wait-time according to demon's patience stat		
	dTaunt = false;
	dWaitTimeout = dPatience * 1000;
	
	spamming = false;
	$("#chattext").css("overflow", "hidden");
	
	// Start the conversation
	dSpamming = true;
	dKeepSpamming();
	
	// Set initial length of chat clock
	dChatTimeout = timeout;
	var c_timer = new Timer();
	c_timer.start(dChatTimeout).on('end', function () {
	  banish_dChat();
	});	
	
	dChatTimeLeft = c_timer.getDuration();
	var dChatTimer = setInterval(function() {
		if (dChatTimeLeft > 0){
			dChatTimeLeft = c_timer.getDuration();
			//document.getElementById("chapter-time").innerHTML = Math.round(dChatTimeLeft/1000);
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
// Listening For Response
//--------------------------

	var dChatTimeLeft;
	var dListen = true;

	var dWaitTimeout;
	var dWaitTimer;
	
	var dTaunt = false;

	var waitInterval = null;
	
	var dSpamTimeout;
	var dSpamTimer;

function dWaitsForResponse(){	
	plReply = null;
	
	//$('#textfield').prop("disabled", false);
	//$('#textfield').focus();
	
	if (!dListen){
		console.log("demon stopped listening." + dChatType);
		return;
	}
	
	console.log("demon is listening for " + dQuestionType);

	dWaitTimeout = dPatience * 1000;

	if (waitInterval == null){
		waitInterval = setInterval(function()
		{
			if (dSpamming){
				if (plReply !== null) {
					dListen = false;
					dTaunt = false;
					console.log("player responded");
					dWriteMore();			
				} else {
					dWaitTimeout = dWaitTimeout - 1000;
					if (dWaitTimeout == 0){
						dWriteMore();
						clearInterval(waitInterval);
						waitInterval = null;
						dWaitsForResponse()						
					}			
				}
			}
			document.getElementById("debug").innerHTML = Math.round(dWaitTimeout/1000);
		}
		, 1000);
	}
}



//--------------------------
// Chat Functions
//--------------------------


function dForceSpam(){
	if (dDialogueCount == dDialogueStop ){
		dTaunt = false;
		clearInterval(waitInterval);
		waitInterval = null;
		dSpamSpeed = 0.25; 			
		dWriteMore();
		log("parsing reply " + dSpamming);
	}
}


// RECURSIVE FUNCTION THAT WRITES A MESSAGE PERIODICALLY
function dKeepSpamming(){
    if(dSpamming){
		// goes above dSpamming?
		if (dChatType == "conversation"){			
			if (dDialogueCount < dDialogueStop){
				dSpamSpeed = dSpamBase + dSpamVar;			
				dDialogueEnd = false;
				writeDarkMessage();
				dDialogueCount++;
				// wonky
				if (dDialogueCount == dDialogueStop){					
					if (!dDialogueEnd){
						dDialogueEnd = true;
						clearInterval(waitInterval);
						dKeepSpamming();
						log("keep spamming");
					}		
				} else {				
					dSpamTimer = new Timer();
					dSpamTimer.start(dSpamSpeed).on('end', function () {
						clearInterval(waitInterval);
						waitInterval = null;
						dKeepSpamming();
					});				
				}
			} else {			
				if (dListen){
					dTaunt = false;
					clearInterval(waitInterval);
					waitInterval = null;
					dWaitsForResponse();
				} else {
					console.log("not listening");
					var dExitNode = c_array[dDialogueNode].length-1;
					var dExitFunc = c_array[dDialogueNode][dExitNode];
					console.log("# of exit dunctions = " + dExitFunc.length);
					if (dExitFunc[0].length == 0){
						for (i=0; i< dExitFunc.length; i++){
							dExitFunc[i]();
						}
					} else {
						log("no exit function exists");
						dListen = true;
						dTaunt = false;
						dWaitsForResponse();						
					}
				}
			}
		}
		if (dChatType=="random"){
			writeDarkMessage();
			//setTimeout(function() {dKeepSpamming(); }, Math.floor(Math.random() * spamSpeed));
			setTimeout(function() {dKeepSpamming(); }, dSpamSpeed);
		}
    }
}


function stopInterval(i) { 
   clearInterval(i);
   log(i + " was cleared"); 
} 


	var dRepeatQuestion = true;

function dWriteMore(){
	if (plReply!==null){;
		clearInterval(waitInterval);
		dParseReply();
		log("parse reply triggered");
	} else {
		dRepeatQuestion = !dRepeatQuestion
		dTaunt = true;
		writeDarkMessage();
		//dWaitsForResponse();
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
	var keystrings = [];
	var keyactions = [];	
	var triggerWords = [];
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
	// detect question type
	dQuestionNode = c_array[dDialogueNode][0];
	dQuestionType = c_array[dDialogueNode][0][0];
	dContextStr = c_array[dDialogueNode][0][1];
	dMinusContext = c_array[dDialogueNode][0][2];	
	dVerbose = c_array[dDialogueNode][0][3];	
	// detect answer types
	dAnswerNode = c_array[dDialogueNode].length-1;
	dKeyNode = c_array[dDialogueNode][dAnswerNode];
}


function dGetWiki(wiki)
{		
	keywords = [];
	keyactions = [];
	
	for (var i = 0; i < dKeyNode.length; i++){
		keywords.push(dKeyNode[i][0]);
		keyactions.push(dKeyNode[i][1]);
		log(dKeyNode[i][1]);
	}	
	
	findWiki(wiki);
}


function dStrToArray(str)
{
	
	keywords = [];
	keystrings = [];
	keyactions = [];

	dAnswerNode = c_array[dDialogueNode].length-1;
	dKeyNode = c_array[dDialogueNode][dAnswerNode];
	
	for (var i = 0; i < dKeyNode.length; i++){
		keywords.push(dKeyNode[i][0]);
		keystrings.push(dKeyNode[i][1]);
		keyactions.push(dKeyNode[i][2]);
		//log(keystrings[i])
	}
	
	// replace similars with keywords
	var newStr = str;
	newStr = newStr.replace(/[.*+\-!^${}()|[\]\\]/gi, "");
	newStr = newStr.replace(/\?/gi, " ? ");
	newStr = newStr.replace(/'/gi, "");
	// newStr = newStr.replace(/\by\b|yes|yeah|okay|ok|yup|yep|agree|affirmative|always/gi, "ACCEPT");
	// newStr = newStr.replace(/\bn\b|noop|nope|no|nay|nah|naw|negative|disagree|never/gi, "DECLINE");
	// newStr = newStr.replace(/maybe|dont know|not sure|depends/gi, "MAYBE");	
	for (var i = 0; i < dKeyNode.length; i++){
		for (var n = 0; n < keystrings[i].length; n++){
			newStr = newStr.replace(new RegExp(keystrings[i][n], 'gi'), keywords[i]);
			log(newStr);
		}
	}

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
	// validate english
	findWord(word);
	
	//check for relevance
	const result = keywords.includes(word);

	if (result){
		pos = keywords.indexOf(word);
		triggerWords.push(word);
		log("triggerWords: " + triggerWords);
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
			log("keyaction" + i + ": " + keyactions[pos][i]);
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
		dDialogueCount = 1;
	} else {
		dDialogueCount = dDialogueStop;
	}
	dSenseNode();
	dSpamming = true;
	dDialogueEnd = false; //??
	
	dSpamTimer.stop();
	dSpamTimer = new Timer();
	dSpamTimer.start(dSpamSpeed).on('end', function () {	
		dKeepSpamming();
	});
}


function titleCase(str)
{
  return str.toLowerCase().split(' ').map(function(w) {
    return (w.charAt(0).toUpperCase() + w.slice(1));
  }).join(' ');
}




//----------------------------------------------------
// ASSEMBLE RESPONSE BASED ON WIKIDATA CONTEXT
//----------------------------------------------------

	var wikiImgLoader;
	var wikiSubjCat;
	var subjProunoun;
	var subjProunounObj;
	var subjProunounPos;
	var wikiDialogueNode;
	
	var dContextStr = "";
	var dMinusContext = "";
	var dVerbose = false;


async function dComposeWiki(wikiText, wikiTitle, wikiImg, wikiData)
{
// Property Mods
	// the title is default subject
	wikiSubjCat = wikiTitle;
	wikiSubjCat = wikiSubjCat.toLowerCase();
	
// Sex
	subjProunoun = "it";
	subjProunounObj = "that";
	subjProunounPos = "its";
	if (wikiSex !== ""){
		if (wikiSex == "male"){subjProunoun = "he"; subjProunounObj = "him"; subjProunounPos = "his"}
		if (wikiSex == "female"){subjProunoun = "she"; subjProunounObj = "her"; subjProunounPos = "her"}
		//log("sex:" + wikiSex + " " + subjProunoun + "/" + subjProunounObj + "/" + subjProunounPos);		
	}
	
// Instance
	if (wikiInstOf !== ""){
		wikiInstOf = wikiInstOf.toLowerCase();
		wikiSubjCat = wikiInstOf;
		log("type of: " + wikiInstOf);
	}
	
	if (wikiSubclassOf !== ""){
		wikiSubclassOf = wikiSubclassOf.toLowerCase();
		wikiSubjCat = wikiSubclassOf;
		log("subclass of: " + wikiSubclassOf);		
	}		
	
// Job
	if (wikiJob !== ""){
		wikiJob = wikiJob.toLowerCase();
		wikiSubjCat = wikiJob;
		log("job: " + wikiJob);
	}

// Nicknames
	if (wikiNickname !== ""){
		//wikiNickname = wikiNickname.toLowerCase();
		wikiSubjCat = wikiNickname;
		log("nickname: " + wikiNickname);
	}

// Genre
	if (wikiGenre !== ""){
		wikiGenre = wikiGenre.toLowerCase();
		wikiSubjCat = wikiGenre;
		log("genre: " + wikiGenre);
	}
	
// Color
	if (wikiColor !== ""){
		log(wikiColor);
		if (dContextStr == "color"){
			ds_fave_color = wikiColor;
		}
	}

// Global Replacements 	
	await globalWikiReplace();
	wikiText = wikiChange;
	log("returned from replace");
	var abbrevWiki = wikiChange.replace(/[A-Z]+\./gm, function(match) {
	 return match.split(".").join("");
	});		
	wikiText = abbrevWiki;
	
// Build initial response nodes
	wikiText = wikiText.split(".")
	wikiDialogueNode = [];
	for (i=0; i < wikiText.length; i++){ 
		wikiDialogueNode[i] = [wikiText[i] + "."];
	}
	
// Replace subject in first sentence
	var wikiFirstSentence = wikiDialogueNode[0][0].split(" ");
	var wikiWas = wikiFirstSentence.indexOf("was"); 
	var wikiIs = wikiFirstSentence.indexOf("is");
	var wikiWasIs = false;
	if (wikiWas !== -1){
		wikiFirstSentence.splice(0, wikiWas, subjProunoun);
		wikiWasIs = true;
	}
	if (wikiIs !== -1){
		if (!wikiWasIs){
			wikiFirstSentence.splice(0, wikiIs, subjProunoun);
		}
	}
	wikiDialogueNode[0][0] = wikiFirstSentence.join(" ");	
	
// Insert intro sentence
	var wikiIntro = ["yeah i know all abowt " + subjProunounObj];
	wikiDialogueNode.splice(0,0,wikiIntro);
	
// Reduce article size
	wikiDialogueNode.splice(3);
	
// Insert question node at beginning
	wikiDialogueNode.splice(0,0,dQuestionNode);

// Asynchrounous image post-processing
	if (wikiImg !== ""){
		await resizeWikiImg(wikiImg, wikiData);
		log("returned from resize with " + thumbPath );			
		wikiImg = thumbPath;
		wikiImgLoader = [subjProunoun +" kinda looks like this<br/><img width='100%' onload='scrollToBottom()' src='" + wikiImg + "' />"];			
		wikiDialogueNode.push(wikiImgLoader);
	} else {
		log("no image");
	}

// Reduce length if non-verbose
	if (!dVerbose){
		var wikiDialogueEnd = wikiDialogueNode.length - 1;
		wikiDialogueNode.splice(1,wikiDialogueEnd);
	}

// Solve for question-type and topic-context
	if (dQuestionType !== "wikiSearch"){
	// Reduce length if not a wiki question
		//wikiDialogueNode.splice(2,1);
		// Add plural
/* 		if (wikiSubjCat == wikiGenre){
			var subPlural = "";
		} else {
			var subPlural = "s";
		}
		var subPlural = "s"; */
		log(wikiSubjCat + " / " + dContextStr);
		if (wikiSubjCat !== dContextStr){
			wikiDialogueNode.push(["but we aint talking about " + wikiSubjCat + " rite now"]);
			if (dContextStr !== ""){
				wikiDialogueNode.push(["i asxed u a qwestion abowt " + dContextStr]);
			}
		} else {
			wikiDialogueNode.push(["ur gonna have to be more spessific. or maybe less spessific _smirk"]);
		}
		wikiDialogueNode.push([ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]);	
	} else {
	// Score context
		// If no article was found
		if (wikiText == ""){
			pos = 1; //BADSEARCH
		} else {
			// search for instance match
			wikiInstStr = wikiInstsOf.join();
			if (wikiInstStr.includes("single")){
				wikiInstStr = wikiInstStr + "song";
			}
			// search for genre match
			wikiGenreStr = wikiGenres.join();
			if (wikiGenreStr.includes("music")){
				wikiGenreStr = wikiGenreStr + "song";
			}
			if ( wikiInstStr.includes(dContextStr) || wikiGenreStr.includes(dContextStr) ) {
				pos = 0; //GOODSEARCH
			} else {
				pos = 2; //WRONGTOPIC
				if (wikiSubjCat == wikiGenre){
					var subPlural = "";
				} else {
					var subPlural = "s";
				}
				var subPlural = "s";
				if ( (wikiSubjCat !== dContextStr) && ( (wikiSubjCat + subPlural) !== dContextStr) && ( wikiSubjCat !== (dContextStr + subPlural)) ){				
					wikiDialogueNode.push(["but we aint talking about " + wikiSubjCat + subPlural + " rite now"]);				
					wikiDialogueNode.push(["i asxed u a qwestion abowt " + dContextStr + subPlural]);
				} else {
					wikiDialogueNode.push(["ur gonna have to be more spessific"]); 
					wikiDialogueNode.push(["or maybe less spessific _smirk"]);
				}
				// Return to last node
				wikiDialogueNode.push([ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]);
			}
		}
		// Load key actions
		for (i=0; i < keyactions[pos].length; i++){					
			wikiDialogueNode.push([ keyactions[pos][i] ]);
		}
	}

	// Solve for broad context
	if ( (wikiInstOf == "wikimedia disambiguation page") || (wikiInstOf == "wikimedia list article") ){
		wikiDialogueNode = [];
		wikiDialogueNode.push(["", ""]);
		var modWikiTitle = wikiTitle.replace(/list of/gi, "");
		wikiDialogueNode.push(["ur gonna have 2 b more spessific. i know lotsa stuff about " + modWikiTitle.toLowerCase()] );
		wikiDialogueNode.push([ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]);
	}
	
	// Save article to dialogue node
	//wikiDialogueNode = wikiText;
	c_array[c_array.length-1] = wikiDialogueNode;	
	
	// Save success/failure reference
	wikiText = wikiDialogueNode[0][0];
	
	log(wikiInstOf);
	log(wikiImg);
	log(wikiSex);
	log(wikiJob);
	log(wikiGenre);
	
	dJumpToDialogueNode(c_array.length-1,false,true);
}



// print an article
function dWriteDarkWiki(wikiText, wikiTitle){	
	var was_taunting = false;
	if (dTaunt) {dTaunt = false; was_taunting = true}
		if (dQuestionType !== "wikiSearch"){
			var element = $("#chattext");
			element.append(getDarkWiki(wikiText, wikiTitle));
			cutTopOfChat();
			scrollToBottom();
			dListen = true;
			dWaitsForResponse();
			dKeepSpamming();
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


function getDarkWiki(wikiText, wikiTitle){
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
		msgBody = wikiText;
	}
	
	message.append(msgBody);
	
	dMsgCount++;
	
	return message;
}




var dToggleWait = true;

//writes a random message in the chat
function writeDarkMessage()
{
    var element = $("#chattext");
	element.append(getDarkMessage());
	elements = document.querySelectorAll('#chatbubble.darkbubble, #chatbubble.imgbubble');
	if (elements[dMsgCount] == ""){
		elements[dMsgCount].remove();
	}
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

	var msgBody = "";
	
	if(dChatType=="rant"){
		msgBody = c_array[dDialogueNode][dMsgCount];
	}
	if(dChatType=="conversation"){
		if (c_array[dDialogueNode][dDialogueCount].length == 1){
			msgBody = c_array[dDialogueNode][dDialogueCount][0];
		} else {
			if (!dTaunt){	
				msgBody = c_array[dDialogueNode][dDialogueCount][0];
				// execute cued dialogue functions 
				if ( c_array[dDialogueNode][dDialogueCount].length > 1){
					for (i = 1; i < c_array[dDialogueNode][dDialogueCount].length; i++){
						c_array[dDialogueNode][dDialogueCount][i]();
					}
				}
			}
		}
	}
    if (dTaunt){
		msgBody = (dTaunts[Math.floor(Math.random()*dTaunts.length)][0]);
		if (dRepeatQuestion){
			var curQuestion = dDialogueCount-1;
			msgBody = c_array[dDialogueNode][curQuestion][0];
		}
	}
	
    if (dChatType=="random"){
		msgBody = (dRandoms[Math.floor(Math.random()*dRandoms.length)]);
		//loadRandomImg(message);		
	}	
	
    msgBody = replaceEmotes(msgBody);
    msgBody = replaceEmoticons(msgBody);
    msgBody = replacePics(msgBody);
	
	if (imgMsg){
		message.attr("class", "fly-in-element darkbubble imgbubble");
		message.css("padding", "0vw");	
	}

	if (msgBody !== ""){
		message.append(msgBody);
		dMsgCount++;
		return message;		
	} else {
		log("empty message");
		message = msgBody;
		return message;	
	}
}



function dReMask(mask){
	dChatMask = mask;
	log ("mask changed");
}



function dApplyMsgTransforms(message){
	// Dishevel the x position of bubble
	dMsgRandomX = Math.floor(Math.random()*3.5);
	dMsgAdjX = dMsgOriginX - dMsgRandomX;
	
	if (dChatMask !== null){
		message.attr("class", "fly-in-element darkbubble " + dChatMask);
	} else {
		message.attr("class", "fly-in-element darkbubble");
	}

	// "white" breaks the color.
	// rem: solve against white and black
	if (ds_fave_color !== ""){
		var modColor = tinycolor("#" + ds_fave_color).darken(10).toRgb();
		modColor.a = 0.75;
		newColor = tinycolor(modColor).toRgbString();
		log(newColor);
		message.css("background", newColor);
	}
	
	if (dTaunt){	
		//random font
		var fontType = ["Crafty Girls", "Henny Penny", "Gloria Hallelujah", "Eater", "Lacquer", "Homemade Apple"];
		var num;
		num=Math.floor(Math.random()*fontType.length);
/* 		message.css("font-family", fontType[num]);
		if (dRepeatQuestion){
			var fontType = "Courier Prime";
			message.css("font-family", fontType);		
		} */		
		
		//increased size
		if (dMsgScale < 2.0) {
			dMsgScale = dMsgScale + 0.1;
			dMsgAdjX = dMsgAdjX - (dMsgScale*1.5);
		} else {
			message.attr("class", "fly-in-element darkbubble");
			dMsgAdjX = dMsgAdjX - (dMsgScale*1.5);
		}
			
		message.css("font-size", dMsgScale +"vw");
		message.css("line-height", (dMsgScale*1.5) + "vw");
		message.css("padding", (dMsgScale*1.5) + "vw");			
		message.css("width", dMsgBaseWidth + (dMsgScale*1.5) + "vw");
	}
	
	message.css("margin-left", dMsgAdjX + "vw");
}




//--------------------------
// Exit Demon Chat 
//--------------------------

function banish_dChat(){
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
		delayedErase(i,element);
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
}


    // var element = $("#chattext");
	// chattext.scrollTop = chattext.scrollHeight;
    // if(element.children().length > 100){
        // var chatMessages = element.children();
		// chatMessages[0].remove();
    // }

function hide_dChat(){
	dSpamming = false;
	dTaunt = false;
	dListen = false;
	clearInterval(waitInterval);
	//clearInterval(dChatTimer);		

	var element = $("#chattext");
	var el_length = element.children().length;
	elements = document.querySelectorAll('#chatbubble');
	
	for (i=0; i<el_length; i++){	
		var element = elements[i];
		//element.classList.add('.disintegration-target');
		element.classList.add('scalingbubble');
		delayedHide(i,element);
		scrollToBottom();
	}
}


// Disintegrator
function dDisint($elm){
	if ($elm.disintegrated) {return;}
    $elm.disintegrated = true;
    disintegrate($elm);
}

// Disintegrate delayed list
// function delayedDisint(i, el){
	// var wait = i * 0.1;	
	// var tl = new TimelineMax();
	// tl.to(el, 1, {
		  // force3D:true,
		  // delay:wait,
		  // onComplete:dDisint,
		  // onCompleteParams:[el],
		  // css: { 
		  // }
	// });
// }

function delayedHide(i, el){
	var wait = i * 0.1;	
	var tl = new TimelineMax();
	tl.to(el, 1, {
		  force3D:true,
		  delay:wait,
		  onComplete:hideDemonMsg,
		  onCompleteParams:[el,i],
		  css: { 
			width: 0.0,
			height: 0.0,
			fontSize: 0.0,
			padding: 0.0,
			alpha: 0.0,
			transformOrigin:"top right",
		  }
	});
}

function hideDemonMsg (el,i){	
	el.remove();
	if (i === (dMsgCount)){
		dSpamming = true;
		dMsgCount = 0;
	}		
}


// erase all demon messages 
function delayedErase(i, el){
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
			marginLeft: 100.0,
			fontSize: 0.0,
			padding: 0.0,
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
	spamming = true;
	keepSpamming();
}







//--------------------------
// Chat Generic Array Objects
//--------------------------


var dRandoms = ["i can see you", "i can hear you breathing", "im right over here ------>", "do you wanna meet me?", "do you wanna see my face?", "everbody hates you", "i can smell you", "i cant taste you", "chosen 4 whut?", "la diablo estas vivanta ene de mia korpo", "mi sangas pro la vundoj de inferaj trancxoj", "mi glutos vian animon","ni vekigu la lordon de la abismo", "im coming for you", "7:31", "mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon", "naw im just fukkin around with you chosen one", "we breathe chocolate over here", "guess what's for dinner?", "i want to show you something", "these people are already dead. their blood is on your hands", "did you ever think about ending things?","i know things", "i know your secret","i can do things","do you wanna see whut i can do","_eye1","_eye2","_eye3","_eye4","_burn_girl","_face1","_face2","_face3","_face4","_face5","_face6","_face7","_face8","_face9"];

var dTaunts = [["answer the question, claire!"], ["just answer the question"], ["times a wastin", "answer me"], ["speak up"], ["_just_answer"], ["_still_waiting"], ["_answer_me"], ["_answer_the_question"], ["_use_your_voice"], ["_finding_his_voice"], ["_anyone_there"], ["answer"], ["say something"], ["speak"],["use ur words"], ["i need answers"], ["..."]];

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

//summon_Layer(layernum, layertype, bckcolor, bckimg, repeat, speedin, speedout, alpha, timeout, imgW, imgH, imgX, imgY)

function summon_Layer(layernum, layertype, bckcolor, bckimg, repeat, speedin, speedout, alpha, timeout, imgW, imgH, imgX, imgY){	
	var targetLayer = $("#overlay"+layernum);
	
	targetLayer.attr("class", layertype);
	targetLayer.css("background-color", bckcolor);
	targetLayer.css("background-repeat", repeat);
	if (bckimg != null){
		targetLayer.css("background-image", "url('"+ bckimg +"')");
		targetLayer.css("background-size", imgW + " " + imgH);
		targetLayer.css("background-position", imgX + " " + imgY);		
	}
	targetLayer.css("z-index", "4");
	
	targetLayer.fadeTo( speedin, alpha, function(){
	});
	
	clearTimeout(d_timer[layernum]);
	d_timer[layernum] =  window.setTimeout(function(){banish_Layer(layernum, speedout)}, timeout);
}

function banish_Layer(layernum, speedout){
	$("#overlay"+layernum).fadeTo( speedout, 0.0, function(){
		$("#overlay"+layernum).css("z-index", "-1");
	});
}

function banish_allLayers(speedout)
{
	banish_Layer(0, speedout);
	banish_Layer(1, speedout);
	banish_Layer(2, speedout);
	banish_Layer(3, speedout);
}


//--------------------------
// Demon Images
//--------------------------

/* var i_timer = 5000;

function summon_Image(imgNum, imgSrc, imgClass, imgH, imgW, imgX, imgY, speedin, speedout, alpha, timeout){	
	var targetLayer = $("#images");
	targetLayer.css("z-index", "4");
	
	if (imgSrc != null){
		targetLayer.append(
		"<img src='"+ imgSrc 
		+ "' class='image" + imgNum + " " + imgClass
		+ "' position='absolute' " 
		+ "' top='" + imgY 		
		+ "' left='" + imgX 
		+ "' height='" + imgH 
		+ "' width='" + imgW 
		+ "'>");
	}
	
	var targetImage = $("#image"+imgNum);
	
	targetLayer.fadeTo( speedin, alpha, function(){
	});
	
	clearTimeout(i_timer[imgNum]);
	i_timer[imgNum] =  window.setTimeout(function(){banish_Image(imgNum, speedout)}, timeout);
}

function banish_Image(imgNum, speedout){
	$("#image"+imgNum).fadeTo( speedout, 0.0, function(){
		$("#image"+imgNum).css("z-index", "-1");
	});
}

function banish_allImages(speedout)
{
	$("#images").empty();
} */


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
	music.src = snd;	
	music.play();
	audioFadeIn(music_player, speedin, vol);
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






//----------------------------------------------------
// AUTOCHAT MODULE
//----------------------------------------------------

	var spamming = false;
	var spamType = "positive";
	var spamSpeed = 2400;
	var darkMode = false;


var usernamePrefixes = ["scary", "spooky", "sick", "insane", "cool", "revenge_of_", "mad", "generic", "Cpt", "nice", "xxx", "Dan", "VAC", "SWE", "Wizard", "faceless", "olof","best_", "daddy", "boo", "mister_", "davai", "Nick", "da_", "the_", "iAm", "Loungin", "extra", "BOT", "dirty", "shoutout_to_", "devil", "Only"];

var usernameSuffixes = ["Kappa", "Sniper", "maniac", "shipwreck", "M", "LULZ", "Games", "Radley101", "lolo", "_yolo", "QQ", "stone", "Trumpster", "xD", "meister", "eric", "jenna", "loser", "haha", "noob", "dude", "Bro", "shotgun", "DADDY", "OneTaps", "winner", "jarod", "pepe", "explosion", "easy", "Nut", "000", "Biceps", "gamer", "Majestic", "zzzzz", "vortex", "sound", "tv"];

var usernameColors = ["red", "green", "#40b7b5", "blue", "purple", "#aa9929"];

var positiveMessages = ["_heart_full_heart_full_heart_full_heart_full_heart_full", "<div class='bigchat'>HEY YOOOO GUYZ!</div>", "best eppie evah", "LIZZY LUV", "I can't feel my lungs", "_point_left feels all the feels", "gettin goosebumps now _ghost", "WTF", "LUL", "holy shit", "SAVED _smile_big", "ez", "GG", "_smile_big", "<div class='bigchat'>LOVE THIS SHOW!!!</div>", "WHAT", "Smash LIKE BUTTON, Peasants!", "_smile_big_smile_big_smile_big_smile_big_smile_big", "anyone like pasta?", "awesome clawsome", "Freddy has powerful swim swims", "Mark is my spirit animal", "KAT GREED", "The enemy of my enemy is my Freddy", "The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top", "_smile_big _smile_big _smile_big _heart_full _heart_full _heart_full","_thumbs_up","_smile_big_smile_big_smile_big_smile_big_smile_big",];

var negativeMessages = ["BOT", "WTF LMAO", "Stop moving your head! gettin dizzy", "dizzy", "_frown_face VOLUME UP, PREEZ!", "NA CS", "LOL this ridic", "WTF", "LUL", "HAHAHAHA", "OMG", "LMAO_rofl_face_rofl_face_rofl_face", "so bad omg _frown_face", "xD", "FAKE _thumbs_down", "fakey-fake _eyeroll_face", "fake as fxxk", "FAKE FAKE FAKE", "WutFace", "NotLikeThis", "4Head", "KAT GREED", "salty peanuts yum yum", "Lizzy already won this debate, move along", "PALPATINE'S BEHIND IT ALL!!!","_frown_face","_thumbs_down_thumbs_down_thumbs_down_thumbs_down"];

var scaredMessages = ["OMG WTF is was that?", "GET OUTTA THERE!", "_skull_face", "Run, Forrest, Run!", "dizzy", "Noooooooo", "OMFG", "just crapped my pantaloons", "WTF", "this is my worst nightmare", "OMG run", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "can't take this", "please jesus god no more jump scares", "_ghost_frown_face", "NotLikeThis", "...", "<=== IS SCARED _grimace_face", "heart palpittashuns","_ghost_ghost_ghost_ghost_ghost_ghost_ghost","_scared_sweat_scared_sweat_scared_sweat_scared_sweat_scared_sweat_scared_sweat_scared_sweat_scared_sweat_scared_sweat","_scared_sweat","_scared_sweat","_scared_sweat"];

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

var emoticons = [
    ["_smile_normal", "&#128578;"],
    ["_smile_big", "&#128512;"],
	["_frown_face","&#128577;"],
    ["_sad_cry", "&#128532;"],
    ["_love_face", "&#128525;"],
    ["_heart_black", "&#10084;"],
	["_heart_full", "&#129505;"],
    ["_smile_evil", "&#128520;"],
    ["_poop", "&#128169;"],
    ["_x_mark", "&#10060;"],
    ["_check_mark", "&#10004;"],
    ["_tears_joy", "&#128514;"],
    ["_wink_face", "&#128521;"],
    ["_yum_face", "&#128523;"],
    ["_cool", "&#128526;"],
    ["_kiss_face", "&#128536;"],
    ["_eyeroll_face", "&#128580;"],
    ["_tears_sad_face", "&#128549;"],
    ["_tears_big_face", "&#128557;"],
    ["_oh_no_face", "&#128551;"],
    ["_grimace_face", "&#128556;"],
    ["_smile_catface", "&#128570;"],
    ["_love_catface", "&#128571;"],
    ["_trophy", "&#127942;"],
    ["_medal", "&#129351;"],	
    ["_skull_face", "&#128128;"],
    ["_ghost", "&#128123;"],
    ["_meat", "&#129385;"],
    ["_thumbs_up", "&#128077;"],
    ["_thumbs_down", "&#128078;"],
    ["_middle_finger", "&#128405;"],
    ["_danger", "&#9888;"],
    ["_strong", "&#128170;"],
    ["_smirk", "&#128527;"],
    ["_sad_beg", "&#129402;"],
    ["_perservere", "&#128547;"],
    ["_point_left", "&#128072;"],
    ["_point_right", "&#128073;"],
    ["_okay", "&#128076;"],
    ["_angry_evil", "&#128127;"],
    ["_heart_broken", "&#128148;"],
    ["_fire", "&#128293;"],
    ["_clock", "&#128338;"],
    ["_lol_face", "&#128518;"],
    ["_confused_face", "&#128533;"],
    ["_tongue_normal", "&#128539;"],
    ["_tongue_winking", "&#128540;"],
    ["_tongue_laugh", "&#128541;"],
    ["_scared_sweat", "&#128552;"],
    ["_scared_scream", "&#128561;"],
    ["_scared_shocked", "&#128562;"],
    ["_dizzy_face", "&#128565;"],
    ["_mute_face", "&#128566;"],
    ["_smile_flipped", "&#128579;"],
    ["_hand_pray", "&#;"],
    ["_greed_face", "&#129297;"],
    ["_hand_horns", "&#129304;"],
    ["_fingers_crossed", "&#129310;"],
    ["_sick_face", "&#129314;"],
    ["_rofl_face", "&#129315;"],
    ["_crazy_face", "&#129322;"],
    ["_angry_curse", "&#29324;"],
    ["_puke_face", "&#129326;"],
    ["_brain", "&#129504;"],
    ["_angel_face", "&#128519;"],
    ["_pout_face", "&#128545;"],
    ["_angry_face", "&#128544;"]
];


//WRITES A RANDOM MESSAGE IN THE CHAT
function writeMessage() {
    var element = $("#chattext");
	element.append(getMessage());
	cutTopOfChat();
    scrollToBottom();
}

//RETURNS A RANDOM MESSAGE
function getMessage() {	
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
		//msgBody = (positiveMessages[positiveMessages.length-1]);
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
    msgBody = replaceEmoticons(msgBody);	
    msgBody = replacePics(msgBody);
	
    message.append(msgBody);
	
    return message;
}

// REPLACE TEXT WITH EMOTE IMG
function replaceEmotes(message)
{	
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='../img/emotes/"+emotes[i][1]+"' class='emoticon' alt='"+emotes[i][0]+"' vertical-align='bottom'>");
    } 
    return message;
}

// REPLACE TEXT WITH TEXT EMOTES 
function replaceEmoticons(message){	
    for(var i=0;i<emoticons.length;i++){
        message = message.replace(new RegExp(emoticons[i][0], 'g'), emoticons[i][1]);
    } 
    return message;
}

// LOAD IMAGE INTO MESSAGE
	var imgMsg = false;

function replacePics(message){	
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


// RETURNS A RANDOM USERNAME
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

// RETURNS A RANDOM USERNAME COLOR
function getUsernameColor()
{
    return usernameColors[Math.floor(Math.random()*usernameColors.length)];
}


// CUTS TOP ELEMENT OF LONG CHAT
function cutTopOfChat(){
    var element = $("#chattext");
	chattext.scrollTop = chattext.scrollHeight;
    if(element.children().length > 100){
        var chatMessages = element.children();
		chatMessages[0].remove();
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


//----------------------------------------------------
// CHAT SCROLLING FUNCTIONS 
//----------------------------------------------------

	var scrollDir = "down";

//scrolls to the bottom of the chat
function scrollToBottom(){
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;
	//cleanUpScroll();
}

function scrollToTop(){
	var chattext = document.getElementById("chattext");
	chattext.scrollTop = 0;
}


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




//writes the text of the input field into the chat with a declared username
function chat()
{    
    var textfield = $("#textfield");
    var element = $("#chattext");
    
    if(textfield.val()!=""){
        var message = $('<div id="chatbubble" name="bubble"></div>');	
        message.attr("class", "chatMessage playerbubble fade-in-element");		
        message.append(getPlayerName());
        message.append(" ");

        var msgBody = textfield.val();
        //msgBody = replaceEmotes(msgBody);
		msgBody = replaceEmoticons(msgBody);		
		var msgBodyDiv = $('<div class="playertext">' + msgBody +'</div>');
		message.append(msgBodyDiv);
   
        textfield.val("");
    
        element.append(message);
		plReply = msgBody;
		if (chatTarget == "demon"){
			dForceSpam();
			//dKeepSpamming();
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

// RETURNS A SET PLAYER NAME
function getPlayerName(){
	var playername = $('<div text-align = "center"></div>');
	playername.attr("class", "playername");
	playername.append("&#9733;&nbsp;The Chosen One");
	playername.append("<br>");	
	return playername;
}