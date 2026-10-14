/* ===========================
   RUDRESH G – Portfolio JS
   =========================== */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
    cursorFollower.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.opacity = '1';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
  updateActiveNav();
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = 40;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.2;

    p.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;

    // Randomly use primary or secondary color
    if (Math.random() > 0.6) {
      p.style.background = 'var(--color-secondary)';
    }

    container.appendChild(p);
  }
}
createParticles();

// ===== TYPEWRITER EFFECT =====
const roles = ['AI/ML Solutions', 'Python Code', 'Secure Systems', 'Smart Algorithms'];
let roleIndex = 0, charIndex = 0, deleting = false;
const roleTextEl = document.getElementById('roleText');

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (!deleting) {
    roleTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      setTimeout(() => { deleting = true; typeWriter(); }, 2200);
      return;
    }
    setTimeout(typeWriter, 80);
  } else {
    roleTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, 300);
      return;
    }
    setTimeout(typeWriter, 40);
  }
}
setTimeout(typeWriter, 800);

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const isDecimal = el.id && el.id.includes ? false : false;
  const duration = 1500;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(2);
  }, step);
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate counters in stats
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = i * 0.15 + 's';
  observer.observe(el);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.style.transitionDelay = i * 0.1 + 's';
  observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = i * 0.15 + 's';
  observer.observe(el);
});

// Observe exp cards
document.querySelectorAll('.exp-card').forEach((el, i) => {
  el.style.transitionDelay = i * 0.15 + 's';
  observer.observe(el);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
  observer.observe(el);
});

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    formSuccess.style.display = 'block';
    contactForm.reset();

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});

// ===== PARALLAX HERO BG =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg-img');
  if (hero) {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

// ===== FLOATING CARDS MOUSE PARALLAX =====
const aboutSection = document.getElementById('about');
if (aboutSection) {
  aboutSection.addEventListener('mousemove', e => {
    const rect = aboutSection.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;

    const card1 = document.getElementById('aboutCard1');
    const card2 = document.getElementById('aboutCard2');
    const card3 = document.getElementById('aboutCard3');

    if (card1) card1.style.transform = `translate(${cx * 15}px, ${cy * 10}px) rotate(-2deg)`;
    if (card2) card2.style.transform = `translate(${-cx * 20}px, ${-cy * 15}px) rotate(2deg)`;
    if (card3) card3.style.transform = `translate(${cx * 12}px, ${cy * 18}px) rotate(1deg)`;
  });

  aboutSection.addEventListener('mouseleave', () => {
    const cards = ['aboutCard1', 'aboutCard2', 'aboutCard3'];
    cards.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.transform = '';
    });
  });
}

// ===== SCROLL PROGRESS =====
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scrollProgress';
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #63b3ed, #9f7aea);
  z-index: 9999;
  transition: width 0.1s;
  width: 0%;
`;
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  scrollProgress.style.width = progress + '%';
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Stagger reveal on page load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }
});

console.log('%c🚀 Rudresh G – Portfolio', 'color: #63b3ed; font-size: 1.5rem; font-weight: bold;');
console.log('%cAI/ML Developer & Full Stack Engineer', 'color: #9f7aea; font-size: 1rem;');
