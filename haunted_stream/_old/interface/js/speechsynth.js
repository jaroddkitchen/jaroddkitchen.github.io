var synth = window.speechSynthesis;

/* var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('#textfield');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value'); */

var inputForm;
var inputTxt;
var voiceSelect;

var pitch;
var pitchValue;
var rate;
var rateValue;


var voices = [];

function speak(speechContent){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (speechContent !== '') {
    var utterThis = new SpeechSynthesisUtterance(speechContent);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
	voices = synth.getVoices().sort(function (a, b) {
	  const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
	  if ( aname < bname ) return -1;
	  else if ( aname == bname ) return 0;
	  else return +1;
	});
	utterThis.voice = voices[1];
    utterThis.pitch = 1.75;
    utterThis.rate = 1.5;
    synth.speak(utterThis);
  }
}
