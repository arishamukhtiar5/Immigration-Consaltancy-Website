document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;

  // ===== Scroll Navbar =====
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== Active Link =====
  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== Open Menu =====
  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('open');
    body.style.overflow = 'hidden';
  }

  // ===== Close Menu =====
  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    body.style.overflow = '';
  }

  // ===== Toggle Menu =====
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // ===== Close on Link Click =====
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===== Close on Overlay Click =====
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // ===== Close on Resize =====
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

});



document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const scrollTopBtn = document.querySelector('.scroll-top');
  const cards = document.querySelectorAll('.card');

  // ---- Active Nav Link ----
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll To Top Button ----
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    };

    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---- Fade In Animation ----
  const fadeItems = document.querySelectorAll('.fade-in-up');
  if (fadeItems.length) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeItems.forEach(el => fadeObserver.observe(el));
  }

  // ---- Counter Animation ----
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const speed = Math.max(target / 100, 1);

    const timer = setInterval(() => {
      count += speed;
      if (count >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(count) + suffix;
      }
    }, 20);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ---- Card Animation ----
  if (cards.length) {
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));
  }

  // ---- Country Cards Interaction ----
  const interactiveCountryCards = document.querySelectorAll('.country-showcase-card');
  if (interactiveCountryCards.length) {
    const activateCountryCard = currentCard => {
      interactiveCountryCards.forEach(card => {
        const isCurrent = card === currentCard;
        card.classList.toggle('is-open', isCurrent ? !card.classList.contains('is-open') : false);
        card.setAttribute('aria-expanded', card.classList.contains('is-open') ? 'true' : 'false');
      });
    };

    interactiveCountryCards.forEach(card => {
      card.addEventListener('click', () => activateCountryCard(card));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateCountryCard(card);
        }
      });
    });
  }

  // ---- Premium Reveal Animation ----
  const premiumRevealItems = document.querySelectorAll('.country-showcase-card, .premium-team-card');
  if (premiumRevealItems.length) {
    const premiumObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          premiumObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    premiumRevealItems.forEach(item => premiumObserver.observe(item));
  }

  // ---- AOS Init ----
  if (typeof window.AOS !== 'undefined' && typeof window.AOS.init === 'function') {
    window.AOS.init({
      duration: 900,
      once: true,
      offset: 100
    });
  }
});
