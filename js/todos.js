const modalBoxEl = document.querySelector(".modal-box"),
  alarmBtn = document.querySelector(".alarm"),
  closeBtn = modalBoxEl.querySelector(".close-btn"),
  addGroupBtn = modalBoxEl.querySelector(".group-add-btn"),
  groupListArea = modalBoxEl.querySelector(".group-list"),
  groupListUl = groupListArea.querySelector("ul"),
  listUl = groupListArea.querySelector(".list"),
  todosAreaEl = document.querySelector(".todos-area"),
  listEl = todosAreaEl.querySelector(".list"),
  noListEl = todosAreaEl.querySelector(".no-list"),
  todosFormEl = todosAreaEl.querySelector("form"),
  todosInputEl = todosFormEl.querySelector("input"),
  todosAddBtn = todosAreaEl.querySelector("button");
let todos = [];
const LS_TODOS = "todos";
let TOTAL_CNT = 0;
let TODO_CNT = 0;
let FINISH_CNT = 0;
let ACTIVE_GROUP_ID = "";
function getNewGroup(groupName) {
  const id = [new Date().getTime()] + [todos.length + 1];
  return {
    id,
    name: groupName,
    todos: [],
  };
}
function getNewTodo(groupId, todoName) {
  const id = [new Date().getTime()] + [groupId];
  return {
    id,
    name: todoName,
    done: false,
  };
}
function groupSelectHandler(e) {
  const id = e.target.dataset.id;
  Array.from(groupListUl.children).forEach((element) => {
    removeClass(element, ACTIVE_CLASS);
  });
  e.target.classList.add(ACTIVE_CLASS);
  ACTIVE_GROUP_ID = id;
  drawingTodo(id);
}
function drawingTodoGroups() {
  groupListUl.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerText = todo.name;
    li.dataset.id = todo.id;
    if (todo.id === ACTIVE_GROUP_ID) addClass(li, ACTIVE_CLASS);
    groupListUl.appendChild(li);
    li.addEventListener("click", groupSelectHandler);
  });
}

function toggleDoneHandler(e) {
  const todoId = e.target.dataset.id;
  console.log(todoId);
  todos.map((group) => {
    group.todos.map((todo) =>
      todo.id === todoId ? (todo.done = !todo.done) : todo
    );
  });
  setTodos();
  drawingTodo(ACTIVE_GROUP_ID);
}

function deleteHandler(e) {
  const todoId = e.target.dataset.id;
  todos.map((group) => {
    group.todos = group.todos.filter((todo) => todo.id !== todoId);
  });
  setTodos();
  drawingTodo(ACTIVE_GROUP_ID);
}
function getTodoCount() {
  TOTAL_CNT = 0;
  TODO_CNT = 0;
  FINISH_CNT = 0;
  todos.map((group) => {
    group.todos.filter((todo) => {
      TOTAL_CNT += 1;
      todo.done ? FINISH_CNT++ : TODO_CNT++;
    });
  });
  Array.from(document.getElementsByClassName("total-cnt")).forEach(
    (element) => {
      element.innerText = TOTAL_CNT;
    }
  );
  Array.from(document.getElementsByClassName("todo-cnt")).forEach((element) => {
    element.innerText = TODO_CNT;
  });
  Array.from(document.getElementsByClassName("finish-cnt")).forEach(
    (element) => {
      element.innerText = FINISH_CNT;
    }
  );
}
function drawingTodo(id) {
  const group = todos.filter((group) => id === group.id)[0];
  getTodoCount();
  addClass(noListEl, DP_NONE_CLASS);
  removeClass(listEl, DP_NONE_CLASS);
  const todoList = todosAreaEl.querySelector(".todo-list-todo");
  const finishList = todosAreaEl.querySelector(".todo-list-finish");
  const todoListUl = todoList.querySelector("ul");
  const finishListUl = finishList.querySelector("ul");
  todoListUl.innerHTML = "";
  finishListUl.innerHTML = "";

  group.todos.forEach((todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const firstBtn = document.createElement("button");
    const secondBtn = document.createElement("button");
    addClass(span, "name");
    span.innerText = todo.name;
    addClass(firstBtn, "todo-btn");

    addClass(secondBtn, "delete-btn");
    secondBtn.innerText = "❌";
    todo.done ? (firstBtn.innerHTML = "🔺") : (firstBtn.innerHTML = "🔻");
    firstBtn.dataset.id = todo.id;
    secondBtn.dataset.id = todo.id;
    li.appendChild(span);
    li.appendChild(firstBtn);
    li.appendChild(secondBtn);

    firstBtn.addEventListener("click", toggleDoneHandler);
    secondBtn.addEventListener("click", deleteHandler);
    if (todo.done) {
      finishListUl.append(li);
    } else {
      todoListUl.append(li);
    }
  });
}
function setTodos() {
  localStorage.setItem(LS_TODOS, JSON.stringify(todos));
}

function getTodos() {
  todos = localStorage.getItem(LS_TODOS);
  todos = todos ? JSON.parse(todos) : [];
}

function addGroupHandler() {
  const groupName = prompt("그룹명을 입력하세요");
  if (!groupName) return;
  todos.push(getNewGroup(groupName));
  setTodos();
  drawingTodoGroups();
}
function addTodo() {
  const todoName = todosInputEl.value;
  if (!todoName) return;
  todos.map((group) => {
    if (group.id === ACTIVE_GROUP_ID) {
      if (!group.todos) group.todos = [];
      group.todos.push(getNewTodo(ACTIVE_GROUP_ID, todoName));
    }
  });
  todosInputEl.value = "";
  todosInputEl.focus();
  setTodos();
  drawingTodoGroups();
  drawingTodo(ACTIVE_GROUP_ID);
}
function formSubmitHandler(e) {
  e.preventDefault();
  addTodo();
}
function closeModal() {
  removeClass(modalBoxEl, ACTIVE_CLASS);
  removeClass(alarmBtn, ACTIVE_CLASS);
}
function openModal() {
  addClass(modalBoxEl, ACTIVE_CLASS);
  addClass(alarmBtn, ACTIVE_CLASS);
}
function todosInit() {
  getTodos();
  drawingTodoGroups();
  getTodoCount();
  addGroupBtn.addEventListener("click", addGroupHandler);
  todosFormEl.addEventListener("submit", formSubmitHandler);
  todosAddBtn.addEventListener("click", addTodo);
  closeBtn.addEventListener("click", closeModal);
  alarmBtn.addEventListener("click", openModal);
}

todosInit();
