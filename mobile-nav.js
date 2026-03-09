// Mobile Navigation Handler
let currentMobileView = 'chat';

function switchNav(view) {
  // Update nav items in sidebar
  document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.sidebar-nav-btn[data-view="${view}"]`)?.classList.add('active');

  currentMobileView = view;

  // Hide all views
  document.getElementById('chatView').style.display = 'none';
  const settingsView = document.getElementById('settingsPageView');
  const accountView = document.getElementById('accountView');
  if (settingsView) settingsView.style.display = 'none';
  if (accountView) accountView.style.display = 'none';

  // Show selected view
  if (view === 'chat') {
    document.getElementById('chatView').style.display = 'flex';
  } else if (view === 'settings') {
    openSettings();
  } else if (view === 'account') {
    showAccountView();
  }
}

function showAccountView() {
  // Create account view if it doesn't exist
  if (!document.getElementById('accountView')) {
    const accountView = document.createElement('div');
    accountView.id = 'accountView';
    accountView.className = 'account-view';
    accountView.innerHTML = `
      <div style="flex: 1; overflow-y: auto; padding: 16px; padding-bottom: 80px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 64px; height: 64px; margin: 0 auto 12px; border-radius: 50%; background: linear-gradient(135deg, #245c3b, #2e7d52); display: flex; align-items: center; justify-content: center; border: 2px solid #c9a84c;">
            <span style="font-size: 1.5rem;">👤</span>
          </div>
          <h2 style="font-size: 1.2rem; margin-bottom: 4px;">User Account</h2>
          <p style="font-size: 0.75rem; color: rgba(249,246,239,0.6);">University Verified</p>
        </div>

        <div style="background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.18); border-radius: 2px; padding: 16px; margin-bottom: 16px;">
          <div style="display: grid; gap: 12px;">
            <div>
              <label style="display: block; font-size: 0.65rem; text-transform: uppercase; color: #e2c476; letter-spacing: 0.1em; margin-bottom: 4px;">Email</label>
              <p style="font-size: 0.85rem; margin: 0;">student@university.edu</p>
            </div>
            <div>
              <label style="display: block; font-size: 0.65rem; text-transform: uppercase; color: #e2c476; letter-spacing: 0.1em; margin-bottom: 4px;">Username</label>
              <p style="font-size: 0.85rem; margin: 0;">StudentUser2024</p>
            </div>
            <div>
              <label style="display: block; font-size: 0.65rem; text-transform: uppercase; color: #e2c476; letter-spacing: 0.1em; margin-bottom: 4px;">Account Type</label>
              <p style="font-size: 0.85rem; margin: 0;">Student</p>
            </div>
            <div>
              <label style="display: block; font-size: 0.65rem; text-transform: uppercase; color: #e2c476; letter-spacing: 0.1em; margin-bottom: 4px;">Member Since</label>
              <p style="font-size: 0.85rem; margin: 0;">January 2024</p>
            </div>
          </div>
        </div>

        <button onclick="editAccount()" style="width: 100%; padding: 10px; background: transparent; border: 1px solid #c9a84c; color: #e2c476; border-radius: 2px; cursor: pointer; font-size: 0.8rem; font-family: 'Cormorant Garamond', Georgia, serif; transition: all 0.2s; margin-bottom: 8px;">Edit Profile</button>
        <button onclick="changePassword()" style="width: 100%; padding: 10px; background: transparent; border: 1px solid rgba(201,168,76,0.18); color: #f9f6ef; border-radius: 2px; cursor: pointer; font-size: 0.8rem; font-family: 'Cormorant Garamond', Georgia, serif; transition: all 0.2s; margin-bottom: 16px;">Change Password</button>

        <div style="border-top: 1px solid rgba(201,168,76,0.18); padding-top: 16px; margin-top: 16px;">
          <p style="font-size: 0.7rem; text-transform: uppercase; color: #e2c476; letter-spacing: 0.1em; margin-bottom: 12px;">Actions</p>
          <button onclick="logoutUser()" style="width: 100%; padding: 10px; background: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.2); color: #ff6b6b; border-radius: 2px; cursor: pointer; font-size: 0.8rem; font-family: 'Cormorant Garamond', Georgia, serif; transition: all 0.2s;">Sign Out</button>
        </div>
      </div>
    `;

    document.querySelector('.app').appendChild(accountView);
  }

  document.getElementById('accountView').style.display = 'block';
  document.getElementById('chatView').style.display = 'none';
}

function editAccount() {
  const message = document.querySelector('.auth-message') || document.createElement('div');
  message.textContent = 'Edit profile functionality coming soon';
  message.className = 'auth-message';
  console.log('Edit account clicked');
}

function changePassword() {
  const message = document.querySelector('.auth-message') || document.createElement('div');
  message.textContent = 'Change password functionality coming soon';
  message.className = 'auth-message';
  console.log('Change password clicked');
}

function logoutUser() {
  document.getElementById('userInput').value = '';
  document.getElementById('messages').innerHTML = document.getElementById('emptyState').outerHTML;
  switchNav('chat');
  const msg = document.createElement('div');
  msg.className = 'msg ai';
  msg.innerHTML = `
    <div class="avatar ai">AI</div>
    <div class="bubble">You've been signed out. See you next time!</div>
  `;
  setTimeout(() => {
    document.getElementById('messages').innerHTML = '';
    document.getElementById('messages').appendChild(msg);
  }, 300);
}
