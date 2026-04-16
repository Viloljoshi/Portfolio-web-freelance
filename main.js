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

/* PRINCIPLES — accordion */
document.querySelectorAll('.principle').forEach(card => {
  const head = card.querySelector('.principle-head');
  const body = card.querySelector('.principle-body');

  head.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    document.querySelectorAll('.principle').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.principle-body').style.maxHeight = '0';
    });

    if (!isOpen) {
      card.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

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
