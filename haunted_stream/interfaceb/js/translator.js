var wikiChange = "";

function globalWikiReplace(){
	let myFirstPromise = new Promise( (resolve, reject) => {
		wikiChange = wikiText;
		
		//HTML tags
		wikiChange = wikiChange.replace(/\s*\(.*?\)/g, "");
		wikiChange = wikiChange.replace(/\[\.*?\]/g, "");	
		wikiChange = wikiChange.replace(/<(?:.|\n)*?>/gm, '');		
		
		//abbreviations
		wikiChange = wikiChange.replace(/a+\.k+\.a+\./gm, "a-k-a");
		wikiChange = wikiChange.replace(/no+\./gi, "#");

		var abbrevWiki = wikiChange.replace(/[A-Z]+\./gm, function(match) {
		 return match.split(".").join("");
		});		
		wikiChange = abbrevWiki;
		
		//wikiChange = wikiChange.replace(/[a-zA-Z]+\.+\s[a-zA-Z]+\.+\s/gm, ""); // J. K. 
		//wikiChange = wikiChange.replace(/[a-zA-Z]+\.+[a-zA-Z]+\.+\s/gm, ""); // J.K.

		//honorifics
		wikiChange = wikiChange.replace(/Mrs+\./gm, "Missus");
		wikiChange = wikiChange.replace(/Mr+\./gm, "Mister");
		wikiChange = wikiChange.replace(/Ms+\./gm, "Miss");
		wikiChange = wikiChange.replace(/Sr+\./gm, "Senior");
		wikiChange = wikiChange.replace(/Jr+\./gm, "Junior");
		wikiChange = wikiChange.replace(/Dr+\./gm, "Doctor");
		wikiChange = wikiChange.replace(/Prof+\./gm, "Professor");
		wikiChange = wikiChange.replace(/Rev+\./gm, "Reverend");
		wikiChange = wikiChange.replace(/Fr+\./gm, "Father");
		wikiChange = wikiChange.replace(/Pr+\./gm, "Pastor");
		wikiChange = wikiChange.replace(/Esq+\./gm, "Esquire");
		wikiChange = wikiChange.replace(/Hon+\./gm, "Honorable");
		wikiChange = wikiChange.replace(/Gen+\./gm, "General");
		wikiChange = wikiChange.replace(/Adm+\./gm, "Admiral");
		wikiChange = wikiChange.replace(/Col+\./gm, "Colonel");
		wikiChange = wikiChange.replace(/Maj+\./gm, "Major");	
		wikiChange = wikiChange.replace(/Cpt+\./gm, "Captain");
		wikiChange = wikiChange.replace(/Lt+\./gm, "Lieutenant");
		wikiChange = wikiChange.replace(/Sgt+\./gm, "Sergeant");
		wikiChange = wikiChange.replace(/Cpl+\./gm, "Corporal");
		wikiChange = wikiChange.replace(/Pvt+\./gm, "Private");			
		
		resolve(wikiChange);
	} );	
}


/* function replaceHonorifics(){
	wikiChange = wikiChange.replace(/Mrs+\./gm, "Missus");
	wikiChange = wikiChange.replace(/Mr+\./gm, "Mister");
	wikiChange = wikiChange.replace(/Ms+\./gm, "Miss");
	wikiChange = wikiChange.replace(/Sr+\./gm, "Senior");
	wikiChange = wikiChange.replace(/Jr+\./gm, "Junior");
	wikiChange = wikiChange.replace(/Dr+\./gm, "Doctor");
	wikiChange = wikiChange.replace(/Prof+\./gm, "Professor");
	wikiChange = wikiChange.replace(/Rev+\./gm, "Reverend");
	wikiChange = wikiChange.replace(/Fr+\./gm, "Father");
	wikiChange = wikiChange.replace(/Pr+\./gm, "Pastor");
	wikiChange = wikiChange.replace(/Esq+\./gm, "Esquire");
	wikiChange = wikiChange.replace(/Hon+\./gm, "Honorable");
	wikiChange = wikiChange.replace(/Gen+\./gm, "General");
	wikiChange = wikiChange.replace(/Adm+\./gm, "Admiral");
	wikiChange = wikiChange.replace(/Col+\./gm, "Colonel");
	wikiChange = wikiChange.replace(/Maj+\./gm, "Major");	
	wikiChange = wikiChange.replace(/Cpt+\./gm, "Captain");
	wikiChange = wikiChange.replace(/Lt+\./gm, "Lieutenant");
	wikiChange = wikiChange.replace(/Sgt+\./gm, "Sergeant");
	wikiChange = wikiChange.replace(/Cpl+\./gm, "Corporal");
	wikiChange = wikiChange.replace(/Pvt+\./gm, "Private");	
} */