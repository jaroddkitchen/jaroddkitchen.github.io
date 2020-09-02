//is called automatically when the html page is loaded
function init()
{
	//document.body.requestFullscreen();
    makeSettings();
	toggleSettings();
	toggleCamera(0);
    //spam();
	darkmode();
	addListeners();
	//initVideoControlBar();
	//hideInterface();
}

function initVideoControlBar()
{
/* 	const VolumeBar = videojs.getComponent('VolumeBar');
	var box = document.getElementById('volume-box');
	var player = videojs('my-video');
	var volumeBar = new VolumeBar(player);
	// player calls dispose on children, but this is not a child
	player.on('dispose', volumeBar.dispose.bind(volumeBar))
	box.appendChild(volumeBar.el()); */
	
	const ProgessControl = videojs.getComponent('ProgressControl');
	var box = document.getElementById('progress-box');
	var player = videojs('my-video');
/* 	var progressControl = new ProgessControl(player,{
	  dimensions: ['width=500', 'height=25']
	}); */
	var progressControl = new ProgessControl(player);	
	// player calls dispose on children, but this is not a child
	player.on('dispose', progressControl.dispose.bind(progressControl))
	box.appendChild(progressControl.el());	
}

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


var videostart = false;

var videoplaylist = [
	["chapel", "https://video.wixstatic.com/video/bde2cd_fb6fbe2bce7249969ee1ea57b2288668/720p/mp4/file.mp4"],
	["pennhurst", "https://video.wixstatic.com/video/bde2cd_29fc09fb61cd469fa5e1de604ddd8be6/720p/mp4/file.mp4"],
	["desert", "https://video.wixstatic.com/video/bde2cd_0b465ccc294f4786bd45df5fa6edee4d/720p/mp4/file.mp4"]
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

    msgBody = replace_emotes(msgBody);

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

		

//writes the text of the input field into the chat with a random username
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
/* 		message.css("color", "black");
		message.css("text-shadow", "1px 1px #666666");
		message.css("background", "linear-gradient(to top, rgba(255, 255, 255, 0.85) 0%, rgba(128, 128, 128, 0.85) 100%)");	 */	
   
        textfield.val("");
		
		msgCommand = "the " + msgBody
    
        element.append(message);

		searchCommandWords(msgCommand);
        
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
    demonSpam.attr("value", "weird");
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



function toggleCamera(n){
	var camera = n;
	console.log("camera " + camera);
	
	var myPlayer = document.getElementsByTagName('video')[0];
	var curtime = myPlayer.currentTime;

	myPlayer.setAttribute("src", videoplaylist[n][1]);
	myPlayer.setAttribute("type", "video/mp4");
	myPlayer.currentTime = curtime;
	
	if(videostart){
		myPlayer.play();
		//myPlayer.load();
		//hideInterface();		
	}
	
	var curButton = "#" + event.srcElement.id;
	var curName = "#" + event.srcElement.name;

	
	if (!camera){
		camera = 0;
		curButton = "#" + "cameraButton1";		
	}	
	
	$('.cameraIconButton').css("background-color", "transparent");	
	$('.cameraIconButton').css("color", "white");
	$('.cameraIconButton').attr("src", "../img/art/svg/camera_off.svg");
	
    $(curButton).css("background-color", "transparent");
	$(curButton).css("color", "white");
	$(curButton).attr("src", "../img/art/svg/camera_on.svg");		
    
    if($(curButton).css('display') == 'none')
    {
        $(curButton).css("background-color", "transparent");
		$(curButton).css("color", "white");
		$(curButton).attr("src", "../img/art/svg/camera_off.svg");			
    }
    else
    {
        $(curButton).css("background-color", "transparent");
		$(curButton).css("color", "black");
		$(curButton).attr("src", "../img/art/svg/camera_on.svg");			
    }
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
			video.setAttribute("poster", "../img/art/svg/blank_poster.png");
			spam();			
		}
	});
	

	video.addEventListener('stalled', function () {log('stalled');});

	video.addEventListener('seeking', function () {log('seeking');});

	video.addEventListener('seeked', function () {log('seeked');});
	
	video.addEventListener('timeupdate', function() {
		timeCheck();
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




// voice triggers

var speeches = [
	["Welcome to the Haunted Stream Project's interactive demo. Uncle Jarod's latest innovations include me, a soul-less robot, programmed to respond to your asinine comments.", 2, 4] ,
	["If you would like to switch to a different camera perspective, click on the labeled camera buttons shown along the bottom of the screen.", 7, 10],
	["If you see anything in the footage you'd like to take a closer look at, try typing about it in the text message field of the chatbox, located in the lower right corner of your screen, then click the chat button or press the return key to see what transpires. For example, if you see a fallen tree by a roadside, you might type, Hey, check out that creepy tree!", 12, 15]
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


function getResponse()
{
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


var commandnouns = [
	["start"	, 	0, 0],
	["ayesha"	, 	15, 0],
	["road"		, 	50, 0],
	["tree"		, 	68, 0],	
	["pentagram", 	101, 0],
	["church"	, 	127, 0],	
	["door"		, 	142, 0],
	["steeple"	, 	151, 0],
	["field"	, 	161, 0],	
	["face"		, 	170, 0],
	["date"		, 	181, 0],
	["founding"	, 	181, 0],	
	["engraving", 	181, 0],		
	["jenna"	, 	224, 0],	
	["window"	, 	248, 0],
	["graffiti"	, 	248, 0],
	["vandalism", 	248, 0],		
	["eric"		, 	285, 0],
	["penis"	, 	294, 0],
	["jason"	, 	300, 0],	
	["anne"		, 	309, 0],
	["stairs"	, 	312, 0]	
	
];


function searchCommandWords(msgBody){
	let msgBodyRaw = msgBody.toLowerCase();
	var commandNoun = "";
	var keynouns = [];
	var keytimes = [];
	
	for (var i = 0; i < commandnouns.length; i++)
	{
		keynouns.push(commandnouns[i][0]);
		keytimes.push(commandnouns[i][1]);		
	}

	// console.log(keywords);
	
	const result = keynouns.some(word => {
	const keynouns = word.split(',');

	  return keynouns.some(r => {
		if (~msgBodyRaw.indexOf( " " )) {
			msgBodyRaw = msgBodyRaw.substring(msgBodyRaw.indexOf( " " ) );			
			commandNoun = r;
		}
		
		return r.toLowerCase().includes(msgBodyRaw) || msgBodyRaw.includes(r.toLowerCase());
	  });
	});

	console.log('result = ', result);
	
	if (result)
	{
		console.log('success ' + commandNoun);
		var pos = keynouns.indexOf(commandNoun);
		
		var speechBubble = $('<div id="response"></div>');
		speechBubble.attr("class", "fade-in-element dialoguebubble");
		var speechBody = "Okay, let's look at the " + commandNoun;
		speechBubble.append(speechBody);
		
		var element = $("#responsebox");
		element.html(speechBubble);
		
		//jumpToTime(keytimes[pos]);
		//responsiveVoice.speak("Okay, let's look at the " + commandNoun,$('#voiceselection').val());		
    }
    else
    {
		console.log('failed');
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