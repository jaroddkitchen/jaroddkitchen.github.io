//is called automatically when the html page is loaded
function init()
{
	//document.body.requestFullscreen();
    makeSettings();
	toggleSettings();
	toggleCamera(0);
	initWebcam();
    //spam();
	darkmode();
	addListeners();
	loadDictionary();
	
	//initVideoControlBar();
	//hideInterface();
}


//--------------------------
// AutoChat module
//--------------------------

var spamming = false;
var darkMode = true;
var spamType = "positive";
var spamSpeed = 3200;


var usernamePrefixes = ["scary", "spooky", "sick", "insane", "cool", "revenge_of_", "mad", "generic", "Cpt", "nice", "xxx", "Dan", "VAC", "SWE", "Wizard", "faceless", "olof","best_", "daddy", "boo", "mister_", "davai", "Nick", "da_", "the_", "iAm", "Loungin", "extra", "BOT", "dirty", "shoutout_to_", "devil", "Only"];

var usernameSuffixes = ["Kappa", "Sniper", "maniac", "shipwreck", "M", "LULZ", "Games", "Radley101", "lolo", "_yolo", "QQ", "stone", "Trumpster", "xD", "meister", "eric", "jenna", "loser", "haha", "noob", "dude", "Bro", "shotgun", "DADDY", "OneTaps", "winner", "jarod", "pepe", "explosion", "easy", "Nut", "000", "Biceps", "gamer", "Majestic", "zzzzz", "vortex", "sound", "tv"];

var usernameColors = ["red", "green", "#40b7b5", "blue", "purple", "#aa9929"];

var positiveMessages = ["vvv_HEARTS_vvv", "HEY YOOOO GUYZ!!", "best eppie evah", "LIZZY LUV", "I can't feel my lungs", "<== feels all the feels", "gettin goosebumps now", "WTF", "LUL", "holy shit", "SAVED", "ez", "GG", "Kappa", "LOVE THIS SHOW!!!", "WHAT", "Smash Like Button Peasants", "PogChamp PogChamp PogChamp PogChamp PogChamp", "anyone like pasta?", "awesome clawsome", "Freddy has powerful swim swims", "Mark is my spirit animal", "KAT GREED", "The enemy of my enemy is my Freddy", "The overflow-y property specifies whether to clip the content, add a scroll bar, or display overflow content of a block-level element, when it overflows at the top"];

var negativeMessages = ["BOT", "WTF LMAO", "Stop moving your head! gettin dizzy", "dizzy", "VOLUME UP, PREEZ!", "NA CS", "LOL this ridic", "WTF", "LUL", "HAHAHAHA", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "fake as fxxk", "FAKE FAKE FAKE", "WutFace", "NotLikeThis", "4Head", "KAT GREED", "salty peanuts yum yum", "Lizzy already won this debate, move along", "PALPATINE'S BEHIND IT ALL!!!"];

var scaredMessages = ["OMG WTF is was that?", "GET OUTTA THERE!", "Run, Forrest, Run!", "dizzy", "Noooooooo", "OMFG", "just crapped my pantaloons", "WTF", "this is my worst nightmare", "OMG run", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "can't take this", "please jesus god no more jump scares", "", "NotLikeThis", "...", "<=== IS SCARED", "heart palpittashuns"];

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



//writes a random message in the chat
function writeMessage()
{
    var element = $("#chattext");
    element.append(getMessage());
    cutTopOfChat();
    scrollToBottom();	
	cleanUpScroll();	
}

//returns a random message
function getMessage()
{
    var message = $('<div id="chatbubble"></div>');
    message.attr("class", "fade-in-element");
    message.append(getUserName());
	
	message.append("&nbsp;&#58;&nbsp;"); 	
    // message.append(" : ");

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
		//msgBody = (weirdMessages[Math.floor(Math.random()*weirdMessages.length)]);
		loadRandomImg(message);

    msgBody = replace_emotes(msgBody);

    message.append(msgBody);
	
    return message;
}


var keywords = "scary, demon, evil";

