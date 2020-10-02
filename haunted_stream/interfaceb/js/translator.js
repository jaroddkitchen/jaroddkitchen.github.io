var wikiChange;

function globalWikiReplace(){
	let myFirstPromise = new Promise( (resolve, reject) => {
		wikiChange = wikiText
		
		//HTML tags
		wikiText = wikiText.replace(/\s*\(.*?\)/g, "");
		wikiText = wikiText.replace(/\[\.*?\]/g, "");	
		wikiText = wikiText.replace(/<(?:.|\n)*?>/gm, '');		
		
		//abbreviations
		wikiChange = wikiText.replace(/a+\.k+\.a+\./gm, "a-k-a");
		wikiChange = wikiText.replace(/no+\./gi, "#");

		// var abbrevWiki = wikiText.replace(/[a-zA-Z]+\.+\s[a-zA-Z]+\.+\s|[a-zA-Z]+\.+[a-zA-Z]+\.+\s/gm, function(match) {
		 // return match.split(".").join("");
		// });
		var abbrevWiki = wikiText.replace(/[A-Z]+\./gm, function(match) {
		 return match.split(".").join("");
		});		
		wikiChange = abbrevWiki;
		
		//wikiChange = wikiText.replace(/[a-zA-Z]+\.+\s[a-zA-Z]+\.+\s/gm, ""); // J. K. 
		//wikiChange = wikiText.replace(/[a-zA-Z]+\.+[a-zA-Z]+\.+\s/gm, ""); // J.K.
		
		//wikiChange = wikiChange.replace(new RegExp(emotes[i][0], 'g'), "<img src='../img/emotes/"+emotes[i][1]+"' class='emoticon' alt='"+emotes[i][0]+"		
		

		//honorifics
		wikiText = wikiText.replace(/Mrs+\./gm, "Missus");
		wikiText = wikiText.replace(/Mr+\./gm, "Mister");
		wikiText = wikiText.replace(/Ms+\./gm, "Miss");
		wikiText = wikiText.replace(/Sr+\./gm, "Senior");
		wikiText = wikiText.replace(/Jr+\./gm, "Junior");
		wikiText = wikiText.replace(/Dr+\./gm, "Doctor");
		wikiText = wikiText.replace(/Prof+\./gm, "Professor");
		wikiText = wikiText.replace(/Rev+\./gm, "Reverend");
		wikiText = wikiText.replace(/Fr+\./gm, "Father");
		wikiText = wikiText.replace(/Pr+\./gm, "Pastor");
		wikiText = wikiText.replace(/Esq+\./gm, "Esquire");
		wikiText = wikiText.replace(/Hon+\./gm, "Honorable");
		wikiText = wikiText.replace(/Gen+\./gm, "General");
		wikiText = wikiText.replace(/Adm+\./gm, "Admiral");
		wikiText = wikiText.replace(/Col+\./gm, "Colonel");
		wikiText = wikiText.replace(/Maj+\./gm, "Major");	
		wikiText = wikiText.replace(/Cpt+\./gm, "Captain");
		wikiText = wikiText.replace(/Lt+\./gm, "Lieutenant");
		wikiText = wikiText.replace(/Sgt+\./gm, "Sergeant");
		wikiText = wikiText.replace(/Cpl+\./gm, "Corporal");
		wikiText = wikiText.replace(/Pvt+\./gm, "Private");			
		
		resolve(wikiChange);
	} );	
}


/* function replaceHonorifics(){
	wikiText = wikiText.replace(/Mrs+\./gm, "Missus");
	wikiText = wikiText.replace(/Mr+\./gm, "Mister");
	wikiText = wikiText.replace(/Ms+\./gm, "Miss");
	wikiText = wikiText.replace(/Sr+\./gm, "Senior");
	wikiText = wikiText.replace(/Jr+\./gm, "Junior");
	wikiText = wikiText.replace(/Dr+\./gm, "Doctor");
	wikiText = wikiText.replace(/Prof+\./gm, "Professor");
	wikiText = wikiText.replace(/Rev+\./gm, "Reverend");
	wikiText = wikiText.replace(/Fr+\./gm, "Father");
	wikiText = wikiText.replace(/Pr+\./gm, "Pastor");
	wikiText = wikiText.replace(/Esq+\./gm, "Esquire");
	wikiText = wikiText.replace(/Hon+\./gm, "Honorable");
	wikiText = wikiText.replace(/Gen+\./gm, "General");
	wikiText = wikiText.replace(/Adm+\./gm, "Admiral");
	wikiText = wikiText.replace(/Col+\./gm, "Colonel");
	wikiText = wikiText.replace(/Maj+\./gm, "Major");	
	wikiText = wikiText.replace(/Cpt+\./gm, "Captain");
	wikiText = wikiText.replace(/Lt+\./gm, "Lieutenant");
	wikiText = wikiText.replace(/Sgt+\./gm, "Sergeant");
	wikiText = wikiText.replace(/Cpl+\./gm, "Corporal");
	wikiText = wikiText.replace(/Pvt+\./gm, "Private");	
} */