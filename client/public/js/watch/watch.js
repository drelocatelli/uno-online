// to watch file modifications then reload page
class Watch {
    socket;
    
    constructor() {
        this.socket = io(`ws://${window.location.host}`, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.running();
    }
    
    running() {
        this.socket.on('reload', () => {
            console.log('Reload event...');
            window.location.reload();
        });
    }
    
}

new Watch();