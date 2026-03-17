const xolat = document.getElementById("status");
const todo = document.querySelector(".todo");
const loading = document.querySelector(".loading")

let todos = [];

async function getTodos() {
    loading.innerHTML = "";

    let res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
    let data = await res.json();

    todos = data;

    showIds("all");
}
getTodos();


function Todos(arr) {
    todo.innerHTML = "";

    arr.forEach((todoItem) => {
        const item = document.createElement("div");

        item.innerHTML = `
          <div class="item">
            <span class = "id" >${todoItem.id}</span>
            <span class = "title">${todoItem.title}</span>
            <span <span class="completed ${todoItem.completed ? 'green' : 'red'}" >${todoItem.completed}</span>
          </div>
        `;

        todo.append(item);
    });
}

function showIds(value) {
    if (value === "all") {
        Todos(todos);
    } else if (value === "done") {
        let doneTodos = todos.filter(todoItem => todoItem.completed === true);
        Todos(doneTodos);
    } else if (value === "not_done") {
        let notDoneTodos = todos.filter(todoItem => todoItem.completed === false);
        Todos(notDoneTodos);
    }
}

xolat.addEventListener("change", function () {
    showIds(this.value);
});