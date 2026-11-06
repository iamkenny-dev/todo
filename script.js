// 1. FIND the elements we need (do this once, at the top)
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// 2. LISTEN for the form being submitted (click Add OR press Enter)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser reloading the page

  const text = input.value.trim(); // what the user typed, minus extra spaces
  if (text === "") return; // ignore spaces-only input

  // 3. CREATE a new <li>, put the text in it, ADD it to the list
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);

  // 4. Clear the box and put the cursor back in it, ready for the next task
  input.value = "";
  input.focus();
});
