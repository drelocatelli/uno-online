class ServerListen {
    socket;
    preventAutoExecution = ['constructor'];

    constructor(socket) {
        this.socket = socket;

        // auto execute all methods listed
        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(f => !f.includes(this.preventAutoExecution) && typeof this[f] === 'function')
            .forEach(propName => this[propName]());
    }

    listenGlobalNotification() {
        this.socket.on('notification', (e) => {
            NotificationDOM.setNotification(e);
        });
    }

    listenDataReset() {
        this.socket.on('data:resetError', (e) => {
            NotificationDOM.setNotification(e);
        });
        this.socket.on('data:reset', (e) => {
            NotificationDOM.setNotification(e);
        }); 
    }

    listenOnConnectOrDisconnect() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
            NotificationDOM.setNotification('Servidor conectado');
            WatchClientServer.socket().emit('started', true, (response) => {
                const mainForm = document.querySelector('form[data-form="main"]');
                if(JSON.parse(response.debugMode)) {
                    mainForm[0].value = 'debugUser_'.concat(Math.floor(Math.random() * 501));
                    setTimeout(() => {
                        mainForm[1].click();
                    }, 300);
                }
            });
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    listenOnPlayerEnter() {
        this.socket.on('user:logged', (e) => {
            NotificationDOM.setNotification(e.message);
            console.log('user:logged', e);
        });
    }

    listenOnPlayerLeave() {
        this.socket.on('user:logout', (e) => {
            console.log(e);
            NotificationDOM.setNotification(e.message);
        });
    }

    listenOnCardGlobalShared() {
        this.socket.on('card:global', (e) => {
            console.log('card:global', e);
            game.syncGlobalCard(e);
        });
    }

    listenSharedPlayerCard() {
        // when game started, give 7 cards for player
        game.giveMeCards(7);
        this.socket.on('card:user-count', (cardsQuantity) => {
            if(cardsQuantity != game.playerCards) {
                game.giveMeCards(cardsQuantity);
            }
        });
    }

    listenOtherUsersCard() {
        // this.socket.on('users:all', (response) => {
        // });
    }

}
