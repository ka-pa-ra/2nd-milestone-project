const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let lives;
let scorePoints;

  
function init(){
    lives = 30;
    scorePoints = 0;
    update();
}

window.onload = init;

function update(){
    let remain = document.getElementById("remain");
    let score = document.getElementById("score");
    score.innerText = scorePoints;
    remain.innerText = lives;
}

function decFunc(){
    lives--;
    update();
    if(lives===0){
        alert("Game over");
    }
}
function incremScore(){
    scorePoints = scorePoints+5;
    update();
    if(scorePoints === 10){
        alert("Well done ");
    }
}
function decScore(){
    scorePoints = scorePoints-2;
    update();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
    return;
   }

   secondCard = this;
   

   checkForMatch();
 }

 function checkForMatch() {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
       incremScore();
     disableCards();
     return;
   }

   unflipCards();
 }

 function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
 }

 function showCards() {
    lockBoard = true;

   setTimeout(() => {
     cards.classList.add('flip');
   }, 1500);
 }
 function unflipCards() {
    lockBoard = true;

   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');

     lockBoard = false;
     resetBoard();
   }, 1500);
 }
 function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
   decFunc();
   decScore();
 }
 function resetGame() {
   location.reload();
 }


 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();
cards.forEach(card => card.addEventListener('click', flipCard));

