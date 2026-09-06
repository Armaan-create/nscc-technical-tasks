# Personal Introduction Page

A responsive one-page personal introduction, styled as a series of terminal windows — fitting for someone who builds things for a living.

## How to run it

No build step, no dependencies.

1. Clone the repo.
2. Open `index.html` in any browser.

## Features implemented

- **Name, intro, interests, and social links** — all present, laid out as terminal "windows" (`whoami`, `about.md`, `ls ./projects`, `interests.txt`, `contact.sh`) so the content and the theme reinforce each other instead of sitting in a generic template.
- **Photo placeholder**: a circular avatar in the hero section. Replace the placeholder `<span>A</span>` in `index.html` with `<img src="your-photo.jpg" alt="Your name" />` to drop in a real photo.
- **Fully responsive**: layout, type sizes, and the hero avatar reflow for mobile via a single media query; no horizontal scroll at any width.
- **Dark/Light mode toggle (brownie subtask)**: the sun/moon button in the top-right corner switches themes instantly and saves the choice to `localStorage` under the key `theme`, so it persists across refreshes. On first visit (no saved preference), it falls back to the visitor's OS-level light/dark preference.
- **Reduced-motion respected**: the blinking cursor in the footer is disabled for visitors with `prefers-reduced-motion` set.

## Additional features added beyond the brief

- OS-level theme preference detection as a fallback before any manual toggle.
- Keyboard-focusable, labelled toggle button (`aria-label`) for accessibility.

## Concepts learned / used while building this

- **CSS custom properties (`:root` variables) with an `[data-theme="dark"]` override** as a clean way to implement theming without duplicating stylesheets.
- **`localStorage`** for persisting a UI preference across sessions.
- **`window.matchMedia("(prefers-color-scheme: dark)")`** to respect the visitor's system-level preference when no explicit choice has been saved yet.
- **`prefers-reduced-motion` media query** for accessible, opt-out animation.
- Building a design system (color, type, layout) around the actual subject matter — a terminal-window motif — rather than a generic card layout, so the personality comes from the content and structure, not just decoration.

## Before submitting

- Swap the placeholder avatar for a real photo.
- Replace the `href="#"` placeholders in the Contact section with your actual GitHub, LinkedIn, and email links.
