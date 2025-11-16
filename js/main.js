
// // Simple To-Do app with localStorage
// // Features: add, remove, mark done, edit, search filter, delete all, counter

// const form = document.getElementById('task-form');
// const input = document.getElementById('task-input');
// const taskList = document.getElementById('task-list');
// const totalSpan = document.getElementById('total');
// const searchInput = document.getElementById('search-input');
// const clearAllBtn = document.getElementById('clear-all');

// let tasks = [];

// // localStorage key
// const STORAGE_KEY = 'todo_tasks_v1';

// // ---------- Helpers ----------
// function saveTasks() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
// }

// function loadTasks() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   tasks = raw ? JSON.parse(raw) : [];
// }

// function uid() {
//   // simple id
//   return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
// }

// function updateSummary() {
//   totalSpan.textContent = `Total tasks: ${tasks.length}`;
// }

// function createTaskElement(task) {
//   const li = document.createElement('li');
//   li.className = 'task-item';
//   li.dataset.id = task.id;

//   // checkbox
//   const cb = document.createElement('button');
//   cb.type = 'button';
//   cb.className = 'checkbox';
//   cb.setAttribute('aria-label', task.done ? 'Mark as not done' : 'Mark as done');
//   cb.innerHTML = task.done ? '✔' : '';

//   // text
//   const text = document.createElement('div');
//   text.className = 'task-text' + (task.done ? ' done' : '');
//   text.textContent = task.text;
//   text.title = 'Double click to edit';

//   // actions
//   const actions = document.createElement('div');
//   actions.className = 'task-actions';

//   const editBtn = document.createElement('button');
//   editBtn.className = 'icon-btn';
//   editBtn.type = 'button';
//   editBtn.title = 'Edit';
//   editBtn.textContent = '✎';

//   const delBtn = document.createElement('button');
//   delBtn.className = 'icon-btn';
//   delBtn.type = 'button';
//   delBtn.title = 'Delete';
//   delBtn.textContent = '🗑';

//   actions.appendChild(editBtn);
//   actions.appendChild(delBtn);

//   li.appendChild(cb);
//   li.appendChild(text);
//   li.appendChild(actions);

//   // ----- events -----
//   cb.addEventListener('click', () => {
//     task.done = !task.done;
//     saveTasks();
//     renderTasks();
//   });

//   delBtn.addEventListener('click', () => {
//     tasks = tasks.filter(t => t.id !== task.id);
//     saveTasks();
//     renderTasks();
//   });

//   // edit via button
//   editBtn.addEventListener('click', () => {
//     makeEditable(text, task);
//   });

//   // edit via double click
//   text.addEventListener('dblclick', () => {
//     makeEditable(text, task);
//   });

//   return li;
// }

// function makeEditable(textNode, task) {
//   const current = task.text;
//   const input = document.createElement('input');
//   input.type = 'text';
//   input.value = current;
//   input.style.width = '100%';
//   input.style.padding = '6px';
//   input.style.borderRadius = '6px';
//   input.style.border = '1px solid #e6e9ef';
//   textNode.replaceWith(input);
//   input.focus();
//   // save on blur or Enter
//   function save() {
//     const v = input.value.trim();
//     if (v) {
//       task.text = v;
//       saveTasks();
//     } else {
//       // if empty treat as delete
//       tasks = tasks.filter(t => t.id !== task.id);
//       saveTasks();
//     }
//     renderTasks();
//   }
//   input.addEventListener('blur', save);
//   input.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       input.blur();
//     } else if (e.key === 'Escape') {
//       renderTasks();
//     }
//   });
// }

// // render with optional filter
// function renderTasks(filter = '') {
//   // case-insensitive
//   const q = filter.trim().toLowerCase();
//   taskList.innerHTML = '';
//   const filtered = tasks.filter(t => t.text.toLowerCase().includes(q));
//   if (filtered.length === 0) {
//     const empty = document.createElement('div');
//     empty.className = 'empty';
//     empty.style.color = 'var(--muted)';
//     empty.style.padding = '8px';
//     empty.textContent = q ? 'Hech narsa topilmadi.' : 'Vazifa yo‘q. Yangi vazifa qo‘shing!';
//     taskList.appendChild(empty);
//   } else {
//     for (const t of filtered) {
//       taskList.appendChild(createTaskElement(t));
//     }
//   }
//   updateSummary();
// }

