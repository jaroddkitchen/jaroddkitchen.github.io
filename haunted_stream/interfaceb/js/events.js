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
		function(){summon_dChat(HelloWorld, null, "vicious", 500, 90000)}
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
		["hello world","i can see you","im right over here ------>","i wanna meet you","do you wanna meet me?",
			[ 
				//	Context node
				//	[
				//		type of question,
				// 		list of contextual words ('!' removes word from context,'null' turns off wiki response engine)
				//	]
				[
				"yes or no",
				"darkness evil terror"
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
		["thats not a grate answer", "in fact that answers a peace of shit. just like u r", "lets try this aggen shall we?",
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(0, true, false)},			
			]
		],
		// Node 2		
		["that sux", "im a grate one to meet", "a true blew american hero. ", "maybe i will meet u sum day, anyway",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		["fantastic", "but im not rdy to meet u", " not yet anywy", "may be ur not rdy 2", "i will keep it in mind tho",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 4		
		["hay i gotta nother question","whats the name of ur favorit movie?",
			[
				["wikiSearch", "film movie"],	
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(5, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(6, true, true)}]
				]
			]
		],
		// Node 5
		["yea i seen that one", "im vry culteruld", "eye seen evry movie evr made", "red all the books too", "well I gotta be going now, chosen one", "ill check you ltr", "bye 4 now",
			[ function(){banish_dChat()} ]
		],
		// Node 6
		["hmmm. i dont know that one", "maybe you misspelt it. like a dum ass", "try aggin or name a different one.",
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],		
		// Node 7
		["so thats how you wanna play it", "the strong silent type", "ok kiddo. be that way", "you will regret this",
			[ function(){banish_allLayers(2000)}, function(){banish_allSounds(2000)} ]
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