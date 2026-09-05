(function () {
  'use strict';

  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('formMessage');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');

  function showMessage(text) {
    messageEl.textContent = text;
    messageEl.className = 'message is-visible message--error';
  }

  function hideMessage() {
    messageEl.className = 'message';
  }

  // If already logged in, skip straight to the dashboard.
  if (getSession()) {
    window.location.replace('dashboard.html');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage();

    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;

    if (!identifier || !password) {
      showMessage('Please enter both fields.');
      return;
    }

    const user = findUser(identifier);
    // Generic message either way — never reveal which field was wrong.
    const genericError = 'Incorrect username/email or password.';

    if (!user) {
      showMessage(genericError);
      return;
    }

    const attemptedHash = await hashPassword(password, user.salt);
    if (attemptedHash !== user.passwordHash) {
      showMessage(genericError);
      return;
    }

    createSession(user.username);
    window.location.href = 'dashboard.html';
  });
})();
