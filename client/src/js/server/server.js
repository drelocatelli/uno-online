class Server {
    socket;
    
    constructor(server) {
        this.socket =  io(server, { transports: ['websocket', 'polling', 'flashsocket'] });
    }

    setNotificationDOM(text) {
        notificationBar.style.opacity = 1;
        notificationBar.style.pointerEvents = 'all';
        notificationBar.innerHTML = text;
        setTimeout(() => {
            notificationBar.style.pointerEvents = 'none';
            notificationBar.style.opacity = 0;
        }, 5000);
    }

}

const server = new Server('ws://localhost:3000');