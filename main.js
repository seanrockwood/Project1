const combatCard1 = document.querySelector('.play-card1');
const combatCard2 = document.querySelector('.play-card2');
const combatCard3 = document.querySelector('.play-card3');
const combatCard4 = document.querySelector('.play-card4');
const combatCard5 = document.querySelector('.play-card5');

const confirmedCard1 = document.querySelector('.player-card-area1');
const confirmedCard2 = document.querySelector('.player-card-area2');
const confirmedCard3 = document.querySelector('.player-card-area3');
const confirmedCard4 = document.querySelector('.player-card-area4');
const confirmedCard5 = document.querySelector('.player-card-area5');

const cpuCombatCard1 = document.querySelector('.cpu-card1');
const cpuCombatCard2 = document.querySelector('.cpu-card2');
const cpuCombatCard3 = document.querySelector('.cpu-card3');
const cpuCombatCard4 = document.querySelector('.cpu-card4');
const cpuCombatCard5 = document.querySelector('.cpu-card5');

const cpuConfirmedCard1 = document.querySelector('.cpu-card-area1');
const cpuConfirmedCard2 = document.querySelector('.cpu-card-area2');
const cpuConfirmedCard3 = document.querySelector('.cpu-card-area3');
const cpuConfirmedCard4 = document.querySelector('.cpu-card-area4');
const cpuConfirmedCard5 = document.querySelector('.cpu-card-area5');

const shuffle = document.querySelector('#shuffle');
const dealCombat = document.querySelector('#deal-combat');
const commit = document.querySelector('#commit');
const fight = document.querySelector('#fight');
const kill = document.querySelector('#kill');

const graveyard = document.querySelector('#deadCards')
const battleBox = document.querySelector('#battle-output')
const battlePara = document.querySelector('#battle-info')

const suits = ['spades-', 'diamonds-', 'clubs-', 'hearts-'];
const values = ['A.svg','r02.svg','r03.svg','r04.svg','r05.svg','r06.svg','r07.svg','r08.svg','r09.svg','r10.svg','J.svg','Q.svg','K.svg',];
const winValues = [13,1,2,3,4,5,6,7,8,9,10,11,12]

let deck = [];
let discard = [];
let playerDrawDeck = [];
let cpuDrawDeck = [];
let playerCombatDeck = [];
let cpuCombatDeck = [];
let playerWarZone = [];
let cpuWarZone = [];
let cpuSort = new Set();

document.getElementById("deal-combat").disabled = true;
document.getElementById("commit").disabled = true;
document.getElementById("fight").disabled = true;
document.getElementById("kill").disabled = true;

function getMainDeck(){
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i], Win: winValues[x] };
      deck.push(card);
    }
  }
return deck;
}

