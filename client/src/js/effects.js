const myCardsEl = document.querySelector('#my-cards');

class Effects {
    static myCardsArrow(showing) {
        if(showing) {

        } else {
            
        }
    }
    
    static myCardsSlideshow() {
        console.log(myCardsEl.clientWidth, myCardsEl.scrollWidth)
        if(myCardsEl.clientWidth < myCardsEl.scrollWidth) {
            console.log('scroll overflowed');
            this.myCardsArrow(true);
        } else {
            this.myCardsArrow(false);

        }
    }
}
