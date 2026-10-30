// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const opened = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!opened));
    mobileMenu.classList.toggle('is-open', !opened);
    mobileMenu.setAttribute('aria-hidden', String(opened));
    document.body.classList.toggle('menu-open', !opened);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    });
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Desktop review slider
const track = document.querySelector('.review-track');
const prevButton = document.querySelector('.review-prev');
const nextButton = document.querySelector('.review-next');
let reviewIndex = 0;

function updateReviews(direction) {
  if (!track || window.innerWidth <= 760) return;
  const cards = [...track.children];
  if (!cards.length) return;

  const visible = window.innerWidth <= 1024 ? 2 : 3;
  const maxIndex = Math.max(0, cards.length - visible);
  reviewIndex = Math.min(maxIndex, Math.max(0, reviewIndex + direction));

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  track.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
}

prevButton?.addEventListener('click', () => updateReviews(-1));
nextButton?.addEventListener('click', () => updateReviews(1));

window.addEventListener('resize', () => {
  reviewIndex = 0;
  if (track) track.style.transform = '';
});

// Existing policy modal behavior
function openPolicy(type) {
  const modal = document.getElementById(type + 'Modal');
  if (modal) {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }
}

function closePolicy(type) {
  const modal = document.getElementById(type + 'Modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }
}

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('policy-modal')) {
    event.target.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }
});

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.policy-modal.is-open').forEach((modal) => modal.classList.remove('is-open'));
    document.body.classList.remove('modal-open');
  }
});
