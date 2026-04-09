/**
 * Music Venue Dashboard - Main JavaScript
 * ========================================
 * Features:
 * - Dark/Light mode toggle
 * - RTL/LTR direction toggle
 * - Mobile navigation
 * - Navbar scroll effects
 * - Form validation
 * - Smooth scrolling
 * - Intersection Observer for animations
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds limit
 * @returns {Function} Throttled function
 */
const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} offset - Offset from viewport edge
 * @returns {boolean} Whether element is in viewport
 */
const isInViewport = (element, offset = 0) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// ============================================
// DARK MODE
// ============================================

const initDarkMode = () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = darkModeToggle?.querySelector('.sun-icon');
  const moonIcon = darkModeToggle?.querySelector('.moon-icon');
  const html = document.documentElement;
  
  // Check for saved preference or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      sunIcon?.style.setProperty('display', 'none');
      moonIcon?.style.setProperty('display', 'block');
    } else {
      html.removeAttribute('data-theme');
      sunIcon?.style.setProperty('display', 'block');
      moonIcon?.style.setProperty('display', 'none');
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Initialize
  applyTheme(getInitialTheme());
  
  // Event listener
  darkModeToggle?.addEventListener('click', toggleTheme);
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
};

// ============================================
// RTL MODE
// ============================================

const initRTL = () => {
  const rtlToggle = document.getElementById('rtlToggle');
  const html = document.documentElement;
  
  // Check for saved preference
  const getInitialDirection = () => {
    return localStorage.getItem('direction') || 'ltr';
  };
  
  // Apply direction
  const applyDirection = (direction) => {
    html.setAttribute('dir', direction);
    const textEls = document.querySelectorAll('.rtl-text');
    textEls.forEach(el => {
      el.textContent = direction === 'rtl' ? 'LTR' : 'RTL';
    });
  };
  
  // Toggle direction
  const toggleDirection = () => {
    const currentDirection = html.getAttribute('dir') || 'ltr';
    const newDirection = currentDirection === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(newDirection);
    localStorage.setItem('direction', newDirection);
  };
  
  // Initialize
  applyDirection(getInitialDirection());
  
  // Event listener
  rtlToggle?.addEventListener('click', toggleDirection);
};

// ============================================
// MOBILE NAVIGATION
// ============================================

const initMobileNav = () => {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarNav = document.getElementById('navbarNav');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Clone CTA buttons to mobile menu
  const navbarActions = document.querySelector('.navbar-actions');
  if (navbarActions && navbarNav && !document.querySelector('.mobile-cta-container')) {
    const ctaButtons = navbarActions.querySelectorAll('.btn:not(.navbar-btn)');
    if (ctaButtons.length > 0) {
      const mobileCtaContainer = document.createElement('div');
      mobileCtaContainer.className = 'mobile-cta-container';
      
      ctaButtons.forEach(btn => {
        const clonedBtn = btn.cloneNode(true);
        clonedBtn.style.margin = '0';
        clonedBtn.style.width = '100%';
        mobileCtaContainer.appendChild(clonedBtn);
      });
      
      navbarNav.appendChild(mobileCtaContainer);
    }
  }
  
  // Toggle mobile menu
  navbarToggle?.addEventListener('click', () => {
    navbarNav?.classList.toggle('active');
    navbarToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Handle dropdowns on mobile
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle?.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbarToggle?.contains(e.target) && !navbarNav?.contains(e.target)) {
      navbarNav?.classList.remove('active');
      navbarToggle?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navbarNav?.classList.remove('active');
      navbarToggle?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 50);
  
  window.addEventListener('scroll', handleScroll);
};

// ============================================
// FORM VALIDATION
// ============================================

const initFormValidation = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        // Remove existing error messages
        const existingError = field.parentElement?.querySelector('.form-error');
        existingError?.remove();
        field.classList.remove('error');
        
        // Validate
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          const error = document.createElement('span');
          error.className = 'form-error';
          error.textContent = 'This field is required';
          field.parentElement?.appendChild(error);
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            field.classList.add('error');
            
            const error = document.createElement('span');
            error.className = 'form-error';
            error.textContent = 'Please enter a valid email address';
            field.parentElement?.appendChild(error);
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
    
    // Real-time validation on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const error = input.parentElement?.querySelector('.form-error');
        if (error && input.value.trim()) {
          error.remove();
          input.classList.remove('error');
        }
      });
    });
  });
};

