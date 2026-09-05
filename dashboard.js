(function () {
  'use strict';

  const session = getSession();

  if (!session) {
    window.location.replace('index.html');
    return;
  }

  const usernameSlot = document.getElementById('usernameSlot');
  const loginTimeSlot = document.getElementById('loginTimeSlot');
  const logoutButton = document.getElementById('logoutButton');

  usernameSlot.textContent = session.username;
  loginTimeSlot.textContent = new Date(session.loggedInAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  logoutButton.addEventListener('click', () => {
    clearSession();
    window.location.href = 'index.html';
  });
})();
