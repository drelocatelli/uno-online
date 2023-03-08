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
  }
  
  static main(form) {
    let formData = new FormData(form);
    const userName = formData.get('userName');
    server.playerEnter(userName);
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
  server.clearData();
};