'use strict';

var gTodos;
var gTodosFilter = 'All';
var gNextId = 100;

var TODOS_KEY = 'todosApp';


function init() {
  console.log('Todo App');
  gTodos = createTodos();
  renderCounts();
  renderTodos();
  checkNoTodos();
}


function todoClicked(elTodo, todoId) {
  var todoIdx = getTodoIdxById(todoId);
  gTodos[todoIdx].isDone = !gTodos[todoIdx].isDone;
  elTodo.classList.toggle('done');
  renderCounts();
  saveToStorage(TODOS_KEY, gTodos);
}


function deleteTodo(ev, todoId) {
  ev.stopPropagation();
  console.log('Deleting Todo', todoId);
  var getTodoIdx = getTodoIdxById(todoId);
  gTodos.splice(getTodoIdx, 1);
  renderTodos();
  renderCounts();
  saveToStorage(TODOS_KEY, gTodos);
  checkNoTodos();
}


function addTodo() {
  // console.log('Add Todo');
  var todoTxt = prompt('What do you want todo?..');
  var newTodo = createTodo(todoTxt);
  // validate to do
  if (confirm('Sure you want to add this?')) {
    gTodos.unshift(newTodo);
    renderCounts();
    // document.querySelector('.status-filter').value = 'All';
    gTodosFilter = 'All';
    renderTodos();
    saveToStorage(TODOS_KEY, gTodos);
  }
}


function setFilter(elFilter) {
  gTodosFilter = elFilter.innerText;
  renderTodos();
  checkNoTodos(gTodosFilter);
}


function renderTodos() {
  var strHTML = '';

  var todos = getTodosForDisplay();

  todos.forEach(function (todo, idx) {
    var className = todo.isDone ? 'done' : '';
    strHTML += `<li class="todo ${className}" onclick="todoClicked(this, ${todo.id})">
                ${todo.txt} <div class="btns">`;
    if (gTodosFilter === 'All') {
      // if first id => down arrow
      if (todo.id === todos[0].id) {
        strHTML += `<button class="btn arrw" onclick="moveItem(this, event, ${todo.id})")>
                    ⇓ </button>`;
        // if last id => up arrow
      } else if (todo.id === todos[todos.length - 1].id) {
        strHTML += `<button class="btn arrw" onclick="moveItem(this, event, ${todo.id})"> ⇑ </button> `;
      } else {
        // if middle tasks => both arrows
        strHTML += `<button class="btn arrw" onclick="moveItem(this, event, ${todo.id})")> ⇑ </button>
                      <button class="btn arrw" onclick="moveItem(this, event, ${todo.id})")> ⇓ </button> `;
      }
    }
    strHTML += `<button class="btn btn-danger" onclick="deleteTodo(event, ${todo.id})"> x </button>
                 </div>  
                </li>`;
  });

  document.querySelector('.todos').innerHTML = strHTML;
}


function moveItem(el, ev, todoId) {
  ev.stopPropagation();
  var idx = getTodoIdxById(todoId);
  var temp = gTodos[idx];
  if (el.innerText === '⇑') {
    gTodos[idx] = gTodos[idx - 1];
    gTodos[idx - 1] = temp;
  } else if ((el.innerText = '⇓')) {
    gTodos[idx] = gTodos[idx + 1];
    gTodos[idx + 1] = temp;
  }
  renderTodos();
}


function getTodoIdxById(id) {
  for (var i = 0; i < gTodos.length; i++) {
    if (gTodos[i].id === id) return i;
  }
}


function createTodos() {
  var todos = loadFromStorage(TODOS_KEY);
  console.log(todos);
  
  // continue from last ID in storage
  if (todos) {
    var len = todos.length;
    gNextId = (todos[len - 1].id) + 1;
    return todos;
  } else {
    todos = [];
    todos.push(createTodo('Learn Javascript'));
    todos.push(createTodo('Play with HTML5'));
    todos.push(createTodo('Master CSS'));
  }
  return todos;
}

function createTodo(txt) {
  gNextId++;
  return {
    txt: txt,
    isDone: false,
    date: createdAt(),
    importance: +prompt('How urgent is this?', '1-3'),
    id: gNextId
  };
}

function createdAt() {
  var timeNow = Date.now();
  // var dateStr ='' + new Date();
  // return dateStr.slice(0,10);
  return timeNow;
}

function renderCounts() {
  var activeCount = 0;
  gTodos.forEach(function (todo) {
    if (!todo.isDone) activeCount++;
  });

  document.querySelector('.total-count').innerText = gTodos.length;
  document.querySelector('.active-count').innerText = activeCount;
  document.querySelector('.items-left').innerText = `Items left ${activeCount}`;
}

function getTodosForDisplay() {
  var todos = [];
  gTodos.forEach(function (todo) {
    if (gTodosFilter === 'All' ||
      (gTodosFilter === 'Active' && !todo.isDone) ||
      (gTodosFilter === 'Done' && todo.isDone)) {
      todos.push(todo);
    }
  });
  return todos;
}

function checkNoTodos(filterStr) {
  var checkTodo = document.querySelectorAll('li').length;
  if (!checkTodo && filterStr) {
    if (filterStr === 'All') {
      document.querySelector('ul').innerHTML = `<span class="noTodo"> No Todos! add some? </span>`;
    } else {
      document.querySelector('ul').innerHTML = `<span class="noTodo"> No ` + filterStr + ` todos</span>`;
    }
  }
}


function sortFilter(sortParamaeter) {
  if (sortParamaeter === 'Alphabetical') {
    gTodos.sort(sortNames);
  } else if (sortParamaeter === 'Date') {
    gTodos.sort(compareDate);
  } else if (sortParamaeter === 'Importance') {
    gTodos.sort(compareImportance);
  }
  renderTodos();
}

function compareImportance(a, b) {
  var aImp = a.importance;
  var bImp = b.importance;
  return bImp - aImp;
}

// num sort - newest (biggest) to olders (smallest)
function compareDate(a, b) {
  var aDate = a.date;
  var bDate = b.date;
  return bDate - aDate;
}

// name sort
function sortNames(a, b) {
  var nameA = a.txt.toUpperCase(); // ignore upper and lowercase
  var nameB = b.txt.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}