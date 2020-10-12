//----------------------------------------------------
// Timed Event Objects	
//----------------------------------------------------

// summon_Layer(layernum, layertype, bckcolor, bckimg, repeat, speedin, speedout, alpha, timeout, imgW, imgH, imgX, imgY)
// summon_Sound(snd, snd_plyr, speedin, speedout, vol, pbr, timeout)
// summon_Apparition(speed, scale, timeout)
// summon_dChat(array, mem, mood, mask, speed, timeout)


var timedEvents = [
	[false,  1,	"HelloWorld",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 500, 500, 0.35, 2000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", "repeat", 500, 500, 0.35, 2000)},
		function(){summon_Sound('../snd/fx/static.mp3', 1, 500, 500, 0.025, 1.0, 90000)},
		function(){summon_dChat(HelloWorld, null, "vicious", null, 1, 2)}
		]
	],
	[false, 2, "DungeonAndDragon",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", "repeat", 3000, 3000, 0.5, 900000)},	
		function(){summon_Sound('../snd/music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.025, 0.5, 900000)},
		function(){summon_Sound('../snd/fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		function(){summon_dChat(DungeonAndDragon, null, "vicious", "kiddiebubble", 5, 2000)}
		]
	],	
	[true,  3,	"LetsBeFriends",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", "repeat", 3000, 3000, 0.5, 900000)},			
		function(){summon_Sound('../snd/music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.025, 0.5, 900000)},
		function(){summon_Sound('../snd/fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		function(){summon_dChat(LetsBeFriends, null, "vicious", "kiddiebubble", 2, 900)}
		]
	],
	
	[false,	10, "JarodSucks",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", "repeat", 3000, 3000, 0.5, 900000)},			
		function(){summon_Sound('../snd/music/twinkle_twinkle.mp3', 0, 4000, 2000, 0.05, 0.5, 900000)},
		function(){summon_Sound('../snd/fx/static.mp3', 1, 4000, 2000, 0.025, 1.0, 90000)},
		//function(){summon_Sound('music/Ice_Demon.mp3', 2, 4000, 2000, 0.025, 1.0, 900000)},
		function(){summon_dChat(JarodSucks, null, "vicious", "kiddiebubble", 2, 900)}	
		] 
	],
	[false, 55,	"ThePictureGame",
		[
		function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.5, 900000)},
		function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static.gif", "repeat", 3000, 3000, 0.5, 900000)},		
		function(){summon_Apparition(8000)},
		function(){summon_dChat(ThePictureGame, null, "vicious", "chalkbubble", 1000, 8000)}
		]
	],		
];

var pastEvents = [];

//----------------------------------------------------
// Demon Interactions
//----------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var LetsBeFriends =
[
		// Node 0
		[		
			//	Context node
			//	[type of question, list of contextual words ('!' removes word from context,'null' turns off wiki response engine)]
			["multiple choice", "", "", true],
			["hay!  i can see you _smile_big"], ["im right over here ------>"], ["do you wanna be my friend?"],
			[ 
				// Response Nodes
				// [action word (after translation)],[result functions]
				["ACCEPT",
					[function(){dJumpToDialogueNode(3, false, true)}]
				],
				["DECLINE",
					[function(){dJumpToDialogueNode(2, false, true)}]
				],
				["MAYBE",
					[function(){dJumpToDialogueNode(1, false, true)}]
				]
			]
		],
		// Node 1		
		[
			["multiple choice", "", "", true],
			["thats not a grate answer"], ["in fact that answers a peace of crap, just like u r _lol_face_lol_face_lol_face"], ["lets try this aggen shall we?"],
			[
			// summon_Layer(layernum, layertype, bckcolor, bckimg, repeat, speedin, speedout, alpha, timeout, imgW, imgH, imgX, imgY)
				function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", "repeat", 2000, 2000, 0.5, 90000)},			
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		[
			["multiple choice", "", "", true],		
			["that sux _frown_face", function(){dReMask(null)}],
			["im a grate one to b frends with",
				function(){summon_Sound('../snd/music/horror_buzz.mp3', 2, 250, 1500, 0.25, 2.0, 2500)},
				function(){summon_Layer(2, "background-image hidden", "transparent", "../img/pics/girlcry2.gif", "no-repeat", 500, 1000, 0.4, 1200)}, 
				function(){dReMask(dInitMask)} ],	
			["a troo blew american hero!"], ["maybe i can make u change ur mind Sum Day _tongue_winking"],
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		[
			["multiple choice", "", "", true],	
			["fantastik"], ["were gonna be GRATE 2gether, me and u",
				function(){summon_Sound('../snd/fx/car_meow_funny.mp3', 2, 250, 2500, 0.25, 0.75, 3000)},
				function(){summon_Layer(2, "background-image hidden", "transparent", "../img/pics/cool_cat.gif", "round", 750, 750, 0.75, 1250)} ],
			["jus like batman n robbin"],
			["ham n eggs",
				function(){dReMask(null)}],
			["Children and chainsaws."],
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
			["wikiSearch", "color", " ", false],
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
			["multiple choice", "", "", false],
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var JarodSucks =
[
		// Node 0
		[	
			["multiple choice", "", "", true],
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
			["multiple choice", " ", "", true],
			["that answer sux _eyeroll_face _thumbs_down"], ["Make Answers Grate Aggen! _lol_face_lol_face_lol_face"], ["lissen bettr this time"],
			[
				function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 0.75, 90000)},
				function(){summon_Layer(1, "background-pattern hidden", "transparent", "../img/fx/static_2.gif", "repeat", 2000, 2000, 0.5, 90000)},			
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
			["multiple choice", "", "", false],
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








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DungeonAndDragon =
[
		// Node 0
		[		
			["multiple choice", "", "", true],
			["games r fun! lets play a game!!!"], ["lets play Dunjuns and Dragons"], ["you can be the brave hero, and ill be the all-knowing dunjun master"], ["ru reddy?",
			function(){ banish_allSounds(2000)} ],
			["ok, here we go", function(){dReMask("dungeonbubble")}],
			["You are in a dungeon.",
			//summon_Layer(layernum, layertype, bckcolor, bckimg, repeat, speedin, speedout, alpha, timeout, imgW, imgH, imgX, imgY)
			function(){summon_Layer(0, "colorbox hidden", "black", null, "no-repeat", 3000, 3000, 1.0, 90000)},
			function(){summon_Layer(2, "background-image hidden", "transparent", "../img/pics/dungeon_px.gif", "no-repeat", 2500, 1500, 0.5, 90000, "100vw", "100vh", "0vw", "0vw")}, function(){banish_Layer(1, 1500)} ],
			["You see a dragon.",
			function(){summon_Layer(3, "background-image hidden", "transparent", "../img/pics/dragon_shadow_px.gif", "no-repeat", 2500, 1500, 0.35, 90000, "40vw", "50vh", "30vw", "25vh")} ],
			["What will you do?"],
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
			["multiple choice", "", "", true],
			["thats not a grate answer"], ["in fact that answers a peace of crap, just like u r ha ha ha"], ["lets try this aggen shall we?"],
			[		
				function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)},			
			]
		],
		// Node 2		
		[
			["multiple choice", "", "", true],		
			["that sux _frown_face", function(){dReMask(null)}],
			["im a grate one to b frends with",
				function(){summon_Sound('../snd/music/horror_buzz.mp3', 2, 250, 1500, 0.25, 2.0, 2500)},
				function(){summon_Layer(2, "background-image hidden", "transparent", "../img/pics/girlcry2.gif", "no-repeat", 500, 1000, 0.4, 1200)}, 
				function(){dReMask(dInitMask)} ],	
			["a troo blew american hero!"], ["maybe i can make u change ur mind Sum Day _tongue_winking"],
			[ function(){dJumpToDialogueNode(4, true, true)} ]
		],
		// Node 3		
		[
			["multiple choice", "", "", true],	
			["The dragon showers you in flames.",
				function(){summon_Sound('../snd/fx/dragon_growl_flame.mp3', 2, 0, 500, 0.45, 0.75, 3000)},
				function(){summon_Layer(4, "background-image hidden", "transparent", "../img/pics/dragon_fire_px.gif", "no-repeat", 500, 1500, 0.35, 90000, "40vw", "50vh", "30vw", "25vh")}, 
				function(){banish_Layer(3, 500)},
				function(){summon_Layer(5, "colorbox hidden", "orange", null, "no-repeat", 250, 1000, 1.0, 500)} ],
			["You try to shield your eyes from the furnace of the monster's throat.",
				function(){banish_Layer(2, 1000)}, function(){banish_Layer(4, 1000)} ],
			["But when you open them again, you discover several new truths about yourself.", 
				function(){dReMask(null)} ],
			["<b>You are blind.</b>", function(){hide_dChat()} ],
			["Your eyes, the ones that everyone called your mother's eyes, are gone. You can feel their  remnants sliding down your cheeks like fullsome tears."],
			["<b>Your throat is charred<b/>."],
			["Every breath you take feels like a fresh and unbearable form of torture."],
			["You realize that from this moment until your last one, the simple act of living will be unbearable."], 
			["Somewhere in the darkness, the dragon unleashes a second fireball upon you.",
				function(){summon_Layer(5, "colorbox hidden", "red", null, "no-repeat", 250, 1000, 0.75, 500)},
				function(){summon_Sound('../snd/fx/dragon_growl_flame.mp3', 2, 500, 500, 0.25, 0.5, 3000)} ],
			["You can't see it, of course.<p>But you can feel it.<p>And you smell it."],
			["Blending with the ash and sulfur is the scent of your own ruin.<p>You can smell all of God's tender gifts cook inside your armored shell. As the flesh blisters and sizzles, you can feel their functions slip away forever."],
			["Your fingers become the dead branches of scorched trees.<p>You know you will never hold a thing again."],
			["Your genitals and bowels fuse into a shapeless glob of grease and sludge.<p>You know you will never love or loathe a thing again."],
			["Your brains bubble within the saucepan of your skull.<p>You begin to stop knowing things about yourself and your world."],
			["You try to remember your name."],
			["But it is gone."],
			["You try to conjure the faces of loved ones."],
			["But they are gone."],
			["Words begin to vanish one by one, scrubbed from dictionaries by wrathful hands.<p>Eventually, language itself is burned away. All that remains are like particles of dust, blown apart and scattered in the wake of an apocalyptic storm."],
			["Whatever is left of you snatches one of these up and inspects it, like a thief appraising a stolen jewel."],
			["There is a word etched upon its surface, too small to read."],
			["But the Thing That Was You is also getting smaller. Shrinking and shriveling like the body that once held it."],
			["And so the word appears to loom ever larger, dangling in the black, eternal miles ahead."],
			["And then..."],
			["like all else that has ever been or will ever be..."],
			["like all that never was and won't be..."],
			["it disappears."], 
			["The End", function(){dReMask(dInitMask)}],
			["i guess that didn't go so well 4 u! _tongue_winking"], ["o well. maybe u can try aggen sum day."],
			[ function(){dJumpToDialogueNode(4, false, true)} ]
		],		
		// Node 4
		[
			["wikiSearch", "", "", false],
			["well I gotta be going now, chosen one"], ["ill check you ltr"], ["bye 4 now"],
			[ function(){banish_dChat()} ]
		],		
		// Node 5
		[
			["multiple choice", "", "", false],
			["so thats how you wanna play it"], ["the strong silent type"], ["ok kiddo. be that way"], ["you will regret this"],
			[ function(){banish_dChat()} ]
		],
		// Variable Node
		[
			//[ function(){dJumpToDialogueNode(dPrevDialogueNode, true, false)} ]
		]		
];
DungeonAndDragon.name = "Dungeon and Dragon";
DungeonAndDragon.type = "conversation";
DungeonAndDragon.exit = "banishAll";










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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