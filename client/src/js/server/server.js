class Server {
    socket;
    
    constructor(server) {
        this.socket =  io(server, { transports: ['websocket', 'polling', 'flashsocket'] });
    }
    
}

const server = new Server('ws://localhost:3000');
const listen = new ServerListen(server.socket);