// ---- Config ----
const STORAGE_KEY = "signup_users";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- DOM refs ----
const form = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errUsername = document.getElementById("err-username");
const errEmail = document.getElementById("err-email");
const errPassword = document.getElementById("err-password");
const formStatus = document.getElementById("form-status");
const tableBody = document.getElementById("user-table-body");
const emptyState = document.getElementById("empty-state");
const userCount = document.getElementById("user-count");

// ---- Storage helpers ----
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// ---- Hashing (SHA-256 via Web Crypto, no external deps) ----
async function hashPassword(plainText) {
  const encoded = new TextEncoder().encode(plainText);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---- Validation ----
function validate(username, email, password) {
  let valid = true;

  if (!username.trim()) {
    errUsername.textContent = "Username can't be empty.";
    usernameInput.setAttribute("aria-invalid", "true");
    valid = false;
  } else {
    errUsername.textContent = "";
    usernameInput.removeAttribute("aria-invalid");
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    errEmail.textContent = "Enter a valid email address.";
    emailInput.setAttribute("aria-invalid", "true");
    valid = false;
  } else {
    errEmail.textContent = "";
    emailInput.removeAttribute("aria-invalid");
  }

  if (password.length < 6) {
    errPassword.textContent = "Password needs at least 6 characters.";
    passwordInput.setAttribute("aria-invalid", "true");
    valid = false;
  } else {
    errPassword.textContent = "";
    passwordInput.removeAttribute("aria-invalid");
  }

  return valid;
}

// ---- Rendering ----
function renderTable() {
  const users = getUsers();
  tableBody.innerHTML = "";

  userCount.textContent = `${users.length} account${users.length === 1 ? "" : "s"}`;
  emptyState.style.display = users.length ? "none" : "block";

  users.forEach((user) => {
    const row = document.createElement("tr");

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;

    const passwordCell = document.createElement("td");
    passwordCell.className = "mono";
    passwordCell.textContent = user.passwordHash.slice(0, 16) + "…";
    passwordCell.title = user.passwordHash;

    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteUser(user.id));
    actionCell.appendChild(deleteBtn);

    row.append(usernameCell, emailCell, passwordCell, actionCell);
    tableBody.appendChild(row);
  });
}

function deleteUser(id) {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
  renderTable();
}

// ---- Form submit ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  formStatus.textContent = "";

  if (!validate(username, email, password)) return;

  const passwordHash = await hashPassword(password);

  const users = getUsers();
  users.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    username: username.trim(),
    email: email.trim(),
    passwordHash,
  });
  saveUsers(users);

  form.reset();
  formStatus.textContent = "Account created.";
  renderTable();
});

// ---- Init ----
renderTable();
