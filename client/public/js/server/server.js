class Server {
    socket;

    constructor(server, port) {
       this.changeSocket(server, port);
    }

    changeSocket(server, port = 80) {
        this.socket =  io(server.concat(`:${port}`), { transports: ['websocket', 'polling', 'flashsocket'] });
        (async() => {
            try {
                let {ip: yourIp} = await this.getMyIp();
                if(yourIp == server) {
                    yourIp = yourIp.concat(`:${port}`);
                    this.socket = io('localhost'.concat(`:${port}`), { transports: ['websocket', 'polling', 'flashsocket'] });
                }
            } catch(e) {
                console.log('unable to set localhost IP', e);
            }
        })();
    }
    
    async getMyIp() {
        const response = await fetch('https://api.ipify.org/?format=json');
        return response.json();
    }
    
}

let server = new Server('localhost', '3000');