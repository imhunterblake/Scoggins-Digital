/* ============================================================
   SCOGGINS DIGITAL — script.js
   ============================================================ */

/* ── SCROLL REVEAL ──
   Watches for elements with the .reveal class and adds
   .visible when they enter the viewport, triggering the
   CSS fade-in-up transition defined in styles.css
   ──────────────────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger each card slightly for a cascading reveal effect
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      // Stop observing once revealed — no need to re-trigger
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ── ACTIVE NAV LINK HIGHLIGHT ──
   Highlights the correct nav link based on which section
   is currently scrolled into view
   ──────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${currentSection}`;
    link.style.color = isActive ? 'var(--accent)' : '';
  });
});


/* ── CONTACT FORM SUBMIT FEEDBACK ──
   Gives the user visual confirmation when they click Send.
   Replace this with your real form handler (Formspree,
   EmailJS, Netlify Forms, etc.) when going live.
   ──────────────────────────────────────────────────────── */
const submitButton = document.querySelector('.form-submit');

if (submitButton) {
  submitButton.addEventListener('click', () => {
    // TODO: Replace with real form submission logic
    // e.g. fetch('/api/contact', { method: 'POST', body: formData })

    submitButton.textContent = '✓ Message Sent!';
    submitButton.style.background = 'var(--green)';

    setTimeout(() => {
      submitButton.textContent = 'Send Message →';
      submitButton.style.background = '';
    }, 3000);
  });
}