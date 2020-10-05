//----------------------------------------------------
// Timed Event Objects	
//----------------------------------------------------

// summon_Layer(layernum, layertype, bckcolor, bckimg, speedin, speedout, alpha, timeout)
// summon_Sound(snd, snd_plyr, speedin, speedout, vol, pbr, timeout)
// summon_Apparition(speed, scale, timeout)
// summon_dChat(array, mem, mood, mask, speed, timeout)


var timedEvents = [
	[false,  2,	"HelloWorld",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 500, 500, 0.35, 2000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 500, 500, 0.35, 2000)},		
		// function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 90000)},
		// function(){summon_Sound('music/Ice_Demon.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		function(){summon_Sound('fx/static.mp3', 1, 500, 500, 0.025, 1.0, 90000)},
		function(){summon_dChat(HelloWorld, null, "vicious", null, 2000, 1)}
		]
	],
	[true,  2,	"LetsBeFriends",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.5, 900000)},		
		function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 900000)},
		function(){summon_Sound('fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		//function(){summon_Sound('music/Ice_Demon.mp3', 2, 4000, 2000, 0.025, 1.0, 900000)},
		function(){summon_dChat(LetsBeFriends, null, "vicious", "kiddiebubble", 10, 90)}
		]
	],
	
	[false, 17,	0,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.35, 90000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.35, 90000)},		
		function(){summon_Apparition(10, 1, 90000)},	
		function(){summon_dChat(HelloWorld, null, "vicious", "chalkbubble", 500, 20000)},		
		] 
	],		
	[false, 35,	1,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 8000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 3000, 3000, 0.5, 8000)},		
		function(){summon_Apparition(10, 1, 90000)},
		function(){summon_dChat(JarodSucks, null, "vicious", "chalkbubble", 1000, 8000)}
		]
	],
	[false, 55,	1,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 8000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 3000, 3000, 0.5, 8000)},		
		function(){summon_Apparition(8000)},
		function(){summon_dChat(ThePictureGame, null, "vicious", "chalkbubble", 1000, 8000)}
		]
	],		
];

var pastEvents = [];

//----------------------------------------------------
// Demon Interactions
//----------------------------------------------------

////////////////////////
var HelloWorld =
[
		// Node 0
		["hello world!",
			[ function(){banish_dChat()} ]
		]
]
HelloWorld.name = "Hello World!";
HelloWorld.type = "conversation";
HelloWorld.exit = "banishAll";
//HelloWorld.exit = "none";


var LetsBeFriends =
[
		// Node 0
		[		
			//	Context node
			//	[type of question, list of contextual words ('!' removes word from context,'null' turns off wiki response engine)]
			["yes or no", ""],
			"hay, i can see you","im right over here ------>","do you wanna be my friend?",
			[ 
				// Response Nodes
				// [action word (after translation)],[result functions]
				["ACCEPT",
					[function(){dJumpToDialogueNode(3, false, true)}]
				],
				["DECLINE",
					[function(){dJumpToDialogueNode(2, false, true)},
					//function(){summon_Apparition(10, 1, 90000)},
					]
				],
				["MAYBE",
					[function(){dJumpToDialogueNode(1, false, true)}]
				]
			]
		],
		// Node 1		
		[
			["yes or no", ""],
			"thats not a grate answer", "in fact that answers a peace of shit, just like u r ha ha ha", "lets try this aggen shall we?",
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		[
			["yes or no", ""],		
			"that sux", "im a grate one to b frends with", "a true blew american hero ", "maybe i can make u change ur mind sum day",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		[
		["yes or no", ""],		
		"fantastik", "were gonna be GRATE 2gether, me and u", "jus like batman n robbin", "bogy n bacall", "ham n eggs", "kids n cancer",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 4		
		[
			["wikiSearch", "film"],
			"hay i gotta nother question 4u","whats the name of ur favorit movie?",
			[
				["wikiSearch", "film"],
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(5, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(6, false, true)}]
				],
				["",
					[]
				]				
			]
		],
		// Node 5
		[
			["wikiSearch", "film"],
			"yea i seen that one", "im vry culteruld", "eye seen evry movie evr made", "red all the books 2", "well I gotta be going now, chosen one", "ill check you ltr", "bye 4 now",
			[ function(){banish_dChat()} ]
		],
		// Node 6
		[
			["wikiSearch", "film"],
			"hmmm. i dont know that one", "maybe you misspelt it. like a dum ass", "try aggin or name a different one.",
			[ function(){dJumpToDialogueNode(4, true, false)} ]
		],
		// Node 7
		[
			["wikiSearch", "film"],		
			"but we ain't talkin abowt " + wikiSubjCat + ". were talkin abowt " + dContextStr, "lets try this aggin",
			[ function(){dJumpToDialogueNode(4, true, false)} ]
		],		
		// Node 8
		[
			["yes or no", ""],
			"so thats how you wanna play it", "the strong silent type", "ok kiddo. be that way", "you will regret this",
			[ function(){banish_allLayers(2000)}, function(){banish_allSounds(2000)} ]
		],
		// Variable Node
		[
			//[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		]		
];
LetsBeFriends.name = "Let's Be Friends!";
LetsBeFriends.type = "conversation";
LetsBeFriends.exit = "banishAll";
//HelloWorld.exit = "none";


////////////////////////
var ThePictureGame =
[
	["im bored","lets play a game","if you win, i will loan you a gift","if you lose, you get...", "well", "lets just call it a little surprise", "r u reddy to play?"],  
	["fantastic"]
];
	ThePictureGame.name = "The Picture Game";
	ThePictureGame.type = "conversation";
	ThePictureGame.exit = "none";

////////////////////////
var JarodSucks =
[
	["im not a big fan of you-know-who","too arrogant for my tastss","im sure hes been bragging about this thing for weeks","taking all the credit","did he ever tell you his virus theory. all that shit about &quot;housecats&quot;?", "bet he did"]
];
	JarodSucks.name = "My Creator Sucks";
	JarodSucks.type = "rant";
	JarodSucks.exit = "none";

////////////////////////
var Randomness =
[
	[""]
];	
	Randomness.name = "Randomness";
	Randomness.type = "random";
	Randomness.exit = "banishAll";