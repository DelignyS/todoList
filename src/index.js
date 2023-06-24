import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");
console.log(form, input);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "To do",
    done: false,
    editMode: true,
  },
  {
    text: "Doing some JS",
    done: true,
    editMode: false,
  },
];

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return creatTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("delete");
  buttonDelete.innerHTML = "Delete";
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonEdit.classList.add("edit");

  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.setAttribute('data-index', index);
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
    `;
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);
  return li;
};

const creatTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.classList.add("save");
  buttonSave.innerHTML = "Save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.classList.add("cancel");
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", (event) => {
    editTodo(index, input);
  });
  li.append(input, buttonCancel, buttonSave);
  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  const todo = todos[index];
  const taskElement = document.querySelector(`li[data-index="${index}"]`);

  if (todo.done) {
    todos.splice(index, 1);
    displayTodo();
  } else {
    taskElement.classList.add("shake");

    setTimeout(() => {
      taskElement.classList.remove("shake");
    }, 500);
  }
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};
const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();

function enableDarkMode() {
  document.body.classList.add("dark-mode");
}
function disableDarkMode() {
  document.body.classList.remove("dark-mode");
}

const darkModeToggle = document.getElementById("dark-mode-toggle");

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

darkModeToggle.addEventListener("click", toggleDarkMode);
