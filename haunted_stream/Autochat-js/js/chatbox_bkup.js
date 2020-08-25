var spamming = false;
var darkMode = true;
var spamType = "positive";

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
["chapel", "https://video.wixstatic.com/video/bde2cd_f5edd6eb29f64d689a3c9cbaae834870/1080p/mp4/file.mp4"],
["dontgiveup", "https://video.wixstatic.com/video/bde2cd_00273d71cb9b4edbb78e6231d8f6b103/1080p/mp4/file.mp4"],
["enter", "https://video.wixstatic.com/video/bde2cd_ad92ea67fee5433b9396b7b1ca61dd05/720p/mp4/file.mp4"],
["ashes", "https://video.wixstatic.com/video/bde2cd_eb8911679a6c4970ab1d70435897433b/1080p/mp4/file.mp4"]
];



var spamSpeed = 1200;



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
    message.append(" : ");

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
	
	
	// message.css("background-color", "rgb(20, 20, 20, 0.5)");
	
    return message;
}


function replace_emotes(message)
{
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='img/emotes/"+emotes[i][1]+"' alt='"+emotes[i][0]+"'>");
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
/* 	username.append(" : "); */ 
    
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
        var message = $('<div id="chatbubble" name="bubble"></div>');
        // var message = $('<p></p>');		
        message.attr("class", "chatMessage fade-in-element");		
        message.append(getPlayerName());
        message.append(": ");

        var msgBody = textfield.val();
        msgBody = replace_emotes(msgBody);

        message.append(msgBody);
		message.css("background", "black");			
   
        textfield.val("");
		
		msgCommand = "the " + msgBody
    
        element.append(message);
		searchForCommand(msgCommand);
        scrollToBottom();
        cutTopOfChat();
    }
}

var videocues = [
	["start"	, 	0],
	["ayesha"	, 	15],
	["road"		, 	50],
	["tree"		, 	68],	
	["pentagram", 	101],
	["church"	, 	127],	
	["door"		, 	142],
	["steeple"	, 	151],
	["field"	, 	161],	
	["face"		, 	170],
	["date"		, 	181],
	["founding"	, 	181],	
	["engraving", 	181],		
	["jenna"	, 	224],	
	["window"	, 	248],
	["graffiti"	, 	248],
	["vandalism", 	248],		
	["eric"		, 	285],
	["penis"	, 	294],
	["jason"	, 	300],	
	["anne"		, 	309],
	["stairs"	, 	312]	
	
];

var commandwords = [
	"start",	
	"ayesha",
	"road",	
	"tree",		
	"pentagram",
	"church",	
	"door",
	"steeple",
	"field",	
	"face",
	"date",
	"founding",	
	"engraving",		
	"jenna"	,	
	"window",
	"graffiti",
	"vandalism",		
	"eric",
	"penis",
	"jason",	
	"anne",
	"stairs"	
];

var commandtimes = [
	0,
	15,
	50,
	68,	
	101,
	127,	
	142,
	151,
	161,	
	170,
	181,
	181,	
	181,		
	224,	
	248,
	248,
	248,		
	285,
	294,
	300,	
	309,
	312	
];

function searchForCommand(msgBody){
	
	let msgBodyRaw = msgBody.toLowerCase();
	var commandWord = "";	
	
	const result = commandwords.some(word => {
	const commandwords = word.split(',');

	  return commandwords.some(r => {
		if (~msgBodyRaw.indexOf( " " )) {
			msgBodyRaw = msgBodyRaw.substring(msgBodyRaw.indexOf( " " ) );			
			commandWord = r;
		// only check the first word if there are multiple
		// msgBodyRaw = msgBodyRaw.substring( 0, msgBodyRaw.indexOf( " " ) );
			commandWord = r;
		}
		
		return r.toLowerCase().includes(msgBodyRaw) || msgBodyRaw.includes(r.toLowerCase());
	  });
	});

	console.log('result = ', result);
	
	if (result)
	{
		console.log('success ' + commandWord);
		var pos = commandwords.indexOf(commandWord);
		jumpToTime(commandtimes[pos]);		
    }
    else
    {
		console.log('failed');
	}
	
	
/* 	var el = commandcues.find(a =>a.includes(msgBody));
	console.log(el);
	
	var pos = commandcues.indexOf(el);
	jumpToTime(commandtimes[pos]); */
	
/*     console.log(commandcues.filter(function(item){
        var finder = msgCommand;
        return eval('/'+finder+'/').test(item);
		var pos = commandcues.indexOf(el);
    }));	 */
}


