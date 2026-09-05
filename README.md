# Keyhold — Login Authentication System

A front-end-only authentication demo: registration, login, and a protected dashboard,
built with vanilla HTML, CSS, and JavaScript.

## Features
- **Register** (`register.html`): username, email, password
  - Password must be 8+ characters with at least 1 number
  - Duplicate username/email is rejected with an error
- **Log in** (`index.html`): username-or-email + password
  - Wrong credentials show one generic error (never reveals which field was wrong)
- **Dashboard** (`dashboard.html`): protected page
  - Redirects to the login page if opened without an active session
  - Shows a logout button that clears the session and redirects
- Passwords are never stored in plain text — each one is salted and hashed with
  SHA-256 via the browser's Web Crypto API before it touches storage
- Basic validation on both forms (no empty submissions)

## Tech
No frameworks, no backend — `index.html`, `register.html`, `dashboard.html`,
`style.css`, `auth.js`, `login.js`, `register.js`, `dashboard.js`.

- User records live in `localStorage` (persist across refreshes)
- The active session lives in `sessionStorage` (clears when the tab closes)

## Important: this is a learning project, not production auth
This is a client-side demo built to practice the concepts, not a secure system:
- Everything (including password hashes) sits in the browser's `localStorage`,
  which is readable by anyone with access to that browser or its dev tools
- SHA-256 is fast by design, which makes it a poor choice for password hashing
  in a real system — real systems use a slow, purpose-built algorithm like
  bcrypt or Argon2, on a server the user can't inspect
- There's no real server-side session, CSRF protection, or rate limiting

A production version would move registration/login to a backend (e.g. Node +
Express + bcrypt, or Flask + sessions) so passwords and hashing never reach
the client at all.

## Run locally
Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy
Static site — deploys as-is to Vercel, Netlify, GitHub Pages, etc.
