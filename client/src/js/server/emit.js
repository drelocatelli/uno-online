class ServerEmit {
    socket;

    constructor(socket) {
        this.socket = socket;
    }

    clearData() {
        const password = prompt('Digite a senha do servidor:');
        if(password) {
            this.socket.emit('data:reset', password);
            window.location.reload();
        }
    }

    shareGlobalCard(card) {
        this.socket.emit('card:global', card, (response) => {
            console.log('card:global', response)
        });
    }

    playerEnter(playerName) {
        this.socket.emit('user:login', playerName);
        this.socket.on('user:login', (e) => {
            console.log('user:login', e);
            if(!e.isError) {
                game.openGame();
            } else {
                NotificationDOM.setNotification(e.message);
            }
        });
    }
        
}