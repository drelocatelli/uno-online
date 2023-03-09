window.onload = boot;

function boot() {
    try {
        console.log('boot');
        new ServerListen(server.socket);

    } catch(err) {
        console.log(err);
        alert('Não foi possível inicializar o jogo, tente novamente');
    }
}
