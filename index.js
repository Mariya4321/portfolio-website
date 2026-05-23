const roles = [
  "Java Full Stack Developer",
  "Python Full Stack Developer",
  "Software Engineer",
  "Cloud & DevOps Enthusiast",
  "Open Source Contributor"
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = roles[roleIdx];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 45);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 80);
  }
}
typeLoop();


/* ── NAV: SCROLL EFFECT ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});


/* ── HAMBURGER / MOBILE NAV ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  const toggleMobileNav = () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMobileNav);
  hamburger.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') toggleMobileNav();
  });

  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ── SCROLL REVEAL ───────────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ── COUNT-UP ANIMATION ──────────────────────────────────────── */
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const t = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(t); }
    else { el.textContent = Math.floor(start); }
  }, 16);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      animateCount(el, target);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el));

/* ── SKILL ICON ANIMATION ──────────────────────────────────────── */
const skillIcons = document.querySelectorAll('.skill-icons i');
skillIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    const skillName = icon.getAttribute('data-skill');
    const parentCard = icon.closest('.matrix-card');
    const text = parentCard.querySelector('.skill-hover-text');
    text.classList.remove('active');
    setTimeout(() => {
      text.textContent = skillName;
      text.classList.add('active');
    }, 120);
  });
  icon.addEventListener('mouseleave', () => {
    const parentCard = icon.closest('.matrix-card');
    const text = parentCard.querySelector('.skill-hover-text');
    text.classList.remove('active');
    setTimeout(() => {
      text.textContent = 'Hover/Click over a skill icon';
      text.classList.add('active');
    }, 120);
  });
});

/* ── PROJECT FILTER ──────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'flex' : 'none';
    });
  });
});


/* ── CONTACT FORM (demo submit) ──────────────────────────────── */
const form = document.getElementById("contactForm");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json"
    }
  });
    if (response.ok) {
      msg.style.display = "block";
      form.reset();

      setTimeout(() => {
        msg.style.display = "none";
      }, 5000);

    } else {
        alert("Oops! Something went wrong.");
    }
  });


/* ── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});