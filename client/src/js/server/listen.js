class ServerListen extends Server {
    socket;

    constructor(socket) {
        this.socket = socket;
    }
    
    listenDataReset() {
        this.socket.on('data:resetError', (e) => {
            this.setNotificationDOM(e);
        });
        this.socket.on('data:reset', (e) => {
            this.setNotificationDOM(e);
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
            this.setNotificationDOM(e.message);
            console.log('user:logged', e);
        });
    }

    listenOnPlayerLeave() {
        this.socket.on('user:logout', (e) => {
            console.log(e);
            this.setNotificationDOM(e.message);
        });
    }

}

