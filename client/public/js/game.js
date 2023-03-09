const app = document.getElementById("app");

class Game {
  effects;
  
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

  playerCards = 0;
  inGameCards = [];

  isRunning() {
    const gameEl = document.querySelector('#game');
    if(gameEl.style.display === 'block') {
      return true;
    }

    return false;
  }

  openGame() {
    document.querySelector('#main').remove();
    document.querySelector('#game').style.display = 'block';
    const card = this.generateGlobalCard();
    new ServerEmit(server.socket).shareGlobalCard(card);
  }

  getGlobalCard() {
    const globalCard = app.querySelector('.card[data-card-id="0"]');
    return globalCard;
  }

  setGlobalCard(symbol, color) {
    let middleSymbol = this.getGlobalCard().querySelector('.middle-number');
    let topSymbol = this.getGlobalCard().querySelector('.simbol-top');
    let botSymbol = this.getGlobalCard().querySelector('.simbol-bottom');
    let content = this.getGlobalCard().querySelector('.content');

    if(symbol === "❖" || symbol === "+4" ) {
      content.classList.add('colorfulBg');
    } else {
      content.classList.remove('colorfulBg');
      middleSymbol.style.textShadow = '5px 7px 1px #000';
    }

    middleSymbol.innerHTML = symbol;
    topSymbol.innerHTML = symbol;
    botSymbol.innerHTML = symbol;
    content.style.backgroundColor = color;
  }

  syncGlobalCard(card) {
      this.setGlobalCard(card.symbol, card.color);
  }

  generateCardSymbolNumber() {
    return Math.floor(
      Math.random() * (this.cards.length - 1 - 0 + 1) + 0
    );
  }

  generateCardSymbol() {
    return this.cards[this.generateCardSymbolNumber()];
  }

  generateCardColorNumber() {
    return Math.floor(
      Math.random() * (this.colors.length - 1 - 0 + 1) + 0
    );
  }

  generateCardColor() {
    return this.colors[this.generateCardColorNumber()];
  }
  
  generateGlobalCard() {
    const generateSymbol = this.generateCardSymbol();
    const generateColor = this.generateCardColor();
    if(generateSymbol == "❖" || generateSymbol == "+4") {
      return this.generateGlobalCard();
    }
    this.generateCard(1, {showing: true, canHide: false, cardSymbol:  generateSymbol, cardColor: generateColor});
    return {symbol: generateSymbol, color: generateColor};
  }

  giveMeCards(quantity = 7, signal = 'positive') {
    const box = document.querySelector('#my-cards .cards');
    this.playerCards = (signal == 'positive') ?  + quantity : - quantity;
    this.generateCard(quantity, {box});
    Effects.myCardsSlideshow();
  }

  generateCard(quantity = 1, {box, showing = false, canHide = true, cardSymbol, cardColor}) {
    for (let q = 1; q <= quantity; q++) {

      // limit cards
      if (this.limitCards(cardSymbol)) {
        continue;
      } else {
        // create card object in DOM
        const index = this.inGameCards.length;
        this.addCardInDOM(cardSymbol, index, {box, showing, canHide, cardColor});
      }
    }
    this.section += 1;
    this.showHideCards();
    const cardsQuantityEl = document.querySelector('cards-quantity');
    if(cardsQuantityEl != null) {
      cardsQuantityEl.innerText = `Você possui ${this.playerCards} cartas`;
      new ServerEmit(server.socket).shareCardsCount(this.playerCards);
    }
  }

  generateFriendCard(quantity = 1, {box, showing = false, canHide = true, cardSymbol, cardColor}) {
    for (let q = 1; q <= quantity; q++) {

      // limit cards
      if (this.limitCards(cardSymbol)) {
        continue;
      } else {
        // create card object in DOM
        const index = this.inGameCards.length;
        this.addCardInDOM(cardSymbol, index, {box, showing, canHide, cardColor});
      }
    }
    this.section += 1;
  }

  showHideCards() {
    const revealCards = document.querySelector('button[name="revealCards"]');
    const hideCards = document.querySelector('button[name="hideCards"]');
    if(game.inGameCards.length >= 1) {
      revealCards.disabled = false;
    } else {
      revealCards.disabled = true;
    }

    const allCards = document.querySelectorAll('#my-cards .card');
    revealCards.onclick = function() {
      for(let card of allCards) {
        const hidden = card.querySelector('.hidden');
        hidden.style.opacity = 0;
      }
      revealCards.disabled = true;
      hideCards.disabled = false;

    }

    hideCards.onclick = function() {
      for(let card of allCards) {
        const hidden = card.querySelector('.hidden');
        hidden.style.opacity = 1;
      }
      hideCards.disabled = true;
      revealCards.disabled = false;

    }

  }

  addCardInDOM(symbol, index, {box, showing = false, canHide = true, cardColor}) {
    symbol = symbol ?? this.cards[this.generateCardSymbolNumber()];

    cardColor = cardColor ?? this.generateCardColor();
      // symbol == "❖" || symbol == "+4" ? "#000" : this.colors[randomNumber];
    box = box ?? document.querySelector('#main-cards #mesa');

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
    // if(symbol == "❖" || symbol == "+4" ) {
    //   middleNumber.classList.add('colorful');
    // }
    middleNumber.classList.add("middle-number");
    middleNumber.innerText = symbol;
    // middleNumber.style.color = cardColor;
    middleNumber.style.color = "#fff";
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
    if(canHide) {
      const hiddenEl = document.createElement('div');
      hiddenEl.classList.add('hidden');
      hiddenEl.style.opacity = (!showing) ? 1 : 0;
      content.prepend(hiddenEl);
    }
    
    box.prepend(card);
    this.inGameCards.push(symbol);
  }

  limitCards(lastSymbol) {
    const findQuantity = this.cardsByQuatity(lastSymbol);

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
    const find = this.inGameCards.filter((card) => card == symbol);
    return find.length;
  }
}

const game = new Game();

