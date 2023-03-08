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
            game.giveMeCards(10);
        });
    }

}
