/* ============================================================
   NAVIGATION — sticky scroll + hamburger
   ============================================================ */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   PRINCIPLE CARDS — accordion (only one open at a time)
   When a card expands, it spans 2 columns via .open class.
   ============================================================ */
const principleCards = document.querySelectorAll('.principle-card');

principleCards.forEach(card => {
  const header = card.querySelector('.principle-header');
  const body = card.querySelector('.principle-body');

  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    // Close all
    principleCards.forEach(c => {
      c.classList.remove('open');
      c.querySelector('.principle-body').style.maxHeight = '0';
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      card.classList.add('open');
      const inner = body.querySelector('.principle-inner');
      body.style.maxHeight = inner.scrollHeight + 32 + 'px';

      // Smooth scroll so the card is visible
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  });
});

/* ============================================================
   DILEMMA CARDS — accordion (only one open at a time)
   ============================================================ */
const dilemmaCards = document.querySelectorAll('.dilemma-card');

dilemmaCards.forEach(card => {
  const header = card.querySelector('.dilemma-header');
  const body = card.querySelector('.dilemma-body');

  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    // Close all
    dilemmaCards.forEach(c => {
      c.classList.remove('open');
      c.querySelector('.dilemma-body').style.maxHeight = '0';
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      card.classList.add('open');
      const inner = body.querySelector('.dilemma-inner');
      body.style.maxHeight = inner.scrollHeight + 56 + 'px';

      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  });
});

/* ============================================================
   ACTIVE NAV LINK — highlight current section
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

/* ============================================================
   AVATAR UPLOAD — click to replace, persists via localStorage
   ============================================================ */
const avatarEl = document.getElementById('avatarEl');
const avatarUpload = document.getElementById('avatarUpload');

// Restore saved photo on load
const savedAvatar = localStorage.getItem('avatarImage');
if (savedAvatar) {
  avatarEl.innerHTML = `<img src="${savedAvatar}" alt="Profile photo"><span class="avatar-edit-hint">EDIT</span>`;
}

avatarEl.addEventListener('click', () => avatarUpload.click());

avatarUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    avatarEl.innerHTML = `<img src="${dataUrl}" alt="Profile photo"><span class="avatar-edit-hint">EDIT</span>`;
    localStorage.setItem('avatarImage', dataUrl);
  };
  reader.readAsDataURL(file);
});
