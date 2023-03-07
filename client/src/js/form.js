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
          case 'game':
            this.game(e.target);
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
  
  static game(form) {
    let formData = new FormData(form);
    const quantity = formData.get("cardsQuantity");
    if(quantity == '') {
      game.generateCard(1);
    } else {
      game.generateCard(quantity);
    }
  }
}
Forms.define();



const separatorBtn = document.querySelector('button[name="addSeparator"]');
separatorBtn.onclick = function () {
  app.prepend(document.createElement("hr"));
};

function reload() {
    window.location.reload();
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