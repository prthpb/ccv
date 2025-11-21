document.addEventListener('DOMContentLoaded', function () {
  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.lightbox-target').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lbImg) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.dataset.caption || img.alt || '';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLB);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });

  function closeLB() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  }

  // contact form (client-side only)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('status');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      if (!name.trim()) return setStatus('Enter name.');
      if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('Enter valid email.');
      if (message.trim().length < 10) return setStatus('Message must be at least 10 characters.');

      setStatus('Sent,Thank you.');
      form.reset();
    });

    function setStatus(text) {
      if (!status) return;
      status.textContent = text;
    }
  }
});
