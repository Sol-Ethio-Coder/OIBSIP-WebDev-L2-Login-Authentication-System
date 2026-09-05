// auth.js — shared storage, hashing, and session helpers.
// Used by index.html (login), register.html, and dashboard.html.

const USERS_KEY = 'keyhold.users.v1';
const SESSION_KEY = 'keyhold.session.v1';

/** Turn a byte buffer into a lowercase hex string. */
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Generate a random hex salt using the Web Crypto API. */
function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return bufferToHex(bytes.buffer);
}

/** SHA-256 hash of salt+password, returned as a hex string. */
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digest);
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Could not read stored users:', err);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Could not save users:', err);
  }
}

/** Find a user by username OR email, case-insensitively. */
function findUser(identifier) {
  const needle = identifier.trim().toLowerCase();
  return getUsers().find(
    u => u.username.toLowerCase() === needle || u.email.toLowerCase() === needle
  );
}

function usernameOrEmailTaken(username, email) {
  const uname = username.trim().toLowerCase();
  const mail = email.trim().toLowerCase();
  return getUsers().some(
    u => u.username.toLowerCase() === uname || u.email.toLowerCase() === mail
  );
}

/** At least 8 characters and at least 1 digit. */
function isPasswordValid(password) {
  return password.length >= 8 && /\d/.test(password);
}

function createSession(username) {
  const session = { username, loggedInAt: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Could not read session:', err);
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