function loadRandomImg(message)
{
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keywords,
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


//replace text with img
function replace_emotes(message)
{
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='../img/emotes/"+emotes[i][1]+"' class='emoticon' alt='"+emotes[i][0]+"' vertical-align='bottom'>");
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
        var message = $('<div id="playerbubble" name="bubble"></div>');	
        message.attr("class", "chatMessage fade-in-element");		
        message.append(getPlayerName());
        message.append(" ");

        var msgBody = textfield.val();
        msgBody = replace_emotes(msgBody);

        message.append(msgBody);
   
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
	playername.append("&#9733;&nbsp;The Chosen One says...");
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



//scrolls to the bottom of the chat
function scrollToBottom()
{
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;		
}


//scrolls to the bottom of the chat
function cleanUpScroll()
{
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;	

	elements = document.querySelectorAll('.fade-in-element');
	
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;
      var positionFromBottom = elements[i].getBoundingClientRect().bottom;
	  var messageHeight = element.clientHeight;
	  
	  var topOfScroll = chattext.getBoundingClientRect().top;	 
	  
	  
      if (positionFromTop < (topOfScroll + messageHeight + 12)) {
		//element.classList.remove('fade-in-element');
		//$(element).fadeOut();
        //element.classList.add('fade-out-element');
		//console.log("message height: " + messageHeight);
		scrollToBottom();
        //element.classList.remove('hidden');
      }
    }	
}


//checks to see if the chat is too long and cuts the top elements if it is
function cutTopOfChat()
{
    var element = $("#chattext");
	chattext.scrollTop = chattext.scrollHeight;
	
	
    if(element.children().length > 270)
    {
        var chatMessages = element.children();
        for(i = 0; i<30; i++)
        {
            chatMessages[i].remove();
        }
    }
}



//--------------------------
// Demo Settings	
//--------------------------

//toggles between dark mode and normal mode
function darkmode()
{
    var chat = $("#chat");
    if(darkMode)
    {
        darkMode = false;
        chat.css("color", "white");
        chat.css("background-color", "transparent");
        $("#textfield").css("background-color", "#141414");
        $("#textfield").css("color", "white");
        $("#chattext").attr("class", "dark");		
    }
    else
    {
        darkMode = true;
        chat.css("color", "white");
        chat.css("background-color", "rgb(20, 20, 20, 0.5");
        $("#textfield").css("background-color", "rgb(20, 20, 20, 0.5)");
        $("#textfield").css("color", "white");
        $("#chattext").removeAttr("class");			
		
	}
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
    
    var darkModeButton = $('<button></button>');
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


/* videojs("my-video").ready(function(){
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



// Event listeners
function addListeners(){
	var video = document.getElementsByTagName('video')[0];
	var webcamvideo = document.getElementsByTagName('video')[1];
	
	video.addEventListener('waiting', function () {log('waiting');});

	video.addEventListener('playing', function () {log('playing');
		showInterface();
		// this.muted = false;
	});

	video.addEventListener('pause', function () {log('pause');});

	video.addEventListener('play', function () {
		log('play');
		if (!videostart){
			videostart = true;
			document.body.requestFullscreen();			
			video.setAttribute("poster", "../img/art/svg/blank_poster.png");
			webcamvideo.play();			
			//spam();			
		}
	});
	

	video.addEventListener('stalled', function () {log('stalled');});

	video.addEventListener('seeking', function () {log('seeking');});

	video.addEventListener('seeked', function () {log('seeked');});
	
	video.addEventListener('timeupdate', function() {
		timeCheck();
		if (webcamvideo.currentTime >= 40)
		{
			webcamvideo.currentTime = 36.5;
		}
		//document.getElementById("timer").innerHTML = (this.currentTime);
		
	});
}


// timer objects

/* var sec = 0;

function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
	$("#seconds").html(pad(++sec%60));
	$("#minutes").html(pad(parseInt(sec/60,10)));
}, 1000); */

setInterval(function() {
    var myPlayer = videojs('my-video');
    var whereYouAt = myPlayer.currentTime();
    var minutes = Math.floor(whereYouAt / 60);   
    var seconds = Math.floor(whereYouAt - minutes * 60)
    var x = minutes < 10 ? "0" + minutes : minutes;
    var y = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerHTML = x + ":" + y;	
}, 400);



//--------------------------
// Camera Controls	
//--------------------------


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


function timeCheck()
{
	var myPlayer = videojs('my-video');	

	if (curspeech < speeches.length){
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

var commandnouns = [
	["START"	, 	0, 0],
	["AYESHA"	, 	15, 0],
	["ROAD"		, 	50, 0],
	["TREE"		, 	68, 0],	
	["PENTAGRAM", 	101, 0],
	["CHURCH"	, 	127, 0],	
	["DOOR"		, 	142, 0],
	["STEEPLE"	, 	151, 0],
	["FIELD"	, 	161, 0],	
	["FACE"		, 	170, 0],
	["DATE"		, 	181, 0],
	["FOUNDING"	, 	181, 0],	
	["ENGRAVING", 	181, 0],		
	["JENNA"	, 	224, 0],	
	["WINDOW"	, 	248, 0],
	["GRAFFITI"	, 	248, 0],
	["VANDALISM", 	248, 0],		
	["ERIC"		, 	285, 0],
	["PENIS"	, 	294, 0],
	["JASON"	, 	300, 0],	
	["ANNE"		, 	309, 0],
	["STAIRS"	, 	312, 0]	
];


var words = []; 
 
// Do a jQuery Ajax request for the text dictionary
function loadDictionary() {
    // Get an array of all the words
    words = dict.split( "," );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words [ i ] ] = true;
    }
     
	var lastWord = words.length - 1;
	console.log("dict loaded: " + words[lastWord] );
	
    // The game would start after the dictionary was loaded
    //init();
}





const removeWords = ["A", "AS", "THE", "TO", "OF", ""]; 

function strToArray(str)
{
	var newStr = str;
	var newStr = str.replace(/and|then/gi, ".");
	newStr = newStr.replace(/go to |go towards |go back to |travel to |travel towards |move to |move towards |go back to |walk to |walk towards| head to |head towards |head back to |return to |\s+get to /gi, " _GO_TO: ");
	newStr = newStr.replace(/\s+on |\s+in |\s+at |\s+with /gi, " _INTERACT_WITH: ");

//Walk towards the store and make a balloon animal on their table in the back then walk to the front of the place and get on the stage then vomit andthen make a pass at the waitress!
	
    // Convert to uppercase
	let strUpper = newStr.toUpperCase();

    // Get an array of all the words	
    playerwords = strUpper.split( " " );
	
	// Eliminate removal words
	playerwords = playerwords.filter( ( el ) => !removeWords.includes( el ) );	

	validWords = [];
	
	for (var i = 0; i < playerwords.length; i++){
		//if (!commandFound){		
			searchCommands(playerwords[i]);
		//}
	}
	
	commandFound = false;
	
	 //console.log(words[0] + " " + words[0].length);
	console.log(playerwords);
}



var curresponse = 0;
var r_timer = null;
var commandFound = false;
var validWords = [];

function searchCommands(word){
	let wordRaw = word;
	var keynouns = [];
	var keytimes = [];
	
	for (var i = 0; i < commandnouns.length; i++)
	{
		keynouns.push(commandnouns[i][0]);
		keytimes.push(commandnouns[i][1]);		
	}
	
	const result = keynouns.includes(wordRaw);
	console.log("wordRaw=" + wordRaw);
	
	var pos = keynouns.indexOf(wordRaw);
	
	if (result)
	{
		//findWord(wordRaw);
		validWords.push(wordRaw);
		//addToResponse(wordRaw);	
    }

	if (validWords.length > 0) {
		var speechBubble = $('<div id="response"></div>');
		speechBubble.attr("class", "fade-in-element dialoguebubble");
		var lastValidWord = validWords.length - 1;		
		speechBubble.append(addToResponse(validWords[lastValidWord]));
		
		//validWords.push(wordRaw);		
		//jumpToTime(keytimes[pos]);
		//responsiveVoice.speak("Okay, let's look at the " + commandNoun,$('#voiceselection').val());
	}
	else
	{
		findWord(wordRaw);
		console.log('This word does not affect the game');
		var speechBubble = $('<div id="response"></div>');
		speechBubble.attr("class", "fade-in-element dialoguebubble");			
		var speechBody = "I don't see anything like that around here, Chosen One.";
		// var speechBody = "Sorry, I don't know what a " + msgBodyRaw + " is.";
		speechBubble.append(speechBody);
	}
	
	loadResponse(speechBubble);
}


function addToResponse(word)
{
	console.log('"' + word + '" will trigger a game action.');		
	console.log("keywords=" + validWords.length);
		
	var speechBody = "Okay, let's look at the " + word + ".";
	
	return speechBody;
	//commandFound = true;
}


function loadResponse(speechBubble)
{
	var element = $("#responsebox");
	
	if ($("#response").length === 0) {
	element.append(speechBubble);
	console.log("no response found");
	clearTimeout(r_timer);
	}	
	else
	{
		$("#response").remove();
		element.append(speechBubble);
		console.log("response found");
		clearTimeout(r_timer);
	}
	
	r_timer =  window.setTimeout(fadeResponse, 3000);
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


function findWord( letters ) {
	
	let searchword = letters.toUpperCase();
	//searchword = searchword.replace(/\s+/g, '');

	var n = words.includes(searchword);
	
	if (n==true){
		console.log("Yes! " + searchword + " is a word!");
		var lastWord = words.length - 1;
		console.log("dict loaded: " + words[lastWord] );
	}
	else
	{
		console.log("No! " + searchword + " is NOT a word!");
		var lastWord = words.length - 1;
		console.log("dict loaded: " + words[lastWord] );		
	}
}





//Video functions

function log(msg) {
  // document.getElementById('events').innerHTML = '';
  console.log(msg);
}


//jump to time
function jumpToTime(landTime)
{
	// var player = VideoJS.setup("current_video");
	var video = document.getElementsByTagName('video')[0];	
	
	video.currentTime = landTime;
	video.play();
	
/* 	var isVolumeMuted =  videojs('my-video').muted();
	console.log(isVolumeMuted); */
	
	//video.play();
	//video.muted(false);
	//playbackRate(0.5);
	
/* 	videojs('#my-video').play();
	videojs('#my-video').prop('muted', false); */
}


/* function getVideo()
{
} */


/* var player = videojs('player');

player.ready(function() {
	player.pause(true);
	player.play();
	player.currentTime(200)	
}) */


/* VideoJS.DOMReady(function() {
	var player = document.getElementById("my-video");
	player.pause();
	player.play();
	player.currentTime(40);
});
 */



/* function initialize()
{
}

function onPlayerReady() {
} */

	
//generic seekTo function taking a player element and seconds as parameters    
/* function playerSeekTo(player, seconds) {
}


function onPlayerStateChange(event) {
} */


// This function is called by initialize()
/* function updateTimerDisplay(){
}

function formatTime(time){
} */

// This function is called by initialize()
/* function updateProgressBar(){
} */


//gives the user an input field to change the name of the channel
/* function changeChannel()
{
}

function setChannelName()
{
} */