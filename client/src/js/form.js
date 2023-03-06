const form = document.querySelector("form");

function preventSubmit(e) {
  e.preventDefault();
}

form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  switch(e.target.name) {
    case 'main':
      Forms.main(formData);
    break;
    case 'game':
      Forms.game(formData);
    break;
  }
};

class Forms {
  static main(formData) {
    const userName = formData.get('userName');
    server.playerEnter(userName);
  }
  
  static game(formData) {
    const quantity = formData.get("cardsQuantity");
    console.log(quantity)
    if(quantity == '') {
      game.generateCard(1);
    } else {
      game.generateCard(quantity);
    }
  }
  
}
const separatorBtn = document.querySelector('button[name="addSeparator"]');
separatorBtn.onclick = function () {
  app.prepend(document.createElement("hr"));
};

function reload() {
    window.location.reload();
}