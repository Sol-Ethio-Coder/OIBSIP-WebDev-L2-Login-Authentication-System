(function () {
  'use strict';

  const form = document.getElementById('registerForm');
  const messageEl = document.getElementById('formMessage');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = 'message is-visible message--' + type;
  }

  function hideMessage() {
    messageEl.className = 'message';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!username || !email || !password) {
      showMessage('Please fill in every field.', 'error');
      return;
    }

    if (!isPasswordValid(password)) {
      showMessage('Password must be at least 8 characters and include a number.', 'error');
      return;
    }

    if (usernameOrEmailTaken(username, email)) {
      showMessage('That username or email is already registered.', 'error');
      return;
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const users = getUsers();
    users.push({
      username,
      email,
      salt,
      passwordHash,
      createdAt: Date.now()
    });
    saveUsers(users);

    showMessage('Account created. Redirecting to log in…', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  });
})();
