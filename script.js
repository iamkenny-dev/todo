// ---------- Elements ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");

// ---------- State: the single source of truth ----------

function render() {
  save(); // every change ends with render(), so saving here never misses one
  list.innerHTML = "";
  // ...rest stays the same
  
// let todos = [];

const STORAGE_KEY = "todos"; // the name of our "box" in localStorage

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : []; // nothing saved yet? start empty
  } catch {
    return []; // saved data is broken? start empty instead of crashing
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todos = load();

// ---------- Render: draw the page FROM the data ----------
function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id; // stick the task's id on the <li>
    if (todo.done) li.classList.add("done"); // add a CSS class if finished

    // Checkbox + text, wrapped in a <label> so clicking the text also ticks the box
    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    const span = document.createElement("span");
    span.textContent = todo.text;

    label.append(checkbox, span);

    // Delete button
    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task"); // screen readers say this instead of "×"

    li.append(label, del);
    list.appendChild(li);
  });

  const left = todos.filter((todo) => !todo.done).length;
  count.textContent = `${left} ${left === 1 ? "task" : "tasks"} left`;
}

// ---------- Events: change the data, then render ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  todos.push({
    id: Date.now(), // a unique number for this task (milliseconds since 1970)
    text: text,
    done: false,
  });

  render();

  input.value = "";
  input.focus();
});


// Tick / untick a task
list.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") return; // only care about checkboxes

  const id = Number(event.target.closest("li").dataset.id);
  const todo = todos.find((t) => t.id === id);
  todo.done = event.target.checked;

  render();
});

// Delete a task
list.addEventListener("click", (event) => {
  if (!event.target.matches(".delete")) return; // only care about delete buttons

  const id = Number(event.target.closest("li").dataset.id);
  todos = todos.filter((t) => t.id !== id); // keep every task EXCEPT this one

  render();
});

render(); // draw once on page load
