//----------------------------------------------------
// Timed Event Objects	
//----------------------------------------------------

// summon_Layer(layernum, layertype, bckcolor, bckimg, speedin, speedout, alpha, timeout)
// summon_Sound(snd, snd_plyr, speedin, speedout, vol, pbr, timeout)
// summon_Apparition(speed, scale, timeout)
// summon_dChat(array, mem, mood, mask, speed, timeout)


var timedEvents = [
	[false,  1,	"HelloWorld",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 500, 500, 0.35, 2000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 500, 500, 0.35, 2000)},		
		// function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 90000)},
		// function(){summon_Sound('music/Ice_Demon.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		function(){summon_Sound('fx/static.mp3', 1, 500, 500, 0.025, 1.0, 90000)},
		function(){summon_dChat(HelloWorld, null, "vicious", null, 1, 2)}
		]
	],
	[true,  1,	"LetsBeFriends",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.5, 900000)},		
		function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 900000)},
		function(){summon_Sound('fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		//function(){summon_Sound('music/Ice_Demon.mp3', 2, 4000, 2000, 0.025, 1.0, 900000)},
		function(){summon_dChat(LetsBeFriends, null, "vicious", "kiddiebubble", 2, 900)}
		]
	],
	
	[false,	2, "JarodSucks",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", 3000, 3000, 0.5, 900000)},		
		function(){summon_Sound('music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 900000)},
		function(){summon_Sound('fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		//function(){summon_Sound('music/Ice_Demon.mp3', 2, 4000, 2000, 0.025, 1.0, 900000)},
		function(){summon_dChat(JarodSucks, null, "vicious", "kiddiebubble", 2, 900)}	
		] 
	],		
	[false, 35,	1, "",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.5, 8000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 3000, 3000, 0.5, 8000)},		
		function(){summon_Apparition(10, 1, 90000)},
		function(){summon_dChat(JarodSucks, null, "vicious", "chalkbubble", 1000, 8000)}
		]
	],
	[false, 55,	1, "ThePictureGame",
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
			["yes or no", "", "", true],
			["hay, i can see you"], ["im right over here ------>"], ["do you wanna be my friend?"],
			[ 
				// Response Nodes
				// [action word (after translation)],[result functions]
				["ACCEPT",
					[function(){dJumpToDialogueNode(6, false, true)}]
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
			["yes or no", "", "", true],
			["thats not a grate answer"], ["in fact that answers a peace of crap, just like u r ha ha ha"], ["lets try this aggen shall we?"],
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		[
			["yes or no", "", "", true],		
			["that sux"], ["im a grate one to b frends with"], ["a true blew american hero"], ["maybe i can make u change ur mind Sum Day _tongue_winking"],
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		[
			["yes or no", "", "", true],	
			["fantastik"], ["were gonna be GRATE 2gether, me and u"], ["jus like batman n robbin"], ["ham n eggs", function(){dReMask(null)}], ["Children and chainsaws."],
			[ function(){dReMask(dInitMask)}, function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 4		
		[
			["wikiSearch", "film", "", true],
			["hay i gotta nother question 4u"], ["whats the name of ur favorit movie?"],
			[
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(5, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(8, false, true)}]
				],
				["",
					[]
				]				
			]
		],	
		// Node 5
		[
			["wikiSearch", "", "", true],
			["yea i seen that one"], ["im vry cultruld"], ["eye seen evry muvie evr made"],
			[ function(){dJumpToDialogueNode(6, false, true)} ]
		],
		// Node 6		
		[
			["wikiSearch", "color", "!disease", false],
			["hay i gotta nother question 4u"], ["whats ur favorit color?"],
			[
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(7, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(8, false, true)}]
				],
				["",
					[]
				]	
			]
		],
		// Node 7
		[
			["wikiSearch", "", "", false],
			["mine too!"], ["small world amirite?"], ["see i knew we would b best freiends! _smile_big _tongue_winking"],
			[ function(){dJumpToDialogueNode(10, false, true)} ]
		],		
		// Node 8
		[
			["wikiSearch", "", "", false],
			["hmmm i dont know that one"], ["maybe you misspelt it"], ["try aggin or name a different one"],
			[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		],
		// Node 9
		[
			["wikiSearch", "", "", false],		
			["we aint talkin abowt " + wikiSubjCat + ". were talkin abowt " + dContextStr], ["lets try this aggin"],
			[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		],		
		// Node 10
		[
			["wikiSearch", "", "", false],
			["well I gotta be going now, chosen one"], ["ill check you ltr"], ["bye 4 now"],
			[ function(){banish_dChat()} ]
		],		
		// Node 11
		[
			["yes or no", "", "", false],
			["so thats how you wanna play it"], ["the strong silent type"], ["ok kiddo. be that way"], ["you will regret this"],
			[ function(){banish_dChat()} ]
		],
		// Variable Node
		[
			//[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		]		
];
LetsBeFriends.name = "Let's Be Friends!";
LetsBeFriends.type = "conversation";
LetsBeFriends.exit = "banishAll";



////////////////////////
var JarodSucks =
[
		// Node 0
		[	
			["yes or no", "", "", true],
			["hello, aggen!","im back an i look byootifull _smile_big_smile_big_smile_big"], ["gotta say im not a big fan of u-know-who"], ["he is 2 arrigant for my tayste"], ["im sure hes been braggin abowt me 4 weeks now. lik he wuz sum big creativ jeenius. gettin 2 big for his britchez, u ask me"], ["hay, did he evr tell u his hole virus theory?"],
			[ 
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
			["yes or no", " ", "", true],
			["that answer sux _eyeroll_face _thumbs_down"], ["Make Answers Grate Aggen! _lol_face_lol_face_lol_face"], ["lissen bettr this time"],
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		[
			["", "", "", true],		
			["its all about the scale, according to him"], ["a tiny one might give you a cough, or a sneeze or a belly ayche"], ["he thinks there r bigger, fancier ones out there."], ["lik a virus the size of a cat might give u a nitemare, or a hallucination"], ["or maybe make u wanna do something very bad"], 
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3
		[
			["", "", "", true],	
			["_rofl_face _rofl_face _rofl_face he goes on and on abowt it, lik a loonytick, right?"], ["lik hes got a frigging degree"], ["what a dork _tongue_winking"],
			[ function(){dJumpToDialogueNode(2, false, true)} ]
		],
		// Node 4		
		[
			["wikiSearch", "novel", "", true],
			["o that reminds me i wantit to axsk u something"], ["whats the name of ur favorit book?"],
			[
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(5, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(8, false, true)}]
				],
				["",
					[]
				]				
			]
		],	
		// Node 5
		[
			["wikiSearch", "", "", true],
			["yea i red that one"], ["im am the smartist 1 i know"], ["red all the books."],
			[ function(){dJumpToDialogueNode(6, false, true)} ]
		],
		// Node 6		
		[
			["wikiSearch", "song", "", true],
			["nother question 4 u"], ["whats ur favorit song?"],
			[
				["GOODSEARCH",
					[function(){dJumpToDialogueNode(7, false, true)}]
				],
				["BADSEARCH",
					[function(){dJumpToDialogueNode(8, false, true)}]
				],
				["",
					[]
				]	
			]
		],
		// Node 7
		[
			["wikiSearch", "", "", true],
			["that song ROCKS!!! _heart_full _heart_full _heart_full"], ["yeah thats my jam. i wuld play it for u, but weed get in trubble"], ["sumbody owns it i guess"],
			[ function(){dJumpToDialogueNode(10, false, true)} ]
		],		
		// Node 8
		[
			["wikiSearch", "", "", false],
			["hmmm i dont know that one"], ["maybe you misspelt it"], ["try aggin or name a different one"],
			[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		],
		// Node 9
		[
			["wikiSearch", "", "", false],		
			["but we aint talkin abowt " + wikiSubjCat + ". were talkin abowt " + dContextStr + "s"], ["lets try this aggin"],
			[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		],		
		// Node 10
		[
			["wikiSearch", "", "", false],
			["well I gotta be going now, chosen one"], ["ill check you ltr", "bye 4 now"],
			[ function(){banish_dChat()} ]
		],		
		// Node 11
		[
			["yes or no", "", "", false],
			["so thats how you wanna play it"], ["the strong silent type"], ["ok kiddo. be that way"], ["you will regret this"],
			[ function(){banish_dChat()} ]
		],
		// Variable Node
		[
			//[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		]		
];
	JarodSucks.name = "My Creator Sucks";
	JarodSucks.type = "conversation";
	JarodSucks.exit = "none";




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
var Randomness =
[
	[""]
];	
	Randomness.name = "Randomness";
	Randomness.type = "random";
	Randomness.exit = "banishAll";