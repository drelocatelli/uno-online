class ServerListen {
    preventAutoExecution = ['constructor'];
    socket;

    constructor(socket) {
        this.socket = socket;
        const allMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(f => !f.includes(this.preventAutoExecution) && typeof this[f] === 'function')
            .forEach(propName => this[propName]());
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

}

