var spamming = false;
var darkMode = true;
var spamType = "positive";

var usernamePrefixes = ["scary", "spooky", "sick", "insane", "cool", "revenge_of_", "mad", "generic", "Cpt", "nice", "xxx", "Dan", "VAC", "SWE", "Wizard", "faceless", "olof",
                        "best_", "daddy", "boo", "mister_", "davai", "Nick", "da_", "the_", "iAm", "Loungin", "extra", "BOT", "dirty", "shoutout_to_", "devil", "Only"];

var usernameSuffixes = ["Kappa", "Sniper", "maniac", "shipwreck", "M", "LULZ", "Games", "Radley101", "lolo", "_yolo", "QQ", "stone", "Trumpster", "xD", "meister", "eric", "jenna", "loser", "haha", "noob", "dude", "Bro",
                       "shotgun", "DADDY", "OneTaps", "winner", "jarod", "pepe", "explosion", "easy", "Nut", "000", "Biceps", "gamer", "Majestic", "zzzzz", "vortex", "sound", "tv"];

var usernameColors = ["red", "green", "#40b7b5", "blue", "purple", "#aa9929"];

var positiveMessages = ["vvv_HEARTS_vvv", "HEY YOOOO GUYZ!!", "best eppie evah", "LIZZY LUV", "I can't use my lungs", "<== is feeling all the feels", "gettin goosebumps now", "WTF", "LUL", "holy shit", "SAVED", "ez", "GG", "Kappa", "LOVE THIS SHOW!!!", "WHAT", "Smash Like Button Peasants", "PogChamp PogChamp PogChamp PogChamp PogChamp", "anyone like pasta?", "you guys are awesome!", "​The enemy of my enemy is my Freddy", "Freddy has powerful swim swims", "Mark is my spirit animal", "KAT GREED"];

var negativeMessages = ["BOT", "WTF LMAO", "Stop moving your head! gettin dizzy", "dizzy", "VOLUME UP, PREEZ!", "NA CS", "LOL this ridic", "WTF", "LUL", "HAHAHAHA", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "fake as fxxk", "FAKE FAKE FAKE", "WutFace", "NotLikeThis", "4Head", "KAT GREED", "salty peanuts yum yum", "Lizzy already won this debate, move along", "PALPATINE'S BEHIND IT ALL!!!"];

var scaredMessages = ["OMG WTF is was that?", "GET OUTTA THERE!", "Run, Forrest, Run!", "dizzy", "Noooooooo", "OMFG", "just crapped my pantaloons", "WTF", "this is my worst nightmare", "OMG run", "OMG", "LMAO", "so bad omg", "xD", "FAKE", "fake", "can't take this", "please jesus god no more jump scares", "", "NotLikeThis", "...", "<=== IS SCARED", "heart palpittashuns"];

var bobRossMessage = ["SAVED", "RUINED", "SAVED", "RUINED", "CoolStoryBob"];


var emotes = [
    ["Kappa", "kappa.png"],
    ["WutFace", "wutface.png"],
    ["4Head", "4head.png"],
    ["CoolStoryBob", "bobross.png"],
    ["DansGame", "dansgame.png"],
    ["NotLikeThis", "notlikethis.png"],
    ["PogChamp", "pogchamp.png"]
];


var spamSpeed = 1200;




//is called automatically when the html page is loaded
function init()
{
    makeSettings();
    toggleSettings();
    spam();
}


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
    var message = $('<p></p>');
    message.attr("class", "chatMessage");
    message.append(getUserName());
    message.append(": ");

    var msgBody = "";
    
    if(spamType=="positive")
        msgBody = (positiveMessages[Math.floor(Math.random()*positiveMessages.length)]);
    else if(spamType=="negative")
        msgBody = (negativeMessages[Math.floor(Math.random()*negativeMessages.length)]);
    else if(spamType=="scared")
        msgBody = (scaredMessages[Math.floor(Math.random()*scaredMessages.length)]);
	else if(spamType=="bobross")
        msgBody = (bobRossMessage[Math.floor(Math.random()*bobRossMessage.length)]);

    msgBody = replace_emotes(msgBody);

    message.append(msgBody);

    return message;
}


function replace_emotes(message)
{
    for(var i=0;i<emotes.length;i++){
        message = message.replace(new RegExp(emotes[i][0], 'g'), "<img src='pics/emotes/"+emotes[i][1]+"' alt='"+emotes[i][0]+"'>");
    }

    return message;
}


