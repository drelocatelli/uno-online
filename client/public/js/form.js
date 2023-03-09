function preventSubmit(e) {
  e.preventDefault();
}

class Forms {
  static define() {
    const forms = document.querySelectorAll('form');
    for(let form of forms) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        switch(e.target.dataset.form) {
          case 'main':
            this.main(e.target);
          break;
        }
      });
    }
    this.changeServer();
  }
  
  static main(form) {
    let formData = new FormData(form);
    const userName = formData.get('userName');
    new ServerEmit(server.socket).playerEnter(userName);
  }

  static changeServer() {
    document.querySelector('button[name="changeServer"]').onclick = function() {
      const serverIp = prompt("Digite o IP/URL do servidor");
      if(serverIp.length > 0) {
        localStorage.setItem('uno-server', serverIp);
        window.location.reload();
      }
    }
    
  }
}
Forms.define();

function reload() {
  const confirmReload = confirm('Deseja realmente sair?');
  if(confirmReload) {
    window.location.reload();
  }
}


/**
 * NOTIFICATIONS ------------------------------------
 */

const notificationBar = document.querySelector('.notification-bar');
notificationBar.onclick = (e) => {
  notificationBar.style.pointerEvents = 'none';
  notificationBar.style.opacity = 0;
};

document.querySelector('button[name=clearUsers]').onclick = (e) => {
  new ServerEmit(server.socket).clearData();
};