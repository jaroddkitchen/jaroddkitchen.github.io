//----------------------------------------------------
// Timed Event Objects	
//----------------------------------------------------

// summon_Layer(layernum, layertype, bckcolor, bckimg, speedin, speedout, alpha, timeout)
// summon_Sound(snd, snd_plyr, vol, pbr, timeout)
// summon_Apparition(speed, scale, timeout)
// summon_dChat(array, mem, mood, speed, timeout)


var timedEvents = [
	[true,  2,	"HelloWorld",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 90000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.5, 90000)},		
		// function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 90000)},
		// function(){summon_Sound('music/Ice_Demon.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		function(){summon_dChat(HelloWorld, null, "vicious", 700, 90000)}
		]
	],	
	[false, 17,	0,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.35, 90000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.35, 90000)},		
		function(){summon_Apparition(10, 1, 90000)},	
		function(){summon_dChat(HelloWorld, null, "vicious", 500, 20000)},		
		] 
	],		
	[false, 35,	1,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 8000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 3000, 3000, 0.5, 8000)},		
		function(){summon_Apparition(10, 1, 90000)},
		function(){summon_dChat(JarodSucks, null, "vicious", 1000, 8000)}
		]
	],
	[false, 55,	1,
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 8000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 3000, 3000, 0.5, 8000)},		
		function(){summon_Apparition(8000)},
		function(){summon_dChat(ThePictureGame, null, "vicious", 1000, 8000)}
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
		["hello world","i can see you","im right over here ------>","do you wanna be my friend?",
			[ 
				//	Context node
				//	[
				//		type of question,
				// 		list of contextual words ('!' removes word from context,'null' turns off wiki response engine)
				//	]
				[
				"yes or no",
				""
				],
				
				// Response Nodes
				// [action word (after translation)],[result functions]
				["ACCEPT",
					[function(){dJumpToDialogueNode(3, false, true)}]
				],
				["DECLINE",
					[function(){summon_Apparition(10, 1, 90000)},function(){dJumpToDialogueNode(2, false, true)}]
				],
				["MAYBE",
					[function(){dJumpToDialogueNode(1, false, true)}]
				]
			]
		],
		// Node 1		
		["thats not a grate answer", "in fact that answers a peace of shit, just like u r ha ha ha", "lets try this aggen shall we?",
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		["that sux", "im a grate one to b frends with", "a true blew american hero ", "maybe i can make u change ur mind sum day",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		["fantastik", "were gonna be GRATE 2gether, me and u", "jus like batman n robin, bogey n bacall, ham n eggs, kids n cancer",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 4		
		["hay i gotta nother question 4u","whats the name of ur favorit movie?",
			[
				["wikiSearch", "film movie"],	
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(5, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(6, false, true)}]
				]
			]
		],
		// Node 5
		["yea i seen that one", "im vry culteruld", "eye seen evry movie evr made", "red all the books 2", "well I gotta be going now, chosen one", "ill check you ltr", "bye 4 now",
			[ function(){banish_dChat()} ]
		],
		// Node 6
		["hmmm. i dont know that one", "maybe you misspelt it. like a dum ass", "try aggin or name a different one.",
			[ function(){dJumpToDialogueNode(4, true, false)} ]
		],
		// Node 7
		["so thats how you wanna play it", "the strong silent type", "ok kiddo. be that way", "you will regret this",
			[ function(){banish_allLayers(2000)}, function(){banish_allSounds(2000)} ]
		],
		// Variable Node
		[
			//[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		]		
];
	HelloWorld.name = "Hello World!";
	HelloWorld.type = "conversation";
	HelloWorld.exit = "banishAll";
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