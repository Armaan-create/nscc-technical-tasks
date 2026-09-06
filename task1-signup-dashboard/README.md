# Signup Form with Validation and Dashboard

A small client-side web app: sign up with a username, email and password, and see every account that's signed up in a live dashboard table.

## Live demo

🔗 [View deployed page](https://armaan-create.github.io/nscc-technical-tasks/task1-signup-dashboard/)

## How to run it

No build step, no server, no dependencies.

1. Clone the repo.
2. Open `index.html` directly in a browser (double-click it, or right-click → Open With → your browser).

That's it — everything runs client-side.

## Features implemented

- **Signup form** with three fields: username, email, password.
- **Validation on submit**:
  - Username must not be empty.
  - Email must match a proper email pattern (checked with a regex).
  - Password must be at least 6 characters.
  - Inline error messages appear under the specific field that failed, and the field is marked `aria-invalid` for screen readers.
- **Password hashing**: the password is never stored in plain text. It's hashed with SHA-256 (via the browser's built-in `crypto.subtle` API) before it's saved, so `localStorage` only ever holds a hash.
- **Persistence**: valid signups are stored in `localStorage` under the key `signup_users`, so accounts survive a page refresh.
- **Dashboard table**: every stored account is rendered in a table with Username, Email, and a truncated view of the password hash (hover over it to see the full hash in a tooltip).
- **Delete button (brownie subtask)**: each row has a Delete button that removes that account from `localStorage` and re-renders the table immediately.

## Additional features added beyond the brief

- Live account counter above the table ("N accounts").
- Empty-state message when there are no accounts yet, instead of a blank table.
- Keyboard-accessible focus states and `role="alert"` on error messages.

## Concepts learned / used while building this

- **Web Crypto API** (`crypto.subtle.digest`) for one-way password hashing entirely in the browser, with no server or external library.
- **`localStorage`** as a simple persistence layer, including reading/writing JSON safely (wrapped in try/catch for corrupted or missing data).
- **Form validation patterns**: per-field error state, `aria-invalid` for accessibility, and preventing the default form submission to control the flow with JavaScript.
- **Event delegation avoided in favor of per-row listeners** for the delete button, since rows are recreated on every render — kept the code simple and easy to reason about at this scale.

## Notes

- Passwords are irreversibly hashed — the app cannot ever display or recover a user's original password, which is intentional and matches real-world practice (never store plain-text passwords).
- This is a front-end demo only; there's no real backend or authentication — it's meant to demonstrate validation, hashing, and localStorage-based state.
