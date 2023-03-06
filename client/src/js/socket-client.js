class Server {
    socket;
    
    constructor(server) {
        this.socket =  io(server, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.onConnectOrDisconnect();
        this.onPlayerEnter();
    }

    onConnectOrDisconnect() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    playerEnter(playerName) {
        this.socket.emit('user:login', playerName);
    }

    onPlayerEnter() {
        this.socket.on('user:logged', (e) => {
            console.log('user logged', e);
        });
    }

}

const server = new Server('ws://localhost:3000');