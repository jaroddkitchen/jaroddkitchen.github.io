//----------------------------------------------------
// CONVERSATION SUBJECT CONTEXT MODULE
//----------------------------------------------------
//This module retrieves the a Wikipedia article using JSONP with the Wikipedia API: http://en.wikipedia.org/w/api.php
	
	var wiki = "";
	var wikiText = "";
	var wikiTitle = "";
	var wikiData = "";
	var wikiImg = "";
	
	var wikiDialogueNode = [];

function findWiki(wikiStr){
let surl = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&formatversion=2&prop=extracts|pageimages&format=json&generator=search&gsrnamespace=0&gsrlimit=1&redirects=1&gsrsearch=' + wikiStr + " " + dContextStr + " " + dMinusContext;

// "in title" kludge for bad search results
if ( dContextStr == "color" || dContextStr == "song" ){
	surl ='https://en.wikipedia.org/w/api.php?action=query&origin=*&formatversion=2&prop=extracts|pageimages&format=json&generator=search&gsrnamespace=0&gsrlimit=1&redirects=1&gsrsearch=' + "intitle:" + dContextStr + " " + wikiStr + " " + dMinusContext;
}

    $.ajax({
      url: surl,
      header: {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'jsonp',
      data: '',
      beforeSend: function(){
		  log("loading");
        $("#loader").show();
        $('#loader').html('<div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block;" width="25%" height="25%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(50 50)"><g transform="scale(0.7)"><g transform="translate(-50 -50)"><g transform="translate(-3.20642 -20)"><animateTransform attributeName="transform" type="translate" repeatCount="indefinite" dur="1s" values="-20 -20;20 -20;0 20;-20 -20" keyTimes="0;0.33;0.66;1"></animateTransform><path fill="#666666" d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"></path></g></g></g></g></svg></div>')
       },   
		success: function(data){
			wikiText = "";
			wikiData = "";
			wikiImg = "";
			
			if(typeof data.query == 'undefined'){
				//Respond with random insult
				dWriteDarkWiki(wikiText, wikiTitle);
			} else {
				dataNum = Object.keys(data.query.pages)[0];
	
				//get title
				wikiTitle = data.query.pages[dataNum].title;
				//dGetWikiCat(wikiTitle);
				
				wikiText = data.query.pages[dataNum].extract
			}
		},
		complete: function(data){
			log("wiki search complete");
			$('#textfield').focus();
			$("#loader").hide();
			
			//get wikidata
			if (wikiText !== ""){
				dGetWikiData(wikiTitle);
			}			
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("findWiki error");
			$("#loader").hide();
		}			
	});
}



function dGetWikiData(wikiTitle)
{
	let qurl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles="+wikiTitle+"&format=json";

	$.ajax({
		url: qurl,
		header: {
			'Access-Control-Allow-Origin' : '*',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		dataType: 'jsonp',
		data: '',   
		success: function(data){
			// dataNum = Object.keys(data.query.pages)[0];
			// log("dataNum = " + dataNum);			
			// wikiData = data.query.pages[dataNum].pageprops.wikibase_item;
			// log("wikiData = " + wikiData);
			// log("data search complete");
			// iri = "http://www.wikidata.org/entity/" + wikiData;
			// dLookUpEntity();
			
			dataNum = Object.keys(data.query.pages)[0];
			log("dataNum = " + dataNum);
			if (dataNum == -1){
				wikiData = "";
				wikiText = "";
				wikiTitle = "";
				dWriteDarkWiki(wikiText, wikiTitle);
			} else {
				wikiData = data.query.pages[dataNum].pageprops.wikibase_item;
				log("wikiData = " + wikiData);
				log("data search complete");
				iri = "http://www.wikidata.org/entity/" + wikiData;
				dLookUpEntity();					
			}
		},
		complete: function(){
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("getWikiData error");
		}
	}); 	
}	


	var iri;
	var isoLanguage = 'en';	
	
	var wikiProps;
	
	var wikiInstsOf = [];	// P31
	var wikiInstOf;

	var wikiSubclassesOf = []; // P279
	var wikiSubclassOf = '';
	
	var wikiSex;			// P21
	
	var wikiJobs = [];
	var wikiJob;			// P106

	var wikiNicknames = [];	// P39
	var wikiNickname;	

	var wikiGenres =[]; 	// P136			
	var wikiGenre; 	
	
	var wikiBirthDate;  	// P569
	var wikiDeathDate;  	// P570

	var wikiColor = "";
	
	var wikiImage;			//P18	
	var wikiVideo;			// P10
	

function dLookUpEntity(){
		// console.log(iri);
		// create URI-encoded query string to get names and IRIs
		var string = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'
                    +'PREFIX wd: <http://www.wikidata.org/entity/>'
                    +'PREFIX wdt: <http://www.wikidata.org/prop/direct/>'
                    +'SELECT DISTINCT ?property ?value WHERE {'
                    + '<' + iri + '> ?propertyUri ?valueUri.'
                    +'?valueUri rdfs:label ?value.'
                    +'?genProp <http://wikiba.se/ontology#directClaim> ?propertyUri.'
                    +'?genProp rdfs:label ?property.'
                    +'FILTER(substr(str(?propertyUri),1,36)="http://www.wikidata.org/prop/direct/")'
                    +'FILTER(LANG(?property) = "'+isoLanguage+'")'
                    +'FILTER(LANG(?value) = "'+isoLanguage+'")'
                    +'}'
                    +'ORDER BY ASC(?property)';
		var encodedQuery = encodeURIComponent(string);

		// send query to endpoint
		$.ajax({
			type: 'GET',
			url: 'https://query.wikidata.org/sparql?query=' + encodedQuery,
			headers: {
				Accept: 'application/sparql-results+json'
			},
			success: function(returnedJson) {
				//text = '';
				//wikiProps = '';
				wikiSex = '';
				wikiInstsOf = []; wikiInstOf = '';	
				wikiSubclassesOf = []; wikiSubclassOf = '';				
				wikiJobs = []; wikiJob = '';
				wikiGenres = []; wikiGenre = '';
				wikiNicknames = []; wikiNickname = '';
				wikiImages = []; wikiImage = '';				
				
				for (i = 0; i < returnedJson.results.bindings.length; i++) {
					property = returnedJson.results.bindings[i].property.value
					value = returnedJson.results.bindings[i].value.value
					id = returnedJson.results.bindings[i].value
					if (property == "sex or gender"){
						wikiSex = value;
						log("wikiSex = " + wikiSex);
					}
					if (property == "instance of"){
						wikiInstsOf.push(value);
						wikiInstOf = wikiInstsOf[0];
						log("wikiInstOf = " + wikiInstOf);
					}
					if (property == "subclass of"){
						wikiSubclassesOf.push(value);
						wikiSubclassOf = wikiSubclassesOf[0];
						log("wikiSubclassOf = " + wikiSubclassOf);
					}
					if (property == "occupation"){
						wikiJobs.push(value);
						wikiJob = wikiJobs[0];
						log("wikiJob = " + wikiJob);
					}
					if (property == "nickname"){
						wikiNicknames.push(value);
						wikiNickname = wikiNicknames[0];
						log("wikiNickname = " + wikiNickname);
					}					
					if (property == "genre"){
						wikiGenres.push(value);
						wikiGenre = wikiGenres[0];
						log("wikiGenre = " + wikiGenres);
					}
					
					//log(value);
					//log("bindings length =" + returnedJson.results.bindings.length);
					
					// catchphrase
					// signature
					// political party
					// residence
					// member of
					// position held
					// field of work
					// brand
					// location
					// has effect
					// topic's main category
					// part of
				}			

				dFindWikiColor(wikiData, wikiTitle)
			}
		});
}


function dFindWikiColor(wikiData, wikiTitle)
{
	var endpointUrl = 'https://query.wikidata.org/sparql',
		sparqlQuery = "#\n"
			+ "#defaultView:ImageGrid\n"
			+ "SELECT ?color ?rgb WHERE {\n"
			+ "?item wdt:* wd:" + wikiData + ";\n"
			+ "wdt:P465 ?rgb.\n"
			+ "SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n"
			+ "}\n"
			+ "LIMIT 1";

	makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
			try {
				wikiColor = data.results.bindings[0].rgb.value;
				//log( data.results.bindings[0].rgb.value );
				log("color found");
				wikiInstsOf.push("colors");
				dFindWikiImage(wikiData, wikiTitle)				
			} catch(error) {
				wikiColor = "";
				console.log("no color found");
				dFindWikiImage(wikiData, wikiTitle)
			}
		}
	);
}
	

