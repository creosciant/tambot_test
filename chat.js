// Chat functionality
const responses = [
  "I've compiled your deadlines for this week. Make sure to prioritize the most urgent ones and plan accordingly.",
  "I can help you draft a professional email to your professor or department. Let me know the topic and tone you're aiming for.",
  "Here's your schedule for the upcoming days. You have several classes and commitments lined up.",
  "There are several events happening on campus this week. These include academic talks, club meetings, and social gatherings.",
  "I'm here to help you stay organized with your academic commitments. What specific information do you need?",
];

const greetingResponses = [
  "Hello! How may I assist you today?",
  "Hi there! What can I help you with?",
  "Greetings! How can I be of service?",
  "Hello! I'm here to help. What do you need?",
  "Hi! How may I help you?",
];

let msgCount = 0;

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function hideEmpty() {
  const e = document.getElementById('emptyState');
  if (e) e.style.display = 'none';
}

function isGreeting(text) {
  const greetingKeywords = ['hi', 'hello'];
  return greetingKeywords.includes(text.toLowerCase().trim());
}

function appendMsg(text, role) {
  hideEmpty();
  const wrap = document.getElementById('messages');
  const isUser = role === 'user';

  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.style.animationDelay = '0ms';

  const avatarHTML = isUser ? 
    `<div class="avatar ${role}">You</div>` :
    `<div class="avatar ${role}"><img src="tambot_logo.png" alt="AI"/></div>`;

  div.innerHTML = `
    ${avatarHTML}
    <div>
      <div class="bubble">${text}</div>
      <div class="msg-meta">${now()}</div>
    </div>
  `;
  wrap.appendChild(div);
  wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' });
  msgCount++;
}

function showTyping() {
  const wrap = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="avatar ai"><img src="tambot_logo.png" alt="AI"/></div>
    <div class="bubble typing-bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  wrap.appendChild(div);
  wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' });
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendMessage() {
  const inp = document.getElementById('userInput');
  const text = inp.value.trim();
  if (!text) return;

  appendMsg(text, 'user');
  inp.value = '';
  autoResize(inp);
  updateCharCount(inp);

  showTyping();
  const delay = 900 + Math.random() * 800;
  setTimeout(() => {
    removeTyping();
    let response;
    if (isGreeting(text)) {
      response = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    } else if (text.toLowerCase().includes('where is the ftic lounge')) {
      response = "The FTIC Lounge area is located at the 5th floor of the FEU Engineering Building.";
    } else if (text.toLowerCase().includes('when is the facilities office available')) {
      response = "The Facilities Office (FO) is available from Monday to Friday. It is open from 8:00 AM to 6:00 PM.";
    } else if (text.toLowerCase().includes("what's my schedule for this monday") || text.toLowerCase().includes('whats my schedule for this monday')) {
      response = "Here's your schedule for this Monday:\n\n9:00 AM - Data Structures (Room F1201)\n11:00 AM - Web Development (Room F1205)\n1:00 PM - Lunch Break\n2:00 PM - Database Management (Room E4608)\n4:00 PM - Software Engineering (Room E401)";
    } else {
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    appendMsg(response, 'ai');
  }, delay);
}

function sendSuggestion(text) {
  const inp = document.getElementById('userInput');
  inp.value = text;
  sendMessage();
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = '54px';
  if (el.scrollHeight > 54) {
    el.style.height = el.scrollHeight + 'px';
  }
}

function updateCharCount(el) {
  document.getElementById('charCount').textContent = `${el.value.length} / 2000`;
}

function clearChat() {
  const wrap = document.getElementById('messages');
  wrap.innerHTML = `
    <div class="empty-state" id="emptyState">
      <div class="empty-ornament">✦ ✦ ✦</div>
      <h2>How may I assist?</h2>
      <p>Ask me anything — I'm here to help</p>
      <div class="suggestions">
        <button class="suggestion-pill" onclick="sendSuggestion('Summarize deadlines this week')">Summarize deadlines this week</button>
        <button class="suggestion-pill" onclick="sendSuggestion('Write an email to a professor or department')">Write an email to a professor</button>
        <button class="suggestion-pill" onclick="sendSuggestion('Look up my schedule')">Look up my schedule</button>
        <button class="suggestion-pill" onclick="sendSuggestion('What are the ongoing events in the university this week?')">University events this week</button>
      </div>
    </div>
  `;
  msgCount = 0;
}
