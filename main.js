const textBox = document.getElementById('textBox');
const errMsg = 'Sorry.. Google Speech API is only supported by Chrome';
 
const colorDim = '#9a9a9a';
const alertStr = `Caution: microphone permission required.
Please click on the red cross in address bar to allow it.`;
const recognizingStr = 'recognizing...';

localStorage.getItem('lang') || localStorage.setItem('lang', 'en-US');

//const langSelect = document.getElementById('lang-select');
const toggleBut = document.getElementById('toggleBut');
const loadingIcon = document.getElementById('loading-icon');

//langSelect.onchange = changeLang;
toggleBut.onclick = detect_mic_and_recognize;
loadingIcon.hidden = true;
let recognizing = false;

//const recog = new webkitSpeechRecognition();

const recog = new webkitSpeechRecognition(); 
if (recog == null) { 
recog = window.SpeechRecognition
|| window.webkitSpeechRecognition
|| window.mozSpeechRecognition
|| window.msSpeechRecognition
|| window.oSpeechRecognition
}
  

recog.continuous = true;
recog.interimResults = true;
recog.lang = 'en-US'; //localStorage.getItem('lang');
function detect_mic_and_recognize() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(recognize)
    .catch(() => {
      alert(alertStr);
    });
}

function recognize() {
  if (recognizing) {
    recog.stop();
  } else {
    textBox.innerHTML = '';
    recog.start();
  }
}

// function changeLang(e) {
//   let lang = e.target.value;
//   e.target.blur();
//   recognizing && recog.stop();
//   localStorage.setItem('lang', lang);
//   recog.lang = lang;
// }

recog.onstart = () => {
  // console.log('on start');
  textBox.innerHTML = '';
  recognizing = true;
  toggleBut.value = 'stop';
  textBox.style.color = colorDim;
  textBox.innerText = recognizingStr;
  loadingIcon.hidden = false;
};

recog.onend = () => {
  // console.log('on end');
  recognizing = false;
  toggleBut.value = 'start';
  loadingIcon.hidden = true;
  if (textBox.innerText == recognizingStr) {
    textBox.style.color = colorDim;
    textBox.innerText = 'idle';
  }
};

recog.onresult = (e) => {
  let idx = e.resultIndex;
  let result = e.results[idx];
  let pos = result.length - 1;
  let txt = result[pos].transcript;
  textBox.style.color = colorDim;
  textBox.innerHTML = txt;

  if(questions[currentQuestionIndex].result == parseInt(txt)){
    showNextQuestion()
  } 
  if (result.isFinal) { 
    //navigator.clipboard.writeText(txt);
    textBox.style.color = 'white';
    setTimeout(textBox.innerHTML='',2000)
  }
};

document.getElementsByTagName('body')[0].oncopy = () =>
  navigator.clipboard.writeText(textBox.innerText);

document.onkeyup = (e) => {
  if (e.code === 'Space') {
    recognize();
  }
};

window.onload = () => recognize();
