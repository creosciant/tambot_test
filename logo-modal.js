// Logo Modal functionality
function openLogoModal() {
  document.getElementById('logoModal').classList.add('open');
  const inp = document.getElementById('logoPathInput');
  inp.value = '';
  document.getElementById('logoError').style.display = 'none';
  setTimeout(() => inp.focus(), 80);
}

function closeLogoModal() {
  document.getElementById('logoModal').classList.remove('open');
}

function applyLogo() {
  const path = document.getElementById('logoPathInput').value.trim();
  if (!path) return;
  const img = document.getElementById('logoImg');
  img.onload = () => {
    document.getElementById('logoPlaceholder').style.display = 'none';
    img.style.display = 'block';
    document.getElementById('logoError').style.display = 'none';
    closeLogoModal();
  };
  img.onerror = () => {
    const err = document.getElementById('logoError');
    err.style.display = 'block';
    err.textContent = 'Could not load image — check the path and try again.';
  };
  img.src = path;
}
