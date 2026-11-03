/**
 * PERSONAL PORTFOLIO - VIVEK | FIRST-YEAR AIML STUDENT
 * Author: Vivek
 * Features: Theme toggle, Mobile Nav, Typewriter, Filters, Honest Form Validation, Copy to Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  setActiveNavLink();
  initTypewriter();
  initScrollEffects();
  initBackToTop();
  initFilterSystem();
  initContactForm();
  initCopyButtons();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK AI MODE / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('vivek-portfolio-theme');

  // Default is dark futuristic AI theme
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('vivek-portfolio-theme', 'light');
        showToast('Switched to Light Mode ☀️');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('vivek-portfolio-theme', 'dark');
        showToast('Switched to Futuristic AI Dark Mode 🌌');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACTIVE NAVIGATION LINK
   -------------------------------------------------------------------------- */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. ANIMATED TYPEWRITER EFFECT (VIVEK's SUBTITLE)
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;

  const words = [
    'First-Year AIML Student',
    'Future AI Innovator',
    'BGSCET • VTU, Karnataka',
    'Passionate Tech Learner'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      currentSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      currentSpeed = 350;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. SCROLL EFFECTS & NAVBAR SCROLLED STATE
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. SKILLS FILTER SYSTEM
   -------------------------------------------------------------------------- */
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const targetItems = document.querySelectorAll('.filterable-item');

      targetItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM WITH HONEST STATUS & EMAIL CLIENT INTEGRATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('charCount');
  const noticeBox = document.getElementById('formNoticeBox');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      charCounter.textContent = `${messageInput.value.length}/500`;
    });
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => {
      field.parentElement.classList.remove('has-error');
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, 'Please enter your full name (at least 2 characters)');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      showError(subjectInput, 'Please enter a descriptive subject');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message should be at least 10 characters long');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please correct the highlighted fields ⚠️');
      return;
    }

    // Honest handling: Do not fake that an email was dispatched through a non-existent backend.
    // Instead, prepare a direct mailto link with the exact content and inform the user.
    const encodedSubject = encodeURIComponent(subjectInput.value.trim());
    const encodedBody = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
    
    // Check if recipient email placeholder has been updated
    const recipientEmail = document.getElementById('vivekEmailAddress')?.textContent.trim() || 'your.email@example.com';
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    if (noticeBox) {
      noticeBox.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
          <i class="fa-solid fa-circle-check" style="color: #34d399; font-size: 1.25rem; margin-top: 2px;"></i>
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">
              Form Inputs Validated!
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
              Since this is a client-side static portfolio, your message is ready to be sent directly to Vivek via your email client.
            </p>
            <a href="${mailtoLink}" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">
              <i class="fa-solid fa-envelope"></i> Open in Email Client
            </a>
            <button type="button" class="btn btn-secondary btn-sm" id="resetFormBtn">
              Clear Form
            </button>
          </div>
        </div>
      `;
      noticeBox.classList.add('show');
      noticeBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      document.getElementById('resetFormBtn')?.addEventListener('click', () => {
        contactForm.reset();
        noticeBox.classList.remove('show');
        if (charCounter) charCounter.textContent = '0/500';
      });
    }

    showToast('Form validated! Click to open your email client ✉️');
  });

  function showError(inputElement, msg) {
    const group = inputElement.parentElement;
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = msg;
  }
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. COPY BUTTONS
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard! 📋`);
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = origText;
        }, 2000);
      }).catch(() => {
        showToast('Could not copy to clipboard.');
      });
    });
  });
}
