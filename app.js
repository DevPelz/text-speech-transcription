let y = document.querySelector('#preloader');
let x = document.querySelector('.wrapper');
setInterval(() => {
   y.style.display = 'none';
   x.style.display = 'block'
},1500);    



// for the clock
class DigitalClock {
    constructor(element){
        this.element = element;
        // console.log(this.element);
    }

    start(){
        this.update();
        setInterval(() => {
            this.update()
        }, 500);
        
       } 

    update() {
       const parts = this.getTimeParts();
       const minuteFormatted = parts.minute.toString().padStart(2, "0");
       const timeFormatted = `${parts.hour}:${minuteFormatted}`;
       const amPm = parts.isAm ?  "AM" : "PM";

       this.element.querySelector(".clock-time").textContent = timeFormatted;        
       this.element.querySelector(".clock-ampm").textContent = amPm;      
    //    console.log(timeFormatted);
    }

    getTimeParts() {
        const now = new Date();

        return {
            hour: now.getHours() % 12 || 12,
            minute: now.getMinutes(),
            isAm: now.getHours() < 12
        };
    };
}

const clockElement = document.querySelector(".clock");
const clockObject = new DigitalClock(clockElement);

clockObject.start();
// console.log(clockObject.getTimeParts())







// for the transcription


const synth = window.speechSynthesis;

// form elements
const textform = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate= document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch= document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

// voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    // console.log(voices)

    // loop voices - to create an option for each one
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        // fill optiion with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        //  needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

   
};
// for voices to show/work
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// speech
const speak = () => {
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== '') {

       //Adding background animation 

   body.style.background = 'black url(images/qq.gif)';
   body.style.backgroundRepeat = 'no-repeat';
   body.style.backkgroundSize = '100% 100%';
   body.style.backgroundPosition= 'center'

        // to get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // speak end
        speakText.onend = e => {
         console.log('Done speaking...');
         body.style.background = 'black';
        }
        // speak error
        speakText.onerror = e => {
            console.error('something went wrong...');
           
        }
        
            // voices selected
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
        
        // loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
          }
        });

    //  set pitch & rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
        // for speak
     synth.speak(speakText);   
}

};

//Setting Event listners

 textform.addEventListener('submit', e => {
    e.preventDefault(); // since its a form i have to prevent it from submitting to a file.    
    speak();
    textInput.blur();   
})

// Rate & Pitch value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select change, so it speaks immediately another voice is selected
voiceSelect.addEventListener('change', e => speak());