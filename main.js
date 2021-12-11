//obtendo todos os elementos necessários
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todolist = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
  let userData = inputBox.value; //obtendo o valor inserido pelo user

  if (userData.trim() != 0) {
    //se os valores do usuário não são apenas espaços
    addBtn.classList.add('active'); //ativa o o botão "+" qndo é digitado algo
  } else {
    addBtn.classList.remove('active'); //inativa o o botão "+" qndo deixa o espaço em branco
  }
};

showTasks();

//Se o user clicar no btn "+"
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem('New Todo'); //obtendo o localStorage

  if (getLocalStorage == null) {
    //se o localStorage for null
    listArr = []; //criando um array vazio
  } else {
    listArr = JSON.parse(getLocalStorage); //transforma JSON string em um objeto js
  }

  listArr.push(userData); //adicionando o dado do user
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforma o objeto js em um JSON string. setItem() gravar os valores dentro do localStorage no browser do usuário

  showTasks(); //chama essa funcão dentro desta, p/ mostrar as tasks
  addBtn.classList.remove('active'); //inativa o o botão "+" qndo deixa o espaço em branco
};

//função p/ add uma task na lista ul
function showTasks() {
  let getLocalStorage = localStorage.getItem('New Todo');

  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  const pedingNumb = document.querySelector('.pendingNumb');
  pedingNumb.textContent = listArr.length; //passando o tamanho/qntdd do valor em pedingNumb

  if (listArr.length > 0) {
    //se o array for maior q 0
    deleteAllBtn.classList.add('active'); //então ativa o botão
  } else {
    deleteAllBtn.classList.remove('active'); //do contrário, inativa
  }

  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})"; ><i class="fas fa-trash-alt"></i></span></li>`;
  });

  todolist.innerHTML = newLiTag; //add uma nova tag li dentro da tag ul no html
  inputBox.value = ''; //dps q a task é add esse módulo deixa o campo em branco novamente
}

//função p/ deletar task
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem('New Todo');
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //remove a task particular
  //dps de remover a task (li), o localStorage é atualizado
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //object => string

  showTasks(); //chama a função
}

//função deleta tudas as tasks
deleteAllBtn.onclick = () => {
  listArr = []; //esvazia a array
  //dps de deletar tudo, o localStorage é atualizado
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //object => string

  showTasks(); //chama a função
};
