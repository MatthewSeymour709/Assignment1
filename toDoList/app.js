const url = "https://jsonplaceholder.typicode.com/";
const userSelect = document.getElementById("userSelect");
const todoRows = document.getElementById("todoRows");

async function loadToDoUser(userId) {
    const response = await fetch (url + "todos/?userId=" + userId);
    const toDos = await response.json();

    todoRows.innerHTML = toDos
        .map(todo => `
            <div class="row">
                <div class="todoText">${todo.title}</div>
                <div class="todoDone">${todo.completed}</div>
            </div>
        `).join("");
}

async function init() {
    const response = await fetch(url + "users"); 
    const users = await response.json();

    userSelect.innerHTML = users
        .map(user => `<option value="${user.id}">${user.name}</option>`)
        .join("");
    const firstUserId = userSelect.options[0]?.value;
    if (firstUserId) await loadToDoUser(firstUserId);

    userSelect.addEventListener("change", async () => {
        try {
            await loadToDoUser(userSelect.value);
        } catch (err) {
            todoRows.innerHTML = `<div class="row"><div class="todoText">Error loading todos.</div><div></div></div>`;
            console.error(err);
        }
    });
}

init().catch(err => {
  todoRows.innerHTML = `<div class="row"><div class="todoText">Error loading users/todos.</div><div></div></div>`;
  console.error(err);
});

/*
const API = "https://jsonplaceholder.typicode.com";

const userSelect = document.getElementById("userSelect");
const todoRows = document.getElementById("todoRows");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

function renderTodos(todos) {
  todoRows.innerHTML = todos.map(t => `
    <div class="row">
      <div class="todoText">${escapeHtml(t.title)}</div>
      <div class="todoDone">${t.completed}</div>
    </div>
  `).join("");
}

async function loadTodosForUser(userId) {
  todoRows.innerHTML = "";
  const todos = await fetchJson(`${API}/todos/?userId=${encodeURIComponent(userId)}`);
  renderTodos(todos);
}

async function init() {
  const users = await fetchJson(`${API}/users`);

  userSelect.innerHTML = users
    .map(u => `<option value="${u.id}">${escapeHtml(u.name)}</option>`)
    .join("");

  const firstUserId = userSelect.options[0]?.value;
  if (firstUserId) await loadTodosForUser(firstUserId);

  userSelect.addEventListener("change", async () => {
    try {
      await loadTodosForUser(userSelect.value);
    } catch (err) {
      todoRows.innerHTML = `<div class="row"><div class="todoText">Error loading todos.</div><div></div></div>`;
      console.error(err);
    }
  });
}

init().catch(err => {
  todoRows.innerHTML = `<div class="row"><div class="todoText">Error loading users/todos.</div><div></div></div>`;
  console.error(err);
});
*/