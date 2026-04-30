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

/* ── MOBILE HAMBURGER MENU ──
   Toggles the nav open/closed on mobile
   ──────────────────────────────────────────────────────── */
const hamburger = document.getElementById("nav-hamburger");
const mobileNav = document.getElementById("nav-links");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close menu when a nav link is clicked
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });
}

/* ── PORTFOLIO CAROUSEL ──
   Add this to the bottom of script.js
   ──────────────────────────────────────────────────────── */
(function () {
  const stage = document.getElementById("carousel-stage");
  const slides = stage ? stage.querySelectorAll(".carousel-slide") : [];
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dots = document.querySelectorAll(".carousel-dot");
  const thumbs = document.querySelectorAll(".carousel-thumb");

  if (!stage || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    // Wrap around
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    // Move stage
    stage.style.transform = `translateX(-${index * 100}%)`;

    // Active slide opacity
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });

    // Dots
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });

    // Thumbs
    thumbs.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });

    current = index;
  }

  // Init — activate first slide
  goTo(0);

  // Arrow buttons
  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  // Dot clicks
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.slide));
    });
  });

  // Thumb clicks
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      goTo(parseInt(thumb.dataset.slide));
    });
  });

  // Keyboard navigation when carousel is in view
  document.addEventListener("keydown", (e) => {
    const section = document.getElementById("portfolio");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0)
          goTo(current + 1); // swipe left = next
        else goTo(current - 1); // swipe right = prev
      }
    },
    { passive: true },
  );

  // Auto-advance every 6 seconds (pauses on hover)
  let autoTimer = setInterval(() => goTo(current + 1), 6000);

  const carouselWrap = document.querySelector(".carousel-wrap");
  carouselWrap?.addEventListener("mouseenter", () => clearInterval(autoTimer));
  carouselWrap?.addEventListener("mouseleave", () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  });
})();