//returns a set player rname
function getPlayerName()
{
	var playername = $('<span></span>');
	playername.attr("class", "username");
	playername.append("ChosenOne");
	playername.css("color", "red");
	
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




//is called automatically when the html page is loaded
function init()
{
    makeSettings();
	toggleSettings();
    makeVideoctrl();
	toggleVideoctrl();
    spam();
	darkmode();
	addListeners();
	// VideoJS.setupAllWhenReady();
	// jumpToTime(50);
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
		// chat.css("opacity", "0.5");
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
    
    var positiveSpam = $('<option></option>');
    positiveSpam.attr("value", "positive");
    positiveSpam.append("Positive");
    var negativeSpam = $('<option></option>');
    negativeSpam.attr("value", "negative");
    negativeSpam.append("Negative");
    var scaredSpam = $('<option></option>');
    scaredSpam.attr("value", "scared");
    scaredSpam.append("Scared");	
    var weirdSpam = $('<option></option>');
    weirdSpam.attr("value", "weird");
    weirdSpam.append("Weird");
    
    selectSpam.append(positiveSpam);
    selectSpam.append(negativeSpam);
    selectSpam.append(scaredSpam);	
    selectSpam.append(weirdSpam);
    
    
    var selectSpeed = $('<input></input>');
    selectSpeed.attr("type", "range");
    selectSpeed.attr("id", "selectspeed");
    selectSpeed.attr("onchange", "chooseSpeed()");
    
    settings.append($('<h3></h3>').append("type of spam"));
    settings.append(selectSpam);
    settings.append($('<h3></h3>').append("speed"));
    settings.append(selectSpeed);    
    settings.append("<br><br>");
    settings.append(spamButton);
    settings.append("<br><br>");
    settings.append(clearButton);
    settings.append("<br><br>");
    settings.append(darkModeButton);
    settings.append("<br><br>");	
    
/*     var settingsButton = $("#settingsButton");
    settingsButton.append(settings); */
	
    var settingsMenu= $("body");
    settingsMenu.append(settings);

	var el = document.getElementById('settings');
	el.style.position = 'fixed';
	el.style.left = '260px';
	el.style.top = '40px';
	el.style.width = '250px';

/* 	var x = $("p").position();
	alert("Top: " + x.top + " Left: " + x.left); */
	
	
/* 	var parentButton = $("#settingsButton");
	var bodyRect = document.parentButton.getBoundingClientRect();
	console.log(bodyRect); */
	
}


// makes a video controller box

	const timeButtons = [];
	const timeStamps = [0, 10, 20, 30, 40, 50, 60];

function makeVideoctrl()
{
    $("#videoctrlButton").css("background-color", "#4b2f7f");
        
    var videoctrl = $('<div class="dirmenu" name="videoctrlButton" align="center"></div>');
    videoctrl.attr("id", "videoctrl");
	videoctrl.append("<br>");
	
	var i;
	for (i = 1; i < timeStamps.length; i++) {
		var timeButton = $('<button name="timebtn" id="timebtn' + i + '"></button>');	
		timeButton.append("time:" + timeStamps[i] + " secs");
		var landTime = timeStamps[i];
		timeButton.attr('seekPoint', landTime);
		timeButtons.push("time " + timeStamps[i])
		videoctrl.append(timeButton);
		videoctrl.append("<br><br>");
	}
    
    var videoctrlMenu = $("body");
	videoctrlMenu.append(videoctrl);
	
	var el = document.getElementById('videoctrl');
	el.style.position = 'fixed';
	el.style.left = '5px';
	el.style.top = '40px';
	el.style.width = '250px';
	
}


function addListeners(){
	var video = document.getElementsByTagName('video')[0];

	video.addEventListener('waiting', function () {log('waiting');});

	video.addEventListener('playing', function () {log('playing');
		this.muted = false;
	});

	video.addEventListener('pause', function () {log('pause');});

	video.addEventListener('play', function () {log('play');});

	video.addEventListener('stalled', function () {log('stalled');});

	video.addEventListener('seeking', function () {log('seeking');});

	video.addEventListener('seeked', function () {log('seeked');});
	
	video.addEventListener('timeupdate', function() {
		document.getElementById("timer").innerHTML = ('<p>' + this.currentTime + '</p>');
		currentTime = this.currentTime;
	});
	
	var i;
	for (i = 1; i < timeStamps.length; i++) {
		document.getElementById('timebtn' + i).addEventListener('click', function () {
			//alert(this.getAttribute('id'));
			var value = (this.getAttribute('seekPoint'));
			video.currentTime = value;
			video.play();
		});
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


//shows or hides the videoctrls
function toggleVideoctrl()
{
    $("#videoctrl").toggle();
	// $('div.dirmenu:not(#videoctrl)').hide();
	$('div.dirmenu:not(#videoctrl)').hide();
	// document.getElementById('settings').css.display = "none";
    
    if($("#videoctrl").css('display') == 'none')
    {
        $("#videoctrlButton").css("background-color", "gray");
		$("#videoctrlButton").css("color", "white");
    }
    else
    {
        $("#videoctrlButton").css("background-color", "white");
		$("#videoctrlButton").css("color", "black");
    }
}


//sets the type of spam from the input in the settings
function chooseSpam()
{
    spamType = $("#selectspamtype").val();
}

//sets the speed from the input in the settings
function chooseSpeed()
{
    var val = $("#selectspeed").val();
    spamSpeed = 2200 - (20 * val);
}



//Video functions

function log(msg) {
  // document.getElementById('events').innerHTML = '';
  console.log(msg);
}

/* var player = videojs('my-video', {
  responsive: true;
  fill: true;
}); */


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