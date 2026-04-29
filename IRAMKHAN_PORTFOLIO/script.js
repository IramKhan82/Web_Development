// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initContactForm();
  initBackToTop();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initScrollEffects() {
  // Add animation class to elements
  const animateElements = document.querySelectorAll(
    '.section-header, .glass-card, .timeline-item, .soft-skill-card, .tool-item, .project-card, .certification-card'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));
}

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${progress}%`;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification('Message sent successfully! I will get back to you soon.', 'success');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Notification function
function showNotification(message, type) {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1001;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;

  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove
  setTimeout(() => notification.remove(), 5000);
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initBackToTop() {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// TYPING EFFECT (Optional Enhancement)
// ==========================================

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ==========================================
// PARALLAX EFFECT (Subtle)
// ==========================================

window.addEventListener('scroll', function() {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg-pattern');
  
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});
// Certificate Modal
const modalOverlay = document.createElement('div');
modalOverlay.className = 'cert-modal-overlay';
modalOverlay.innerHTML = `
  <div class="cert-modal">
    <div class="cert-modal-header">
      <div>
        <div class="cert-modal-title" id="modalTitle"></div>
        <div class="cert-modal-issuer" id="modalIssuer"></div>
      </div>
      <button class="cert-modal-close" id="modalClose">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="cert-modal-body" id="modalBody"></div>
    <div class="cert-modal-footer">
      <a id="modalDownload" href="#" class="btn btn-primary" download>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download
      </a>
    </div>
  </div>
`;
document.body.appendChild(modalOverlay);

// Close modal
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openCertModal(title, issuer, filePath) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalIssuer').textContent = issuer;
   const downloadBtn = document.getElementById('modalDownload');
  downloadBtn.href = filePath;
  downloadBtn.setAttribute('download', filePath.split('/').pop()); // ADD THIS LINE

  const body = document.getElementById('modalBody');
  body.innerHTML = `<img src="${filePath}" alt="${title}">`;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Attach to all cert links
document.querySelectorAll('.cert-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const card = link.closest('.certification-card');
    const title = card.querySelector('.cert-title').textContent;
    const issuer = card.querySelector('.cert-issuer').textContent;
    const filePath = link.getAttribute('data-file');
    if (filePath) openCertModal(title, issuer, filePath);
  });
});