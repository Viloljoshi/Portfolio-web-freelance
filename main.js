/* NAV — hamburger toggle */
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* PRINCIPLES — accordion, first open by default */
const principles = document.querySelectorAll('.principle');

function openPrinciple(card) {
  const body = card.querySelector('.principle-body');
  card.classList.add('open');
  body.style.maxHeight = body.scrollHeight + 'px';
}

function closePrinciple(card) {
  card.classList.remove('open');
  card.querySelector('.principle-body').style.maxHeight = '0';
}

principles.forEach(card => {
  card.querySelector('.principle-head').addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    principles.forEach(c => closePrinciple(c));
    if (!isOpen) openPrinciple(card);
  });
});

// Open first one on load
const firstOpen = document.querySelector('.principle.open');
if (firstOpen) openPrinciple(firstOpen);

/* ACTIVE NAV — intersection observer */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));