// ============================================
// SMOOTH SCROLLING
// ============================================

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
};

// ============================================
// LAZY LOADING IMAGES
// ============================================

const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length || !('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px'
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
};

// ============================================
// BACK TO TOP BUTTON
// ============================================

const initBackToTop = () => {
  // Create button if it doesn't exist
  let backToTop = document.getElementById('backToTop');
  
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'btn btn-primary';
    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      padding: 0;
    `;
    backToTop.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(backToTop);
  }
  
  const toggleVisibility = throttle(() => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  }, 100);
  
  window.addEventListener('scroll', toggleVisibility);
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ============================================
// COOKIE CONSENT
// ============================================

const initCookieConsent = () => {
  const consentKey = 'cookieConsent';
  
  if (localStorage.getItem(consentKey)) return;
  
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  `;
  
  banner.innerHTML = `
    <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">
      We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
    </p>
    <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
      <button class="btn btn-ghost btn-sm cookie-decline">Decline</button>
      <button class="btn btn-primary btn-sm cookie-accept">Accept</button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(consentKey, 'accepted');
    banner.remove();
  });
  
  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem(consentKey, 'declined');
    banner.remove();
  });
};

// ============================================
// NOTIFICATION SYSTEM
// ============================================

const Notification = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'notification-container';
      this.container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `;
      document.body.appendChild(this.container);
    }
  },
  
  show(message, type = 'info', duration = 5000) {
    this.init();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: var(--bg-card);
      border-radius: var(--radius-lg);
      padding: 1rem 1.5rem;
      box-shadow: var(--shadow-xl);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 300px;
      max-width: 400px;
      animation: slideIn 0.3s ease;
    `;
    
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--info)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    
    notification.innerHTML = `
      ${icons[type] || icons.info}
      <span style="flex: 1; color: var(--text);">${message}</span>
      <button class="notification-close" style="background: none; border: none; cursor: pointer; padding: 0; color: var(--text-muted);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    
    this.container.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close')?.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
  }
};

// ============================================
// LOADING STATES
// ============================================

const initLoadingStates = () => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Skip if button has specific data attribute
      if (this.dataset.noLoading) return;
      
      const href = this.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('javascript')) return;
      
      // Add loading state
      const originalContent = this.innerHTML;
      this.disabled = true;
      this.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="20"></circle>
        </svg>
        Loading...
      `;
      
      // Reset after 2 seconds (for demo)
      setTimeout(() => {
        this.disabled = false;
        this.innerHTML = originalContent;
      }, 2000);
    });
  });
};

// ============================================
// COUNTERS ANIMATION
// ============================================

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.counter);
    const duration = parseInt(counter.dataset.duration) || 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
};

// ============================================
// TABS
// ============================================

const initTabs = () => {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update panels
        panels.forEach(panel => {
          panel.classList.toggle('active', panel.dataset.tabPanel === target);
        });
      });
    });
  });
};

// ============================================
// ACCORDION
// ============================================

const initAccordion = () => {
  const accordions = document.querySelectorAll('[data-accordion]');
  
  accordions.forEach(accordion => {
    const headers = accordion.querySelectorAll('[data-accordion-header]');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isOpen = item.classList.contains('open');
        
        // Close all items if accordion is not multiple
        if (!accordion.dataset.multiple) {
          accordion.querySelectorAll('[data-accordion-item]').forEach(i => {
            i.classList.remove('open');
          });
        }
        
        // Toggle current item
        item.classList.toggle('open', !isOpen);
      });
    });
  });
};

// ============================================
// MODAL
// ============================================

const Modal = {
  activeModal: null,
  
  init() {
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal);
      }
    });
    
    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') && this.activeModal) {
        this.close(this.activeModal);
      }
    });
  },
  
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    this.activeModal = modal;
    
    // Focus first focusable element
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();
  },
  
  close(modal) {
    if (typeof modal === 'string') {
      modal = document.getElementById(modal);
    }
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
    this.activeModal = null;
  }
};

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initRTL();
  initMobileNav();
  initNavbarScroll();
  initFormValidation();
  initSmoothScroll();
  initScrollAnimations();
  initLazyLoading();
  initBackToTop();
  initCookieConsent();
  initLoadingStates();
  initCounters();
  initTabs();
  initAccordion();
  Modal.init();
});

// Export for global access
window.Notification = Notification;
window.Modal = Modal;