//returns a random username
function getUserName()
{
    var username = $('<span></span>');
    username.attr("class", "username");
    username.css("color", getUsernameColor());
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

//writes the text of the input field into the chat with a random username
function chat()
{    
    var textfield = $("#textfield");
    var element = $("#chattext");
    
    if(textfield.val()!="")
    {
        var message = $('<p></p>');
        message.attr("class", "chatMessage");
        message.append(getUserName());
        message.append(": ");

        var msgBody = textfield.val();
        msgBody = replace_emotes(msgBody);

        message.append(msgBody);
    
        textfield.val("");
    
        element.append(message);
        scrollToBottom();
        cutTopOfChat();
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



//scrolls to the bottom of the chat
function scrollToBottom()
{
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;
}

//checks to see if the chat is too long and cuts the top elements if it is
function cutTopOfChat()
{
    var element = $("#chattext");
    if(element.children().length > 170)
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
        chat.css("background-color", "black");
        $("#textfield").css("background-color", "black");
        $("#textfield").css("color", "white");
        $("#chattext").removeAttr("class");
    }
    else
    {
        darkMode = true;
        chat.css("color", "white");
        chat.css("background-color", "#1e1e1e");
        $("#textfield").css("background-color", "#141414");
        $("#textfield").css("color", "white");
        $("#chattext").attr("class", "dark");
    }
}


//makes a "settings" box
function makeSettings()
{
    $("#settingsButton").css("background-color", "#4b2f7f");
        
    var settings = $('<div></div>');
    settings.attr("id", "settings");
        
        
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
    var bobRossSpam = $('<option></option>');
    bobRossSpam.attr("value", "bobross");
    bobRossSpam.append("Bob Ross");
    
    selectSpam.append(positiveSpam);
    selectSpam.append(negativeSpam);
    selectSpam.append(scaredSpam);	
    selectSpam.append(bobRossSpam);
    
    
    var selectSpeed = $('<input></input>');
    selectSpeed.attr("type", "range");
    selectSpeed.attr("id", "selectspeed");
    selectSpeed.attr("onchange", "chooseSpeed()");
    
    settings.append($('<h3></h3>').append("type of spam"));
    settings.append(selectSpam);
    settings.append($('<h3></h3>').append("speed"));
    settings.append(selectSpeed);    
    settings.append("<br>");
    settings.append("<br>");
    settings.append(spamButton);
    settings.append("<br>");
    settings.append(clearButton);
    settings.append("<br>");
    settings.append(darkModeButton);
    
    var chat = $("#chat");
    chat.append(settings);
}

//shows or hides the chat
function toggleSettings()
{
    $("#settings").toggle();
    
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

//sets the speed from the input in the settings
function chooseSpeed()
{
    var val = $("#selectspeed").val();
    spamSpeed = 2200 - (20 * val);
}


function getVideo()
{
	
/*     var link  = $("#youtubelink").val();
    link = link.replace("watch?v=", "embed/");
    link = link + "?autoplay=1";
    
    var notChat = $("#notchat");
    notChat.empty();
    
    var video = $('<iframe></iframe>');
    video.attr("src", link);
    video.attr("id", "ytplayer");
    video.attr("type", "text/html");
    video.attr("frameborder", "0");
    video.attr("width", "100%");
    video.attr("height", "100%");
	video.attr("autoplay", 1);
    video.css("z-index", "100");
    
    var errormsg = $('<p></p>');
    errormsg.append("can't see the video?");
    errormsg.append("<p></p>");
    errormsg.append("write a full youtube link with the form: https://www.youtube.com/watch?v=[VIDEO CODE HERE]");
    errormsg.attr("id", "errormsg");
    
    notChat.append(errormsg);
    notChat.append(video); */
}


var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('notchat', {
        // width: 600,
        // height: 400,
		
		
        videoId: 'GJaAxD6JRsw',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g',
			enablejsapi: 1,
			autoplay: 1,
            loop: 0,
            controls: 0,
            showinfo: 0,
            autohide: 1,
			modestbranding: 1,
			rel: 1,
			showinfo: 0,
			disablekb: 1,
            vq: 'hd1080'			
        },
        events: {
            onReady: initialize,
			onStateChange: onPlayerStateChange 
        }
    });
}

function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();
	
	// setIframeHeight();
	
    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}

function onPlayerStateChange(event) {
	player.playVideo();
/*     switch(event.data) {
          case 0:
            record('video ended');
            break;
          case 1:
            record('video playing from '+player.getCurrentTime());
            break;
          case 2:
            record('video paused at '+player.getCurrentTime());
    } */
}


// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
/*     $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() )); */
}

function formatTime(time){
/*     time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds; */
}

// progress bar
$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
/*     $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100); */
}



//gives the user an input field to change the name of the channel
function changeChannel()
{
    $("#abovechat").empty();
    var form = $('<form></form>');
    form.attr("onsubmit", "return false");
    
    var input = $('<input></input>');
    input.attr("type", "text");
    input.attr("placeholder", "channel name");
    input.attr("id", "channelnameinput");
    
    //<input type="submit" id="videoButton" onClick="getVideo()" value="get video" onKeyPress="checkForEnter(event)">
    var button = $('<input></input>');
    button.attr("type", "submit");
    button.attr("onClick", "setChannelName()");
    button.attr("value", "set");
    
    form.append(input);
    form.append(button);
    $("#abovechat").append(form);
}

function setChannelName()
{
    var name = $("#channelnameinput").val();
    $("#abovechat").empty();
    var channelname = $('<p></p>');
    channelname.attr("onclick", "changeChannel()");
    channelname.attr("id", "channelname");
    channelname.append(name);
    $("#abovechat").append(channelname);
}
