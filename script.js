// ---------- Elements ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");
const filters = document.querySelector(".filters");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearDone = document.getElementById("clear-done");

// ---------- State ----------
const STORAGE_KEY = "todos";

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todos = load();
let filter = "all"; // which tasks to show: "all", "active" or "done"

// ---------- Helpers ----------
function isVisible(todo) {
  if (filter === "active") return !todo.done;
  if (filter === "done") return todo.done;
  return true; // "all"
}

// ---------- Render ----------
function render() {
  save();
  list.innerHTML = "";

  const visible = todos.filter(isVisible);

  visible.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.done) li.classList.add("done");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    const span = document.createElement("span");
    span.textContent = todo.text;

    label.append(checkbox, span);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task");

    li.append(label, del);
    list.appendChild(li);
  });

  // Empty message, so the list never looks broken
  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent =
      todos.length === 0 ? "No tasks yet. Add one above." : "Nothing here.";
    list.appendChild(empty);
  }

  const left = todos.filter((todo) => !todo.done).length;
  count.textContent = `${left} ${left === 1 ? "task" : "tasks"} left`;

  // Show which filter is selected
  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.filter === filter);
  });

  // Only show "Clear done" when there is something to clear
  clearDone.hidden = !todos.some((todo) => todo.done);
}

// ---------- Events ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  todos.push({ id: Date.now(), text: text, done: false });
  render();

  input.value = "";
  input.focus();
});

list.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") return;

  const id = Number(event.target.closest("li").dataset.id);
  const todo = todos.find((t) => t.id === id);
  todo.done = event.target.checked;

  render();
});

list.addEventListener("click", (event) => {
  if (!event.target.matches(".delete")) return;

  const id = Number(event.target.closest("li").dataset.id);
  todos = todos.filter((t) => t.id !== id);

  render();
});

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  filter = button.dataset.filter;
  render();
});

clearDone.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  render();
});

// Today's date on the receipt
document.getElementById("today").textContent = new Date().toLocaleDateString(
  "en-GB",
  {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
);

render();
