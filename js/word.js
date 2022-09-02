let y = document.querySelector('#preloader');
let x = document.querySelector('.wrapper');
setInterval(() => {
   y.style.display = 'none';
   x.style.display = 'block'
},1500);



import { wordList } from "./game.js";
const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");

// global variables
let word, maxGuesses=[], correct = [], incorrect = [];


function randomWord() {
// getting random objects from the wordlist
let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
word = ranObj.word;  // getting word  of random object
maxGuesses = 10; correct = []; incorrect = [];
console.log(word);
console.log(ranObj);

hint.innerHTML = ranObj.hint;
guessLeft.innerHTML = maxGuesses;
wrongLetter.innerHTML= incorrect;

// creating input tags according to the word lengths  
let html = "";
for (let i = 0; i < word.length; i++ ) {
html +=` <input type="text" disabled>`
}
inputs.innerHTML = html;
}
randomWord();

function initGame(e){
let key = e.target.value;
   
//     // validate if user preessed key is either alphabet or number
if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)) {
console.log[key];
if(word.includes(key)) {
for (let i = 0; i < word.length; i++){
if(word[i]=== key) {

      correct.push(key);
    // showing matched letter in the input value
inputs.querySelectorAll("input")[i].value = key;
           }
        }
        // if the letter is found in the word
        console.log("letter found")
    } else{
        maxGuesses--; // reducing guesses by 1
        incorrect.push(` ${key}`);
     }
     guessLeft.innerHTML = maxGuesses;
     wrongLetter.innerHTML= incorrect;
    }
 typingInput.value = "";  //  empty input tag after user types anything
  
 setTimeout(() => {
    if(correct.length === word.length){
        alert(`Congrats! You found the word ${word.toUpperCase()}`); randomWord() // setting random word function so the game resets
    
     }
     else if(maxGuesses < 1){
        alert("Game Over! You don't have remaining guesses");
        for (let i = 0; i < word.length; i++){
                // showing matched letter in the input value
            inputs.querySelectorAll("input")[i].value = word[i];
                       }
                    }
 });
 
 }  



resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input",initGame);
inputs.addEventListener("click",() =>typingInput.focus());
document.addEventListener("keydown",() =>typingInput.focus());