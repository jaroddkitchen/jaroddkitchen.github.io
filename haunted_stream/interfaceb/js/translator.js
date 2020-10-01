function replaceHonorifics(){
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
}