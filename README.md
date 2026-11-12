# To-Do — Task Receipt

A to-do list app styled as a printed till receipt. Add tasks, tick them off, filter them, and they're still there when you come back.

**Live demo:** https://iamkenny-dev.github.io/todo/

![Screenshot of the To-Do app](screenshot.png)

## Features

- **Add tasks**: type and press Enter, or click Add
- **Tick tasks done**: click the box or the task text; finished tasks are struck through in red
- **Delete tasks** with the × button
- **Filter** between All, Active and Done
- **Clear done** removes every finished task at once (only shown when there's something to clear)
- **Live counter** of tasks left, with correct grammar ("1 task left", "2 tasks left")
- **Saves automatically** to the browser's localStorage, so tasks survive a refresh
- **Recovers from bad saved data** instead of crashing
- **Accessible**: labelled input, screen-reader-friendly buttons, keyboard focus styles, and reduced motion for users who turn animations off

## Built with

- HTML
- CSS (custom checkbox, CSS-only torn receipt edge, keyframe animations)
- Vanilla JavaScript (no frameworks, no libraries)

## How it works

The app follows a **state + render** pattern:

```
user action  →  update the todos array (state)  →  render() redraws the list  →  save to localStorage
```

- All tasks live in one array of objects: `{ id, text, done }`.
- `render()` is the only function that touches the list on the page. It rebuilds it from the array every time.
- One event listener on the list handles every tick and delete (**event delegation**), so it keeps working even though the list items are recreated on each render.
- User input is always inserted with `textContent`, never `innerHTML`, to prevent script injection (XSS).

## Run it locally

1. Clone the repo:
   ```bash
   git clone https://github.com/iamkenny-dev/todo.git
   ```
2. Open `index.html` in your browser, or use the **Live Server** extension in VS Code.

No install or build step is needed.

## What I learned

- Finding and creating page elements with the DOM (`getElementById`, `createElement`, `append`)
- Handling form submits and clicks with event listeners
- Event delegation with `event.target`, `closest()` and `data-` attributes
- Array methods: `push`, `filter`, `find`, `some`, `forEach`
- Saving data with `localStorage`, `JSON.stringify` and `JSON.parse`
- Handling errors with `try / catch`

## Roadmap

- [ ] Edit a task by double-clicking it
- [ ] Drag to reorder tasks
- [ ] Due dates

---

Day 2 of my 60-app challenge. See more on my [portfolio](https://iamkenny-dev.github.io/portfolio/).