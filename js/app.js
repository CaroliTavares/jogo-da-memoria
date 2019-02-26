
let primeiracarta = ''; 
let segundacarta = ''; 
let primeiracartaParent = '';
let segundacartaParent = '';
let ready = true;
let stopTimer = false;
let cartaCounter = 0;

document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".deck").addEventListener("click", function() {stopTimer = false; timerStart()});
document.querySelector(".deck").addEventListener("click", cartaOpen);
document.querySelector(".playAgain").addEventListener("click", function() {
document.querySelector(".Page").className = "Page closed"; restart()});

// Desbloquear cartões clicados e compará-los

function cartaOpen(evt) {
  if (evt.target.className == "carta" && cartaCounter != 2) {
	    evt.target.className += " open show";

    
    if (primeiracarta == false) {
      primeiracarta = evt.target.firstElementChild.className;
      primeiracartaParent = evt.target;
      cartaCounter = 1;
    } else {

      document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;

      if (document.querySelector(".moves").innerText == '16' || document.querySelector(".moves").innerText == '22') {
        document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
      }

      segundacarta = evt.target.firstElementChild.className;
      segundacartaParent = evt.target;
      cartaCounter = 2;

      // comparar cartas

      if (primeiracarta == segundacarta) {
        primeiracartaParent.className = "carta open show match";
        segundacartaParent.className = "carta open show match";
        primeiracarta = '';
        segundacarta = '';
        cartaCounter = 0;
        win();
      } else {
        setTimeout(function () {
          evt.target.className = "carta close"; primeiracartaParent.className = "carta close"}, 700);
        setTimeout(function () {
          evt.target.className = "carta"; primeiracartaParent.className = "carta"; primeiracarta = ''; segundacarta = ''; cartaCounter = 0}, 900);
      }
    }

    ready = false;

  }
}

function returnStars() {
  while (document.getElementsByClassName("fa-star").length != 3) {
    var newStar = document.createElement("li");
    newStar.className = "fa fa-star";
    document.querySelector(".stars").appendChild(newStar);
  }
}

// Redefine todo o progresso que você fez quando você terminou o jogo

function restart() {
  primeiracarta = "";
  segundacarta = "";
	document.querySelector(".moves").innerText = "0";
	returnStars();
  document.querySelector(".Page").className = "Page closed";

	let cartas = Array.prototype.slice.call(document.querySelectorAll('.carta'));
	cartas = shuffle(cartas);
	const deck = document.querySelector(".deck");

	for (let i = 0; i < cartas.length; i++) {
		deck.appendChild(cartas[i]);
		cartas[i].className = "carta";
	}

	ready = true;
  stopTimer = true;

 }

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Tempo

function timerStart() {
	if (ready == true) {
		var timer = 0;
		var hour = 0;
		var minute = 0;
		var second = 0;
		window.setInterval (function() {
		  ++timer;
		  hour = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
		  if(stopTimer) {
			document.querySelector('#timer').innerHTML = "00:00:00";
			timer = 0;
			hour = 0;
			minute = 0;
			second = 0;
			return;
		  }
		}, 1000);
	}
}

// Mostra uma caixa quando você ganha:

function win() {
 document.querySelector(".movesCount").innerText = document.querySelector(".moves").innerText;
 document.querySelector(".starsCount").innerText = document.getElementsByClassName("fa-star").length;
 document.querySelector(".finalTime").innerText = document.querySelector('#timer').innerHTML;

 // Colete cartões para verificar se todos estão abertos e correspondem:

 let matchingcartas = document.getElementsByClassName('carta match open show');
 if (matchingcartas.length == 16) {
   setTimeout (function() {document.querySelector(".Page").className = "Page"}, 1000);
   stopTimer = true;
 }
}