// // ---------- Events ----------
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const text = input.value.trim();
//   if (!text) return;
//   const newTask = { id: uid(), text, done: false, createdAt: Date.now() };
//   tasks.unshift(newTask); // newest on top
//   saveTasks();
//   input.value = '';
//   renderTasks(searchInput.value);
// });

// searchInput.addEventListener('input', () => {
//   renderTasks(searchInput.value);
// });

// clearAllBtn.addEventListener('click', () => {
//   if (!tasks.length) return;
//   const ok = confirm('Haqiqatan ham barcha vazifalarni oʻchiribsizmi?');
//   if (!ok) return;
//   tasks = [];
//   saveTasks();
//   renderTasks();
// });

// // keyboard: focus add input on '/'
// document.addEventListener('keydown', (e) => {
//   if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== input) {
//     e.preventDefault();
//     input.focus();
//   }
// });

// // init
// loadTasks();
// renderTasks();













// Simple To-Do app with localStorage
// Features: add, remove, mark done, edit, search filter, delete all, counter

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalSpan = document.getElementById('total');
const searchInput = document.getElementById('search-input');
const clearAllBtn = document.getElementById('clear-all');

let tasks = [];

// localStorage key
const STORAGE_KEY = 'todo_tasks_v1';

// ----------- LOCAL STORAGE FUNCTIONS ------------

// load tasks
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("LocalStorage error:", e);
    tasks = [];
  }
}

// save tasks
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
}

// ------------------------------------------------

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function updateSummary() {
  totalSpan.textContent = `Total tasks: ${tasks.length}`;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id;

  const cb = document.createElement('button');
  cb.type = 'button';
  cb.className = 'checkbox';
  cb.innerHTML = task.done ? '✔' : '';

  const text = document.createElement('div');
  text.className = 'task-text' + (task.done ? ' done' : '');
  text.textContent = task.text;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'icon-btn';
  editBtn.textContent = '✎';

  const delBtn = document.createElement('button');
  delBtn.className = 'icon-btn';
  delBtn.textContent = '🗑';

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(cb);
  li.appendChild(text);
  li.appendChild(actions);

  cb.addEventListener('click', () => {
    task.done = !task.done;
    saveTasks();
    renderTasks(searchInput.value);
  });

  delBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderTasks(searchInput.value);
  });

  editBtn.addEventListener('click', () => {
    editTask(text, task);
  });

  text.addEventListener('dblclick', () => {
    editTask(text, task);
  });

  return li;
}

function editTask(textNode, task) {
  const input = document.createElement('input');
  input.value = task.text;
  input.style.width = '100%';

  textNode.replaceWith(input);
  input.focus();

  function save() {
    const v = input.value.trim();
    if (v) {
      task.text = v;
    } else {
      tasks = tasks.filter(t => t.id !== task.id);
    }
    saveTasks();
    renderTasks(searchInput.value);
  }

  input.addEventListener('blur', save);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') renderTasks();
  });
}

function renderTasks(filter = '') {
  taskList.innerHTML = '';

  const q = filter.toLowerCase();
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(q));

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.style.color = '#888';
    empty.textContent = q ? "Hech narsa topilmadi" : "Vazifalar yo‘q";
    taskList.appendChild(empty);
  } else {
    filtered.forEach(task => {
      taskList.appendChild(createTaskElement(task));
    });
  }

  updateSummary();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({ id: uid(), text, done: false });
  saveTasks();

  input.value = '';
  renderTasks(searchInput.value);
});

searchInput.addEventListener('input', () => {
  renderTasks(searchInput.value);
});

clearAllBtn.addEventListener('click', () => {
  if (confirm("Hammasini o‘chirasizmi?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Init
loadTasks();
renderTasks();
