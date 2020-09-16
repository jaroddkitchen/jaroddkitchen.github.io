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


document.addEventListener("fullscreenchange", function() {
  console.log("fullscreenchange event fired!");
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


// Global Timer Object

var minutes = 0;
var seconds = 0;

setInterval(function() {
    var video = videojs('main-video');
    var curTime = video.currentTime();
    minutes = Math.floor(curTime  / 60);   
    seconds = Math.floor(curTime - minutes * 60)
    var x = minutes < 10 ? "0" + minutes : minutes;
    var y = seconds < 10 ? "0" + seconds : seconds;

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



var timedEvents = [
	[true, 1,	0, [function(){call_Darkness(5000)}, function(){tentacleManifest(5000)}] ],
	[true, 10,	0, [function(){call_Darkness(10000)}, function(){demonMode(10000)}] ],
	[true, 25,	0, [function(){call_Darkness(12000)}, function(){demonMode(10000)}, function(){tentacleManifest(7000)}] ],	
];

var pastEvents = [];




//--------------------------
// Demon functions
//--------------------------

function log_dark(num){
	console.log("empty function " + num);
}


function call_Darkness(n){
	var timeout = n; 
	console.log("darkness called for " + n + " milliseconds");
}


function demonMode(timeout)
{ 	
    var chat = $("#chat");
    if(darkMode)
    {
        darkMode = false;
		$("#darkModeButton").css("background-color", "#FFFFFF");
		$("#darkModeButton").css("color", "#000000");
		demonExits();
    }
    else
    {
        darkMode = true;
		$("#darkModeButton").css("background-color", "#000000");
		$("#darkModeButton").css("color", "#FFFFFF");
		demonIsSummoned(timeout);
	}
	console.log("demon mode=" + darkMode);
}


var t_timer = 1000;

function tentacleManifest(timeout){
	if (!tentacleInit)
	{
		initTentacle();
	}
	tentacleIsActive = true;
	console.log("tentacle has arrived");
	
	clearTimeout(t_timer);
	t_timer =  window.setTimeout(tentacleExit, timeout);	
}

function tentacleExit(){
	tentacleIsActive = false;	
}



///var overlays = 3; 
var d_timer = 5000;

function demonIsSummoned(timeout){	

	//var video = document.getElementsByTagName('video')[0];
	//var webcamvideo = document.getElementsByTagName('video')[1];

	$("#cameraiconbox").css("z-index", "3");	
	$("#timer-text").css("z-index", "3");

	$("#overlay0").fadeTo( 3000, 0.5, function(){
	});

	$("#overlay1").fadeTo( 3000, 0.5, function(){
	});		

	$("#overlay2").fadeTo( 3000, 0.5, function(){
	});	
	
	//tentacleManifest();
	
	console.log("demon has arrived");	
	
	clearTimeout(d_timer);
	d_timer =  window.setTimeout(demonMode, timeout);
}

function demonExits(){
	//var video = document.getElementsByTagName('video')[0];	
	//var webcamvideo = document.getElementsByTagName('video')[1];

	$("#cameraiconbox").css("z-index", "5");
	$("#timer-text").css("z-index", "4");			

	$("#overlay0").fadeTo( 3000, 0.0, function(){
		//$("#overlay0").classList.add('hidden');
	});

	$("#overlay1").fadeTo( 3000, 0.0, function(){
		//$("#overlay1").classList.add('hidden');		
	});		

	$("#overlay2").fadeTo( 3000, 0.0, function(){
		//$("#overlay2").classList.add('hidden');		
	});	
	
	console.log("demon has left");

	
/* 	for (i=0; i < overlays; i++){
		var deffect = document.getElementById("overlay" + i);
		$("#overlay"+i).fadeTo( 3000, 0.0, function(){			
			$("#cameraiconbox").css("z-index", "5");
			$("#timer-text").css("z-index", "4");			
			deffect.classList.add('hidden');
			console.log("demon has left");
        });
	} */
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
		demonExits();
    }
    else
    {
        darkMode = true;
		$("#darkModeButton").css("background-color", "#000000");
		$("#darkModeButton").css("color", "#FFFFFF");
		demonIsSummoned(darkModeEnd);
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





// Chat message validation

var chatTriggers = [
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

	triggersWords = [];
	
	for (var i = 0; i < playerwords.length; i++){	
		searchCommands(playerwords[i]);
	}
	
	var lastValidWord = triggersWords.length - 1;	
	
	assembleResponse(triggersWords[lastValidWord]);
	console.log(playerwords);
}


var curResponse = 0;
var r_timer = null;
var triggersWords = [];
var keynouns = [];
var keytimes = [];
var pos;

// Search for keyword triggers
function searchCommands(word)
{
	let wordRaw = word
	keynouns = [];
	keytimes = [];
	
	for (var i = 0; i < chatTriggers.length; i++)
	{
		keynouns.push(chatTriggers[i][0]);
		keytimes.push(chatTriggers[i][1]);		
	}
	
	const result = keynouns.includes(wordRaw);
	pos = keynouns.indexOf(wordRaw);
	//console.log("wordRaw=" + wordRaw + pos);
	
	findWord(wordRaw);
	
	if (result)
	{
		curResponse = pos;
		triggersWords.push(wordRaw);		
    }
	
	// a creepy tree is over there
}


// Conduct a dictionary search
function findWord(letters) {
	
	let searchword = letters.toLowerCase();
	//searchword = searchword.replace(/\s+/g, '');

	// search for verbs
	var v = verbs.includes(searchword);
	
	if (v==true){
		console.log(searchword + " is a verb!");
		var lastWord = verbs.length - 1;
	}
	else
	{
		//console.log("No! " + searchword + " is NOT a word!");
		var lastWord = verbs.length - 1;
	}

	
	// search for nouns	
	var n = nouns.includes(searchword);
	
	if (n==true){
		console.log(searchword + " is a noun!");
		var lastWord = nouns.length - 1;
	}
	else
	{
		//console.log("No! " + searchword + " is NOT a word!");
		var lastWord = nouns.length - 1;	
	}
	
	if (!v){
		if(!n){
			console.log(searchword + " is not a noun or a verb!");
		}
	}
}


function assembleResponse(word)
{	
	if (triggersWords.length > 0) {
		var speechBubble = $('<div id="response"></div>');
		speechBubble.attr("class", "fade-in-element dialoguebubble");	
		
		var speechBody = "Okay, let's look at the " + word + ".";
		speechBubble.append(speechBody);	
		
		console.log('"' + word + '" will trigger a game action.');	
		
		//console.log("keywords=" + triggersWords.length);		
		
		//invalidWords.push(wordRaw);		
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


// Load a response from the webcam
function loadResponse(speechBubble)
{
	var element = $("#responsebox");
	
	if ($("#response").length === 0) {
		
		element.append(speechBubble);
		
		clearTimeout(r_timer);
		r_timer =  window.setTimeout(fadeResponse, 3093);
		$("#webcam-video")[0].currentTime = chatTriggers[curResponse][3];
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





//Video functions

//var video = document.getElementsByTagName('video')[0];
//var webcamvideo = document.getElementsByTagName('video')[1];


//jump to time
function jumpToTime(landTime)
{
	// var player = VideoJS.setup("current_video");
	var video = document.getElementsByTagName('video')[0];	
	
	video.currentTime = landTime;
	video.play();
}




function objTransform(obj, transIn, duration, transOut){
	// scale effect
	var webcamvideo = document.getElementsByTagName('video')[1];		
	webcamvideo.classList.add("scale-up-element");
}



function Sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    }
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove = function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}




//--------------------------
// AutoChat module
//--------------------------

var spamming = false;
var darkMode = false;
var spamType = "positive";
var spamSpeed = 5000;


var usernamePrefixes = ["scary", "spooky", "sick", "insane", "cool", "revenge_of_", "mad", "generic", "Cpt", "nice", "xxx", "Dan", "VAC", "SWE", "Wizard", "faceless", "olof","best_", "daddy", "boo", "mister_", "davai", "Nick", "da_", "the_", "iAm", "Loungin", "extra", "BOT", "dirty", "shoutout_to_", "devil", "Only"];

var usernameSuffixes = ["Kappa", "Sniper", "maniac", "shipwreck", "M", "LULZ", "Games", "Radley101", "lolo", "_yolo", "QQ", "stone", "Trumpster", "xD", "meister", "eric", "jenna", "loser", "haha", "noob", "dude", "Bro", "shotgun", "DADDY", "OneTaps", "winner", "jarod", "pepe", "explosion", "easy", "Nut", "000", "Biceps", "gamer", "Majestic", "zzzzz", "vortex", "sound", "tv"];

var usernameColors = ["red", "green", "#40b7b5", "blue", "purple", "#aa9929"];

var positiveMessages = ["vvv_HEARTS_vvv", "HEY YOOOO GUYZ!!", "best eppie evah", "LIZZY LUV", "I can't feel my lungs", "<== feels all the feels", "gettin goosebumps now", "WTF", "LUL", "holy shit", "SAVED", "ez", "GG", "Kappa", "LOVE THIS SHOW!!!", "WHAT", "Smash Like Button Peasants", "PogChamp PogChamp PogChamp PogChamp PogChamp", "anyone like pasta?", "awesome clawsome", "Freddy has powerful swim swims", "Mark is my spirit animal", "KAT GREED", "The enemy of my enemy is my Freddy", "The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top"];

var negativeMessages = ["BOT", "WTF LMAO", "Stop moving your head! gettin dizzy", "dizzy", "VOLUME UP, PREEZ!", "NA CS", "LOL this ridic", "WTF", "LUL", "HAHAHAHA", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "fake as fxxk", "FAKE FAKE FAKE", "WutFace", "NotLikeThis", "4Head", "KAT GREED", "salty peanuts yum yum", "Lizzy already won this debate, move along", "PALPATINE'S BEHIND IT ALL!!!"];

var scaredMessages = ["OMG WTF is was that?", "GET OUTTA THERE!", "Run, Forrest, Run!", "dizzy", "Noooooooo", "OMFG", "just crapped my pantaloons", "WTF", "this is my worst nightmare", "OMG run", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "can't take this", "please jesus god no more jump scares", "", "NotLikeThis", "...", "<=== IS SCARED", "heart palpittashuns"];

var weirdMessages = ["The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top", "RUINED", "SAVED", "RUINED", "CoolStoryMan"];

var demonMessages = ["i can see you", "i can hear you breathing", "im right over here ==->", "do you wanna meet me?", "do you wanna see my face?", "everbody hates you", "i can smell you", "i cant taste you", "chosen 4 whut?", "la diablo estas vivanta ene de mia korpo", "mi sangas pro la vundoj de inferaj trancxoj", "mi glutos vian animon","ni vekigu la lordon de la abismo", "im coming for you", "7:31", "mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon mi glutos vian animon", "naw im just fukkin around with you chosen one", "we breathe chocolate over here", "guess what's for dinner?", "i want to show you something", "these people are already dead. their blood is on your hands", "did you ever think about ending things?","i know things", "i know your secret","i can do things","do you wanna see whut i can do","_eye1","_eye2","_eye3","_eye4","_face1","_face2","_face3","_face4","_face5","_face6","_face7","_face8","_face9"];


var emotes = [
    ["Kappa", "kappa.png"],
    ["WutFace", "wutface.png"],
    ["4Head", "4head.png"],
    ["CoolStoryMan", "bobross.png"],
    ["DansGame", "dansgame.png"],
    ["NotLikeThis", "notlikethis.png"],
    ["PogChamp", "pogchamp.png"]
];

var pics = [
    ["_eye1", "eyescan.gif"],
    ["_eye2", "eyebug.gif"],
    ["_eye3", "eyered.gif"],
    ["_eye4", "eyeblood.gif"],	
    ["_face1", "facetougues.gif"],
    ["_face2", "facebald.gif"],
    ["_face3", "girlmad.gif"],
    ["_face4", "girlcry1.gif"],
    ["_face5", "girlcry2.gif"],
    ["_face6", "girlcry3.gif"],
    ["_face7", "babyface.gif"],
    ["_face8", "monsterwoman.gif"],
    ["_face9", "mirrorgirl.gif"]
];



//writes a random message in the chat
function writeMessage()
{
    var element = $("#chattext");
    if ((darkMode) || (spamType=="demon")){
		element.append(getDarkMessage());
	} else {
		element.append(getMessage());
	}
    
	cutTopOfChat();
    scrollToBottom();
/* 	var snd = new Sound("../snd/fx/bubble_pop.mp3", 10, false); 
	snd.start(); */
}

//returns a random message
function getMessage()
{
    var message = $('<div id="chatbubble"></div>');
	message.attr("class", "fade-in-element");	
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

    msgBody = replace_emotes(msgBody);
    msgBody = replace_pics(msgBody);
	
    message.append(msgBody);
	
    return message;
}

var demonMsgOriginX = 85;

//returns a random message
function getDarkMessage()
{
	
	var message = $('<div id="chatbubble" margin-left="' + adjX + '" ></div>');
	message.attr("class", "fly-in-element darkbubble");

	var randomX = Math.floor(Math.random()*5);
	var adjX = demonMsgOriginX - randomX;
	message.css("margin-left", adjX +"%");
	
	//message.append(getDemonName());
	//message.append("<br/>");

    var msgBody = "";
	
	msgBody = (demonMessages[Math.floor(Math.random()*demonMessages.length)]);
    
/*     if(spamType=="positive")
        msgBody = (positiveMessages[Math.floor(Math.random()*positiveMessages.length)]);
    else if(spamType=="negative")
        msgBody = (negativeMessages[Math.floor(Math.random()*negativeMessages.length)]);
    else if(spamType=="scared")
        msgBody = (scaredMessages[Math.floor(Math.random()*scaredMessages.length)]);
	else if(spamType=="weird")
        msgBody = (weirdMessages[Math.floor(Math.random()*weirdMessages.length)]);
	else if(spamType=="demon")
		msgBody = (demonMessages[Math.floor(Math.random()*demonMessages.length)]); */
		//loadRandomImg(message);

    msgBody = replace_emotes(msgBody);
    msgBody = replace_pics(msgBody);
	if (imgMsg){
		message.attr("class", "fly-in-element darkbubble imgbubble");
	}

    message.append(msgBody);
	
    return message;
}


//replace text with img
function replace_emotes(message)
{	
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='../img/emotes/"+emotes[i][1]+"' class='emoticon' alt='"+emotes[i][0]+"' vertical-align='bottom'>");
    } 

    return message;
}


var imgMsg = false;

function replace_pics(message)
{	
	imgMsg = false;

    for(var i=0;i<pics.length;i++){
		var str = message;
		var n = str.search(pics[i][0], 'g');
		if (n >=0) { 
			imgMsg = true;
		}
		message = message.replace(new RegExp(pics[i][0], 'g'), "<img src='../img/pics/"+pics[i][1]+"' class='pic' alt='"+pics[i][0]+"'>");	
		//message = message.replace(new RegExp(pics[i][0], 'g'), "<img src='../img/pics/eyered2.gif' class='pic' alt='"+pics[i][0]+"'>");	
    }

    return message;
}


//returns a random username
function getDemonName()
{
    var username = $('<span></span>');
    username.attr("class", "demonname");
	username.append("000:");
    
    return username;	
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


/* $("#chattext" ).scroll(function() {
  cleanUpScroll();
}); */



//checks to see if the chat is too long and cuts the top elements if it is
function cutTopOfChat()
{
    var element = $("#chattext");
	chattext.scrollTop = chattext.scrollHeight;
	
	
    if(element.children().length > 40)
    {
        var chatMessages = element.children();
        for(i = 0; i<10; i++)
        {
            chatMessages[i].remove();
        }
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
				if (positionFromBottom < topOfScroll + 32)
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




//--------------------------
// Player Chat interaction	
//--------------------------

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
        msgBody = replace_emotes(msgBody);
		var msgBodyDiv = $('<div class="playertext">' + msgBody +'</div>');
		message.append(msgBodyDiv);
   
        textfield.val("");
    
        element.append(message);

		strToArray(msgBody);
		
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








function log(msg) {
  // document.getElementById('events').innerHTML = '';
  console.log(msg);
}
