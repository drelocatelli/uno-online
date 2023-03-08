class Effects {
    static myCardsSlideshow() {
        const myCardsEl = document.querySelector('#my-cards');
        console.log(myCardsEl.clientWidth, myCardsEl.scrollWidth)
        if(myCardsEl.clientWidth < myCardsEl.scrollWidth) {
            console.log('scroll overflowed');
        } else {
            console.log('scroll not overflowed');

        }
    }
}
