const cardsEl = document.querySelector('#my-cards .cards');

class Effects {
    static myCardsArrow(showing) {
        const arrowsEl = document.createElement('div');
        arrowsEl.classList.add('myCards-arrows');
        if(showing) {
            const leftArrow = document.createElement('img');
            leftArrow.title = 'Arrastar pra esquerda';
            leftArrow.src = 'src/assets/img/arrow_left.png';

            const rightArrow = document.createElement('img');
            rightArrow.title = 'Arrastar pra direita';
            rightArrow.src = 'src/assets/img/arrow_right.png';

            arrowsEl.appendChild(leftArrow);
            arrowsEl.appendChild(rightArrow);
            cardsEl.appendChild(arrowsEl);
        } else {
            arrowsEl.remove();
        }
    }
    
    static myCardsSlideshow() {
        console.log(cardsEl.clientWidth, cardsEl.scrollWidth)
        if(cardsEl.clientWidth < cardsEl.scrollWidth) {
            console.log('scroll overflowed');
            this.myCardsArrow(true);
        } else {
            console.log('scroll not overflowed');
            this.myCardsArrow(false);
        }
    }
}