function dFindWikiImage(wikiData, wikiTitle)
{
	var endpointUrl = 'https://query.wikidata.org/sparql',
		sparqlQuery = "#\n"
			+ "#defaultView:ImageGrid\n"
			+ "SELECT ?pic WHERE {\n"
			+ "?item wdt:* wd:" + wikiData + ";\n"
			+ "wdt:P18 ?pic.\n"
			+ "SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n"
			+ "}\n"
			+ "LIMIT 1";

	makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
			//$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
			//dataNum = Object.keys(data.results.bindings)[0];
			try {
				wikiImg = data.results.bindings[0].pic.value;
				//console.log( data.results.bindings[0].pic.value );
				dComposeWiki(wikiText, wikiTitle, wikiImg, wikiData);				
			} catch(error) {
				wikiImg = "";
				console.log("no image found");
				dComposeWiki(wikiText, wikiTitle, wikiImg, wikiData);
			}
		}
	);
}


	var thumbPath = '';
	var imgPath = '';

function resizeWikiImg(wikiImg, wikiData){
	//log("resizing " + wikiImg);
	let imgPath = '';
	
	return new Promise((resolve, reject) => {

		var iri = "http://www.wikidata.org/entity/" + wikiData;

		var endpointUrl = 'https://query.wikidata.org/sparql',
			sparqlQuery = "#\n"
				+ "#defaultView:ImageGrid\n"
				+ "SELECT ?pic WHERE {\n"
				+ "?item wdt:* wd:" + wikiData + ";\n"
				+ "wdt:P18 ?pic.\n"
				+ "SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n"
				+ "}\n"
				+ "LIMIT 1";
		
		makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
				imgPath = data.results.bindings[0].pic.value
				imgPath = imgPath.split("FilePath/");
				imgPath = imgPath[1];
				//console.log(imgPath);

				var url = "https://en.wikipedia.org/w/api.php"; 

				var params = {
					action: "query",
					format: "json",
					prop: "imageinfo",
					iiprop: "size|url",
					iiurlwidth: "200",
					iiurlheight: "200",
					titles: "File:" + imgPath
				};
				
				url = url + "?origin=*";
				Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

				fetch(url)
					.then(function(response){return response.json();})
					.then(function(response) {
						var pages = response.query.pages;
						for (var p in pages) {
							//console.log(pages[p].title + " is uploaded by User:" + pages[p].imageinfo[0].user);
							//console.log(pages[p].imageinfo[0].size + " bytes");
							//console.log(pages[p]);
							//console.log(pages[p].imageinfo[0].thumburl + " is thumbnail");
							thumbPath = pages[p].imageinfo[0].thumburl;
						}
					})
					.then(function(response) {
						//log("thumbpath " + thumbPath);
						resolve(thumbPath);
					})
					.catch(function(error){console.log(error);});
			}
		);
	});
}



function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	var settings = {
		headers: { Accept: 'application/sparql-results+json' },
		data: { query: sparqlQuery },
		success: function(data){
		},
		complete: function(){
			log("SPARQL search complete");
		},
		error: function (xmlHttpRequest, textStatus, errorThrown) {
			log("getWikiData error");
		}		
	};
	return $.ajax( endpointUrl, settings ).then( doneCallback );
}