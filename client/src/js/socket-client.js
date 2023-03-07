class Server {
    socket;
    
    constructor(server) {
        this.socket =  io(server, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.listenOnConnectOrDisconnect();
        this.listenOnPlayerEnter();
        this.listenOnPlayerLeave();
    }

    listenOnConnectOrDisconnect() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    playerEnter(playerName) {
        this.socket.emit('user:login', playerName);
        this.socket.on('user:login', (e) => {
            console.log('user:login', e);
            if(!e.isError) {
                game.openGame();
            } else {
                this.setNotificationDOM(e.message);
            }
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

    setNotificationDOM(text) {
        notificationBar.style.opacity = 1;
        notificationBar.style.pointerEvents = 'all';
        notificationBar.innerHTML = text;
        setTimeout(() => {
            notificationBar.style.pointerEvents = 'none';
            notificationBar.style.opacity = 0;
        }, 1800);
    }

}

const server = new Server('ws://localhost:3000');