

function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	var settings = {
		headers: { Accept: 'application/sparql-results+json' },
		data: { query: sparqlQuery }
	};
	return $.ajax( endpointUrl, settings ).then( doneCallback );
}

var endpointUrl = 'https://query.wikidata.org/sparql',
	sparqlQuery = "#Cats, with pictures\n" +
        "#defaultView:ImageGrid\n" +
        "SELECT ?item ?itemLabel ?pic WHERE {\n" +
        "  ?item wdt:P31 wd:Q146;\n" +
        "    wdt:P18 ?pic.\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}\n" +
        "LIMIT 1";

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
		console.log( data );
	}
);
