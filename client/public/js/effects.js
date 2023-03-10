const cardsEl = document.querySelector('#my-cards .cards');

class Effects {
    static newAudioInstance(audioName) {
        const audio = document.createElement('audio');
        audio.src = `../assets/sounds/${audioName}`;
        return audio;
    }
    
    static toggleMusic() {
        let audio = this.newAudioInstance('bg-music.mp3');
        const musicBtn = document.querySelector('button[name="toggleMusic"]');
        audio.autoplay = true;
        musicBtn.onclick = function(e) {
            if(audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }
    
    static myCardsArrow(showing) {
        const arrowsEl = document.createElement('div');
        arrowsEl.classList.add('myCards-arrows');
        if(showing) {
            const leftArrow = document.createElement('img');
            leftArrow.title = 'Arrastar pra esquerda';
            leftArrow.src = 'assets/img/arrow_left02.png';

            const rightArrow = document.createElement('img');
            rightArrow.title = 'Arrastar pra direita';
            rightArrow.src = 'assets/img/arrow_right02.png';

            arrowsEl.appendChild(leftArrow);
            arrowsEl.appendChild(rightArrow);
            cardsEl.appendChild(arrowsEl);

            // scroll on border
            cardsEl.addEventListener("mousemove", function (event) {
                const containerRect = cardsEl.getBoundingClientRect();
                const x = event.clientX - containerRect.left;
                const y = event.clientY - containerRect.top;
              
                if (x < 20) {
                  cardsEl.scrollLeft -= 30;
                } else if (x > containerRect.width - 20) {
                  cardsEl.scrollLeft += 30;
                }

                // window.requestAnimationFrame(scroll);
            });
            
            leftArrow.onclick = (e) => {
                cardsEl.scrollLeft -= 100;
            }
            
            rightArrow.onclick = (e) => {
                cardsEl.scrollLeft += 100;
            }

        } else {
            arrowsEl.remove();
        }
    }
    
    static myCardsSlideshow() {
        if(cardsEl.clientWidth < cardsEl.scrollWidth) {
            this.myCardsArrow(true);
        } else {
            this.myCardsArrow(false);
        }
    }
}
