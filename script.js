// ---------- Elements ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");

// ---------- State: the single source of truth ----------
let todos = [];

// ---------- Render: draw the page FROM the data ----------
function render() {
  list.innerHTML = ""; // wipe the old list (safe: we're inserting nothing)

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
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

render(); // draw once on page load
