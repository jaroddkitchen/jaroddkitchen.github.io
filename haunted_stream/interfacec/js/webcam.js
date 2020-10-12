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
			//vidJumpToTime(keytimes[pos]);
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
	if (webcamvideo.currentTime >= 43.5)
	{
		if ($("#response").length === 0) {
			webcamvideo.currentTime = 36.5;
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