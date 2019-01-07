
function generateWinningNumber () {
    let winNum = Math.floor((Math.random() * 100) + 1);
    return winNum;
}

function shuffle (array) {
    let remainElements = array.length;
    let index;
    let lastElem;

    while (remainElements) {
      index = Math.floor((Math.random() * remainElements--));
      lastElem = array[remainElements];
      array[remainElements] = array[index];
      array[index] = lastElem;

    }
    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower(){
        if (this.playersGuess < this.winningNumber) {
            return true
        }
        return false;
    }
    playersGuessSubmission(string) {
      if (this.pastGuesses.length >= 5) {
        return `You Lose. Reset the game to play again!`;
      }
      else if  (Number(string) >= 1 && Number(string) <= 100 ) {
        this.playersGuess = Number(string);
        return this.checkGuess(Number(string));
      }
      else {
         return `That is an invalid guess.`
      }
    }
    checkGuess(num){
       if (this.winningNumber === num) {
          return 'You Win! Reset the game to play again!';
      }
      else if (this.pastGuesses.includes(num)) {
          return 'You have already guessed that number.';
      }
      else {
          this.pastGuesses.push(num);
          if (this.pastGuesses.length >= 5) {
            return 'You Lose. Reset the game to play again!';
          }
          else if (this.difference() < 10) {
            return 'You\'re burning up!'
          }
          else if (this.difference() < 25) {
              return 'You\'re lukewarm.'
          }
          else if (this.difference() < 50) {
              return 'You\'re a bit chilly.'
          }
          else if (this.difference() < 100) {
              return 'You\'re ice cold!'
          }

      }

    }
    provideHint() {
        let array = [this.winningNumber];
        array.push(generateWinningNumber());
        array.push(generateWinningNumber());

        return shuffle(array);
    }
}

function newGame() {
  return new Game()
}


let myGame = new Game();
let hintNum = myGame.provideHint();

const submit = document.getElementById('submit');
const reset = document.getElementById('reset');
const hint = document.getElementById('hint');
const inputNumber = document.getElementById('inputNumber');
const status = document.getElementById('status');


submit.addEventListener('click', function click(e) {
  if (myGame.pastGuesses.length === 5 ) {
    e.preventDefault();
  }
  status.textContent = myGame.playersGuessSubmission(inputNumber.value);
  myGame.playersGuessSubmission(inputNumber.value);
  let index = myGame.pastGuesses.length;
  let id = `guess${index}`;
  let guess = document.getElementById(id);
  guess.textContent = myGame.pastGuesses[index - 1];
  inputNumber.value = '';

  if (status.textContent === 'You Lose. Reset the game to play again!' || status.textContent === 'You Win! Reset the game to play again!'){
    hint.disabled = true;
    submit.disabled = true;
    inputNumber.disabled = true;
    document.getElementById('previuosGuesses').textContent = `The winning number was ${myGame.winningNumber}`
 }

})

reset.addEventListener('click', function() {
myGame = newGame();

let nums = document.getElementsByClassName('guesses')
  for (let i = 0; i < nums.length; i++) {
    nums[i].textContent = '__';
}
status.textContent = 'Enter your guess'
hint.disabled = false;
submit.disabled = false;
inputNumber.disabled = false;
document.getElementById('previuosGuesses').textContent = 'Previous guesses'
})

hint.addEventListener('click', function (){
    
    status.textContent = `The answer is ${hintNum[0]}, ${hintNum[1]} or ${hintNum[2]}`;
})
