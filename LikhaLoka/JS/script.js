// =========================================================
// script.js: all interactivity for the website
// =========================================================

// ---------- JS FEATURE: selecting DOM elements ----------
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

// ---------- 1. Dark mode toggle, remembered with localStorage ----------
function applyTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

applyTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

// ---------- 2. Mobile menu toggle ----------
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after clicking a link
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// ---------- 3. Greeting based on the time of day + live clock ----------
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 18) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}

document.getElementById("greeting").textContent = getGreeting();

const clock = document.getElementById("clock");
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000); // JS FEATURE: timers

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- 4. To-do list: arrays, objects, localStorage, dynamic elements ----------
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = task.text; // textContent prevents HTML injection
    text.title = "Click to mark as done";
    text.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.append(text, deleteBtn);
    taskList.appendChild(li);
  });

  // JS FEATURE: array methods (filter) + template literals
  const remaining = tasks.filter((t) => !t.done).length;
  taskCount.textContent = tasks.length
    ? `${remaining} of ${tasks.length} task(s) remaining`
    : "No tasks yet. Add one above!";
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();

// ---------- 5. Table: generated from data, sortable, searchable ----------
const members = [
  { name: "Alice", role: "Frontend Developer", score: 92 },
  { name: "Ben", role: "UI Designer", score: 88 },
  { name: "Carla", role: "Backend Developer", score: 95 },
  { name: "Diego", role: "Project Manager", score: 85 },
  { name: "Ella", role: "QA Tester", score: 90 },
];

const tableBody = document.querySelector("#members-table tbody");
const headers = document.querySelectorAll("#members-table th");
const searchInput = document.getElementById("table-search");

let sortKey = null;
let sortAscending = true;

function renderTable() {
  const query = searchInput.value.toLowerCase();

  // Filter by the search box
  let rows = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query)
  );

  // Sort by the chosen column
  if (sortKey) {
    rows.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      const result =
        typeof valueA === "number"
          ? valueA - valueB
          : valueA.localeCompare(valueB);
      return sortAscending ? result : -result;
    });
  }

  tableBody.innerHTML = rows.length
    ? rows
        .map((m) => `<tr><td>${m.name}</td><td>${m.role}</td><td>${m.score}</td></tr>`)
        .join("")
    : `<tr><td colspan="3">No matching members</td></tr>`;
}

headers.forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    sortAscending = sortKey === key ? !sortAscending : true;
    sortKey = key;

    headers.forEach((h) => h.classList.remove("asc", "desc"));
    th.classList.add(sortAscending ? "asc" : "desc");
    renderTable();
  });
});

searchInput.addEventListener("input", renderTable);
renderTable();

// ---------- 6. Contact form validation + modal ----------
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");

function validateField(field) {
  const valid = field.checkValidity();
  field.classList.toggle("invalid", !valid);
  return valid;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = contactForm.querySelectorAll("input, textarea");
  let allValid = true;
  fields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    return;
  }

  formStatus.textContent = "";
  const name = document.getElementById("name").value.trim();
  modalText.textContent = `Thanks, ${name}! We received your message and will reply soon.`;
  modal.hidden = false;
  contactForm.reset();
});

// Re-check a field as soon as the user edits it
contactForm.addEventListener("input", (event) => {
  if (event.target.classList.contains("invalid")) validateField(event.target);
});

function closeModal() {
  modal.hidden = true;
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal(); // click outside the box
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal(); // JS FEATURE: keyboard events
});

// ---------- 7. Scroll effects: back-to-top button + active nav link ----------
const backToTop = document.getElementById("back-to-top");
const sections = document.querySelectorAll("main section");
const navLinks = mainNav.querySelectorAll("a");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);

  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- 8. Reveal cards on scroll with IntersectionObserver ----------
const revealItems = document.querySelectorAll(".card, .faq, .figure");
revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
