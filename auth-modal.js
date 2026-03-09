// Auth Modal Popup functionality
let currentAuthMode = 'login';

function openAuthModal() {
  document.getElementById('authModal').classList.add('open');
  currentAuthMode = 'login';
  switchAuthMode('login');
  document.getElementById('authForm').reset();
  document.getElementById('authMessage').classList.remove('success');
  setTimeout(() => document.getElementById('authUsername').focus(), 80);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('open');
}

function switchAuthMode(mode) {
  currentAuthMode = mode;
  const title = document.getElementById('authTitle');
  const subtitle = document.getElementById('authSubtitle');
  const submitBtn = document.getElementById('authSubmitBtn');
  const signupEmailGroup = document.getElementById('signupEmailGroup');
  const toggleBtns = document.querySelectorAll('.auth-toggle-btn');

  toggleBtns.forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector('[data-mode="' + mode + '"]');
  if (btn) btn.classList.add('active');

  if (mode === 'login') {
    title.textContent = 'Sign In';
    subtitle.textContent = 'Welcome back';
    submitBtn.textContent = 'Sign In';
    signupEmailGroup.style.display = 'none';
  } else {
    title.textContent = 'Create Account';
    subtitle.textContent = 'Join us today';
    submitBtn.textContent = 'Sign Up';
    signupEmailGroup.style.display = 'block';
  }
  document.getElementById('authMessage').classList.remove('success');
  document.getElementById('authForm').reset();
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const messageEl = document.getElementById('authMessage');
  const username = document.getElementById('authUsername').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const email = document.getElementById('signupEmail').value.trim();

  if (!username || !password) {
    messageEl.textContent = 'Please fill in all fields';
    messageEl.classList.remove('success');
    messageEl.style.display = 'block';
    return;
  }

  if (currentAuthMode === 'signup' && !email) {
    messageEl.textContent = 'Please fill in all fields';
    messageEl.classList.remove('success');
    messageEl.style.display = 'block';
    return;
  }

  if (password.length < 6) {
    messageEl.textContent = 'Password must be at least 6 characters';
    messageEl.classList.remove('success');
    messageEl.style.display = 'block';
    return;
  }

  const action = currentAuthMode === 'login' ? 'signed in' : 'signed up';
  messageEl.textContent = `✓ Successfully ${action}!`;
  messageEl.classList.add('success');
  messageEl.style.display = 'block';

  setTimeout(() => {
    closeAuthModal();
  }, 1500);
}
