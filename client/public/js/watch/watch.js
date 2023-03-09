// to watch file modifications then reload page
class WatchClientServer {
    debugMode = false;
    
    static socket() {
        return io(`ws://${window.location.host}`, { transports: ['websocket', 'polling', 'flashsocket'] });
    }

    socket() {
        return WatchClientServer.socket();
    }
    
    constructor() {
        this.running(); 
        this.saveStateDebug();
    }
    
    running() {
        this.socket().on('reload', () => {
            console.log('Reload event...');
            window.location.reload();
        });
    }

    saveStateDebug() {
        this.socket().on('debugMode', (state) => {
            console.log('Debug mode:', JSON.parse(state))
            this.debugMode = JSON.parse(state);
        });
    }
    
}

new WatchClientServer();