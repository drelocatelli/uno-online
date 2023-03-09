class Server {
    socket;

    constructor(server, port) {
       this.changeSocket(server, port);
    }

    changeSocket(server, port = 80) {
        if(localStorage.getItem('uno-server') != null) {
            server = localStorage.getItem('uno-server');
        } else {
            localStorage.setItem('uno-server', server.concat(`:${port}`));
        }
        this.socket =  io(server.concat(`:${port}`), { transports: ['websocket', 'polling', 'flashsocket'] });
        (async() => {
            try {
                let {ip: yourIp} = await this.getMyIp();
                if(yourIp === server) {
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