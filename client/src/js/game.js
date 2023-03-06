const app = document.getElementById("app");

class Game {
  section = 0;
  colors = ["#ED1A22", "#FDDE03", "#06A553", "#0B93D3"];
  cards = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "⥄",
    "+2",
    "+4",
    "❖",
    "⍉"
  ];

  inGameCards = [];

  generateCard(quantity = 1) {
    for (let q = 1; q <= quantity; q++) {
      const randomNumber = Math.floor(
        Math.random() * (this.cards.length - 1 - 0 + 1) + 0
      );
      const cardSymbol = this.cards[randomNumber];
      // limit cards
      if (this.limitCards(cardSymbol)) {
        continue;
      } else {
        // create card object in DOM
        const index = this.inGameCards.length;
        this.addCardInDOM(cardSymbol, index);
      }
    }
    this.section += 1;
    this.showHideCards();
    const cardsQuantityEl = document.querySelector('cards-quantity');
    cardsQuantityEl.innerText = `cartas geradas: ${this.inGameCards.length}`;
  }

  showHideCards() {
    const revealCards = document.querySelector('button[name="revealCards"]');
    const hideCards = document.querySelector('button[name="hideCards"]');
    if(game.inGameCards.length >= 1) {
      revealCards.disabled = false;
    } else {
      revealCards.disabled = true;
    }

    revealCards.onclick = function() {
      const allCards = document.querySelectorAll('.card');
      for(let card of allCards) {
        const hidden = card.querySelector('.hidden');
        hidden.style.opacity = 0;
      }
      revealCards.disabled = true;
      hideCards.disabled = false;

    }

    hideCards.onclick = function() {
      const allCards = document.querySelectorAll('.card');
      for(let card of allCards) {
        const hidden = card.querySelector('.hidden');
        hidden.style.opacity = 1;
      }
      hideCards.disabled = true;
      revealCards.disabled = false;

    }

  }

  addCardInDOM(symbol, index) {
    const randomNumber = Math.floor(
      Math.random() * (this.colors.length - 1 - 0 + 1) + 0
    );
    const cardColor = this.colors[randomNumber];
      // symbol == "❖" || symbol == "+4" ? "#000" : this.colors[randomNumber];

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");
    card.dataset.cardId = `${index}`;

    const content = document.createElement("div");
    content.classList.add("content");
    content.style.backgroundColor = cardColor;
    if(symbol == "❖" || symbol == "+4" ) {
      content.classList.add('colorfulBg');
    }
    card.appendChild(content);

    const symbolDiv = document.createElement("div");
    symbolDiv.classList.add("simbol");
    symbolDiv.classList.add("simbol-top");
    symbolDiv.innerText = symbol;
    content.appendChild(symbolDiv);

    const middle = document.createElement("div");
    middle.classList.add("middle");
    content.appendChild(middle);

    const middleNumber = document.createElement("div"); 
    if(symbol == "❖" || symbol == "+4" ) {
      middleNumber.classList.add('colorful');
    }
    middleNumber.classList.add("middle-number");
    middleNumber.innerText = symbol;
    middleNumber.style.color = cardColor;
    content.appendChild(middleNumber);

    const simbolBottom = document.createElement("div");
    simbolBottom.classList.add("simbol");
    simbolBottom.classList.add("simbol-bottom");
    simbolBottom.innerText = symbol;
    content.appendChild(simbolBottom);

    if (symbol == "❖" || symbol == "+4") {
      middleNumber.style.textShadow = "none";
    }

    card.setAttribute('title', `Carta N°${index + 1}`);

    // add hidden card
    const hiddenEl = document.createElement('div');
    hiddenEl.classList.add('hidden');
    content.onclick = (e) => {
      const op = e.target.style.opacity;
      e.target.style.opacity = (op == 0) ? 1 : 0;
    };
    content.prepend(hiddenEl);
    
    app.prepend(card);
    this.inGameCards.push(symbol);
  }

  limitCards(lastSymbol) {
    const findQuantity = this.cardsByQuatity(lastSymbol);
    console.log("in game cards:", this.inGameCards);
    console.log("last quantity:", findQuantity);

    if (lastSymbol == "⥄" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "+2" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "⍉" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "❖" && findQuantity == 4) {
      return true;
    }

    if (lastSymbol == "+4" && findQuantity == 4) {
      return true;
    }

    // default numeric cards
    if (findQuantity == 76) {
      return true;
    }

    return false;
  }

  cardsByQuatity(symbol) {
    console.log("symbol", symbol);
    const find = this.inGameCards.filter((card) => card == symbol);
    return find.length;
  }
}

const game = new Game();