function shuffleDeck(){
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function getDrawDeck(){
  const half = Math.ceil(deck.length / 2);
  playerDrawDeck.push(deck.splice(0, half));
  cpuDrawDeck.push(deck.splice(-half));
}

function getCombatDeck(){
  playerCombatDeck.push(playerDrawDeck[0].splice(0, 5));
  cpuCombatDeck.push(cpuDrawDeck[0].splice(0, 5));
}

function clearCards(){
  deck.length = 0;
  playerDrawDeck.length = 0;
  playerCombatDeck.length = 0;
  cpuDrawDeck.length = 0;
  cpuCombatDeck.length = 0;
  document.getElementById("winner").innerHTML = "";
  confirmedCard1.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard2.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard3.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard4.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard5.setAttribute('src', "assets/backs/blue.svg")
  combatCard1.setAttribute('src', "assets/backs/blue.svg")
  combatCard2.setAttribute('src', "assets/backs/blue.svg")
  combatCard3.setAttribute('src', "assets/backs/blue.svg")
  combatCard4.setAttribute('src', "assets/backs/blue.svg")
  combatCard5.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard1.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard2.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard3.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard4.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard5.setAttribute('src', "assets/backs/blue.svg")
}

function cpuCombatCommitment(){
  while(cpuSort.size !== 5) {
    let cpuChoice = Math.floor(Math.random() * 5);
    if (cpuChoice === 0) {
            cpuSort.add(cpuCombatDeck[0][0])
          } if (cpuChoice === 1) {
            cpuSort.add(cpuCombatDeck[0][1])
          } if (cpuChoice === 2) {
            cpuSort.add(cpuCombatDeck[0][2])
          } if (cpuChoice === 3) {
            cpuSort.add(cpuCombatDeck[0][3])
          } if (cpuChoice === 4) {
            cpuSort.add(cpuCombatDeck[0][4])
          } 
  }
  cpuWarZone = Array.from(cpuSort);
  cpuSort = new Set();
}

function cpuWarRemove(){
  discard.push(cpuWarZone[0]);
      cpuWarZone.splice(0,1);
}
function playerWarRemove(){
  discard.push(playerWarZone[0]);
      playerWarZone.splice(0, 1);
}
function cpuDrawPush(){
  cpuDrawDeck[0].push(cpuWarZone[0]);
      cpuWarZone.splice(0, 1);
}
function playerDrawPush(){
  playerDrawDeck[0].push(playerWarZone[0]);
  playerWarZone.splice(0,1);
}
function warCardComparison(){
  for(let i = 0; i < 5; i++){
    if (playerWarZone[0].Win > cpuWarZone[0].Win){
      document.getElementById('battle-info').innerHTML += "<br>PLAYER'S "+'<img src="assets/'+`${playerWarZone[0].Suit}`+`${playerWarZone[0].Value}`+'"class="smallcards">'+' KILLED '+'<img src="assets/'+`${cpuWarZone[0].Suit}`+`${cpuWarZone[0].Value}`+'"class="smallcards"><br>';
      cpuWarRemove()
      playerDrawPush()
    } else if(playerWarZone[0].Win === cpuWarZone[0].Win){
      document.getElementById('battle-info').innerHTML += '<br><img src="assets/'+`${playerWarZone[0].Suit}`+`${playerWarZone[0].Value}`+'"class="smallcards">'+'   KILLED EACH OTHER   '+'<img src="assets/'+`${cpuWarZone[0].Suit}`+`${cpuWarZone[0].Value}`+'"class="smallcards"><br>';
      cpuWarRemove()
      playerWarRemove()
    } else {
      document.getElementById('battle-info').innerHTML += "<br>PLAYER'S "+'<img src="assets/'+`${playerWarZone[0].Suit}`+`${playerWarZone[0].Value}`+'"class="smallcards">'+'  WAS KILLED BY  '+'<img src="assets/'+`${cpuWarZone[0].Suit}`+`${cpuWarZone[0].Value}`+'"class="smallcards"><br>';
      playerWarRemove()
      cpuDrawPush()
    } 
  }
  playerCombatDeck.length = 0;
  cpuCombatDeck.length = 0;
}

shuffle.addEventListener('click', function makeItShuffle(){
  clearCards();
  getMainDeck();
  shuffleDeck();
  getDrawDeck();
  document.getElementById("shuffle").disabled = true;
  document.getElementById("deal-combat").disabled = false;
})

dealCombat.addEventListener('click', function flipCombatDeck(evt){
  getCombatDeck()

  combatCard1.setAttribute('src', ("assets/"+`${playerCombatDeck[0][0].Suit}`+`${playerCombatDeck[0][0].Value}`) )
  combatCard2.setAttribute('src', ("assets/"+`${playerCombatDeck[0][1].Suit}`+`${playerCombatDeck[0][1].Value}`) )
  combatCard3.setAttribute('src', ("assets/"+`${playerCombatDeck[0][2].Suit}`+`${playerCombatDeck[0][2].Value}`) )
  combatCard4.setAttribute('src', ("assets/"+`${playerCombatDeck[0][3].Suit}`+`${playerCombatDeck[0][3].Value}`) )
  combatCard5.setAttribute('src', ("assets/"+`${playerCombatDeck[0][4].Suit}`+`${playerCombatDeck[0][4].Value}`) )
  document.getElementById("deal-combat").disabled = true;
  document.getElementById("commit").disabled = false;
})

combatCard1.addEventListener('click', function pushToWarzone(){
 playerWarZone.push(playerCombatDeck[0][0]);
 combatCard1.setAttribute('src', "assets/backs/red.svg")
 event.stopPropagation();
})
combatCard2.addEventListener('click', function pushToWarzone(){
 playerWarZone.push(playerCombatDeck[0][1])
 combatCard2.setAttribute('src', "assets/backs/red.svg")
 event.stopPropagation();
})
combatCard3.addEventListener('click', function pushToWarzone(){
 playerWarZone.push(playerCombatDeck[0][2])
 combatCard3.setAttribute('src', "assets/backs/red.svg")
 event.stopPropagation();
})
combatCard4.addEventListener('click', function pushToWarzone(){
 playerWarZone.push(playerCombatDeck[0][3])
 combatCard4.setAttribute('src', "assets/backs/red.svg")
 event.stopPropagation();
})
combatCard5.addEventListener('click', function pushToWarzone(){
 playerWarZone.push(playerCombatDeck[0][4])
 combatCard5.setAttribute('src', "assets/backs/red.svg")
 event.stopPropagation();
})

commit.addEventListener('click', function commitCombatDeck(evt){
  cpuCombatCommitment();
  confirmedCard1.setAttribute('src', ("assets/"+`${playerWarZone[0].Suit}`+`${playerWarZone[0].Value}`))
  confirmedCard2.setAttribute('src', ("assets/"+`${playerWarZone[1].Suit}`+`${playerWarZone[1].Value}`))
  confirmedCard3.setAttribute('src', ("assets/"+`${playerWarZone[2].Suit}`+`${playerWarZone[2].Value}`))
  confirmedCard4.setAttribute('src', ("assets/"+`${playerWarZone[3].Suit}`+`${playerWarZone[3].Value}`))
  confirmedCard5.setAttribute('src', ("assets/"+`${playerWarZone[4].Suit}`+`${playerWarZone[4].Value}`))
  cpuConfirmedCard1.setAttribute('src', ("assets/"+`${cpuWarZone[0].Suit}`+`${cpuWarZone[0].Value}`))
  cpuConfirmedCard2.setAttribute('src', ("assets/"+`${cpuWarZone[1].Suit}`+`${cpuWarZone[1].Value}`))
  cpuConfirmedCard3.setAttribute('src', ("assets/"+`${cpuWarZone[2].Suit}`+`${cpuWarZone[2].Value}`))
  cpuConfirmedCard4.setAttribute('src', ("assets/"+`${cpuWarZone[3].Suit}`+`${cpuWarZone[3].Value}`))
  cpuConfirmedCard5.setAttribute('src', ("assets/"+`${cpuWarZone[4].Suit}`+`${cpuWarZone[4].Value}`))
  document.getElementById("commit").disabled = true;
  document.getElementById("fight").disabled = false;
})

fight.addEventListener('click', function doit(){
  warCardComparison();
  document.getElementById("fight").disabled = true;
  document.getElementById("kill").disabled = false;
})

function eraseText(){
  battlePara.innerHTML = '';
}
kill.addEventListener('click', function(){
  if(playerDrawDeck[0].length < 5){
    document.getElementById("shuffle").disabled = false;
    document.getElementById("kill").disabled = true;    
    document.getElementById("deal-combat").disable = true;
    eraseText()
    document.getElementById("winner").innerHTML = "You Lose! Computer Wins!"
  } if (cpuDrawDeck[0].length < 5){
    document.getElementById("shuffle").disabled = false;
    document.getElementById("kill").disabled = true;    
    document.getElementById("deal-combat").disable = true;
    eraseText()
    document.getElementById("winner").innerHTML = "You Win! Computer Loses!"
  } else {
  graveyard.setAttribute('src', ("assets/"+`${discard[discard.length-1].Suit}`+`${discard[discard.length-1].Value}`))
  eraseText()
  confirmedCard1.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard2.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard3.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard4.setAttribute('src', "assets/backs/blue.svg")
  confirmedCard5.setAttribute('src', "assets/backs/blue.svg")
  combatCard1.setAttribute('src', "assets/backs/blue.svg")
  combatCard2.setAttribute('src', "assets/backs/blue.svg")
  combatCard3.setAttribute('src', "assets/backs/blue.svg")
  combatCard4.setAttribute('src', "assets/backs/blue.svg")
  combatCard5.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard1.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard2.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard3.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard4.setAttribute('src', "assets/backs/blue.svg")
  cpuConfirmedCard5.setAttribute('src', "assets/backs/blue.svg")
  document.getElementById("kill").disabled = true;
  document.getElementById("deal-combat").disabled = false;
}})