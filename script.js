/* ============================================================
   SCOGGINS DIGITAL — script.js
   ============================================================ */

/* ── SCROLL REVEAL ──
   Watches for elements with the .reveal class and adds
   .visible when they enter the viewport, triggering the
   CSS fade-in-up transition defined in styles.css
   ──────────────────────────────────────────────────────── */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger each card slightly for a cascading reveal effect
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 80);

        // Stop observing once revealed — no need to re-trigger
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px 0px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// Also reveal any elements already in the viewport on page load
// (handles direct anchor links like #contact, #portfolio, etc.)
window.addEventListener("load", () => {
  revealElements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add("visible"), i * 80);
    }
  });
});

/* ── ACTIVE NAV LINK HIGHLIGHT ──
   Highlights the correct nav link based on which section
   is currently scrolled into view
   ──────────────────────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.style.color = isActive ? "var(--accent)" : "";
  });
});

/* ── CONTACT FORM SUBMIT ──
   Submits to Formspree via fetch() — no page reload, no
   Chrome "resubmit form?" dialog on refresh.
   ──────────────────────────────────────────────────────── */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".form-submit");
    const formData = new FormData(contactForm);

    submitButton.textContent = "Sending…";
    submitButton.disabled = true;

    try {
      const response = await fetch("https://formspree.io/f/xlgpgapz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        submitButton.textContent = "✓ Message Sent!";
        submitButton.style.background = "var(--green)";
        contactForm.reset();
        setTimeout(() => {
          submitButton.textContent = "Send Message →";
          submitButton.style.background = "";
          submitButton.disabled = false;
        }, 3000);
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      submitButton.textContent = "Something went wrong — try email";
      submitButton.style.background = "#c0392b";
      setTimeout(() => {
        submitButton.textContent = "Send Message →";
        submitButton.style.background = "";
        submitButton.disabled = false;
      }, 4000);
    }
  });
}
