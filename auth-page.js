// Auth Page View functionality
let currentAuthPageMode = 'login';

function showAuthPage() {
  document.getElementById('chatView').style.display = 'none';
  document.getElementById('authPageView').style.display = 'flex';
  document.getElementById('signInHeaderBtn').style.display = 'none';
  document.getElementById('clearBtn').style.display = 'none';
  currentAuthPageMode = 'login';
  switchAuthPageMode('login');
  document.getElementById('authPageForm').reset();
  document.getElementById('authPageMessage').classList.remove('success');
}

function showChatView() {
  document.getElementById('authPageView').style.display = 'none';
  document.getElementById('chatView').style.display = 'flex';
  document.getElementById('signInHeaderBtn').style.display = 'block';
  document.getElementById('clearBtn').style.display = 'block';
}

function switchAuthPageMode(mode) {
  currentAuthPageMode = mode;
  const title = document.getElementById('authPageTitle');
  const subtitle = document.getElementById('authPageSubtitle');
  const submitBtn = document.getElementById('authPageSubmitBtn');
  const signupEmailGroup = document.getElementById('authPageSignupEmailGroup');
  const toggleBtns = document.querySelectorAll('.auth-page-toggle-btn');

  toggleBtns.forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector('[data-mode="' + mode + '"]');
  if (btn) btn.classList.add('active');

  if (mode === 'login') {
    title.textContent = 'Sign In';
    subtitle.textContent = 'Welcome back to TamBot';
    submitBtn.textContent = 'Sign In';
    signupEmailGroup.style.display = 'none';
  } else {
    title.textContent = 'Create Account';
    subtitle.textContent = 'Join us today';
    submitBtn.textContent = 'Sign Up';
    signupEmailGroup.style.display = 'block';
  }
  document.getElementById('authPageMessage').classList.remove('success');
  document.getElementById('authPageForm').reset();
}

function handleAuthPageSubmit(e) {
  e.preventDefault();
  const messageEl = document.getElementById('authPageMessage');
  const username = document.getElementById('authPageUsername').value.trim();
  const password = document.getElementById('authPagePassword').value.trim();
  const email = document.getElementById('authPageSignupEmail').value.trim();

  if (!username || !password) {
    messageEl.textContent = 'Please fill in all fields';
    messageEl.classList.remove('success');
    messageEl.style.display = 'block';
    return;
  }

  if (currentAuthPageMode === 'signup' && !email) {
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

  const action = currentAuthPageMode === 'login' ? 'signed in' : 'signed up';
  messageEl.textContent = `✓ Successfully ${action}!`;
  messageEl.classList.add('success');
  messageEl.style.display = 'block';

  setTimeout(() => {
    showChatView();
  }, 1500);
}
