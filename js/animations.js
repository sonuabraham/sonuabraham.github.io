/*===== NAVIGATION ANIMATIONS =====*/

// Add entrance animation to navigation items
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav__item');

    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        item.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

/*===== MOBILE MENU ANIMATIONS =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

// Add animation classes when menu opens/closes
if (navToggle) {
    navToggle.addEventListener('click', () => {
        // Add stagger animation to mobile menu items
        const mobileNavItems = document.querySelectorAll('.nav__item');
        mobileNavItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, 100 * index);
        });
    });
}

/*===== HERO SECTION ANIMATIONS =====*/

// Typewriter effect for hero name
function typewriterEffect() {
    const heroName = document.querySelector('.hero__name');
    if (!heroName) return;

    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '3px solid var(--color-primary)';

    let i = 0;
    const typeInterval = setInterval(() => {
        heroName.textContent += text.charAt(i);
        i++;

        if (i >= text.length) {
            clearInterval(typeInterval);
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroName.classList.add('typing-complete');
                heroName.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Initialize hero animations on page load
document.addEventListener('DOMContentLoaded', function () {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Start typewriter effect after initial fade-in
        setTimeout(typewriterEffect, 800);

        // Add stagger animation to hero buttons
        const heroButtons = document.querySelectorAll('.hero__buttons .button');
        heroButtons.forEach((button, index) => {
            button.style.animationDelay = `${1.2 + (index * 0.1)}s`;
        });
    }
});

// Hero scroll indicator click handler
document.addEventListener('DOMContentLoaded', function () {
    const heroScrollButton = document.querySelector('.hero__scroll-button');
    if (heroScrollButton) {
        heroScrollButton.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Hero image hover effects
document.addEventListener('DOMContentLoaded', function () {
    const heroImg = document.querySelector('.hero__img');
    if (heroImg) {
        // Add loading placeholder if image fails to load
        heroImg.addEventListener('error', function () {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGQUZDIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM2NDc0OEIiLz4KPHBhdGggZD0iTTEwMCAxODBMMTUwIDEzMEwyMDAgMTgwVjIyMEgxMDBWMTgwWiIgZmlsbD0iIzY0NzQ4QiIvPgo8dGV4dCB4PSIxNTAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4QiIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0Ij5Qcm9maWxlIFBob3RvPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Profile Photo Placeholder';
        });
    }
});

/*===== SCROLL ANIMATIONS =====*/
// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Trigger specific animations based on element type
            if (entry.target.classList.contains('about')) {
                animateAboutSection(entry.target);
            } else if (entry.target.classList.contains('projects')) {
                animateProjectsSection(entry.target);
            } else if (entry.target.classList.contains('contact')) {
                animateContactSection(entry.target);
            }
        }
    });
}, observerOptions);

// Enhanced section animations
function animateAboutSection(section) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate skills bars
    const skillsBars = section.querySelectorAll('.skills__percentage');
    skillsBars.forEach((bar, index) => {
        const percentage = bar.getAttribute('data-percentage');
        setTimeout(() => {
            bar.style.width = percentage + '%';
            bar.classList.add('animate');
        }, 200 + (index * 100));
    });

    // Animate stats counters
    const stats = section.querySelectorAll('.about__stat-number');
    stats.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent.replace('+', ''));
        let currentValue = 0;
        const increment = finalValue / 50;

        setTimeout(() => {
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + '+';
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
        }, index * 200);
    });

    // Animate certification cards
    const certCards = section.querySelectorAll('.certification__card');
    certCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 100 + (index * 150));
    });
}

function animateProjectsSection(section) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate project cards with stagger effect
    const projectCards = section.querySelectorAll('.projects__card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });
}

function animateContactSection(section) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate contact cards
    const contactCards = section.querySelectorAll('.contact__card');
    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);
    });

    // Animate form elements
    const formElements = section.querySelectorAll('.contact__form-div');
    formElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, 200 + (index * 100));
    });
}

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Also observe individual elements that need animation
    const animatedElements = document.querySelectorAll(
        '.about__stat, .skills__data, .certification__card, .projects__card, .contact__card, .contact__form-div'
    );
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
/*==
=== LAZY LOADING FOR IMAGES =====*/
// Intersection Observer for lazy loading images
const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            // Show loading placeholder
            img.classList.add('loading');

            // Load the actual image
            const actualSrc = img.dataset.src || img.src;
            const imageLoader = new Image();

            imageLoader.onload = () => {
                img.src = actualSrc;
                img.classList.remove('loading');
                img.classList.add('loaded');
                lazyImageObserver.unobserve(img);
            };

            imageLoader.onerror = () => {
                img.classList.remove('loading');
                img.classList.add('error');
                img.src = generatePlaceholderImage(img.alt || 'Image');
                lazyImageObserver.unobserve(img);
            };

            imageLoader.src = actualSrc;
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px 0px'
});

// Generate placeholder image for failed loads
function generatePlaceholderImage(altText) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Icon
    ctx.fillStyle = '#64748b';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📷', canvas.width / 2, canvas.height / 2 - 20);

    // Text
    ctx.font = '16px Arial';
    ctx.fillText(altText, canvas.width / 2, canvas.height / 2 + 40);

    return canvas.toDataURL();
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function () {
    // Find all images that should be lazy loaded
    const lazyImages = document.querySelectorAll('img[data-src], .projects__img, .project-modal__image, .project-modal__gallery-image');

    lazyImages.forEach(img => {
        // Add loading class initially
        img.classList.add('lazy');

        // If image doesn't have data-src, use current src as data-src
        if (!img.dataset.src && img.src) {
            img.dataset.src = img.src;
            img.src = generatePlaceholderImage(img.alt || 'Loading...');
        }

        lazyImageObserver.observe(img);
    });
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Existing scroll handlers can be moved here if needed
}, 16); // ~60fps

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'images/profile.jpg',
        'images/projects/project1.jpg',
        'images/projects/project2.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', preloadCriticalImages);/
    *===== ENHANCED HOVER EFFECTS AND MICRO - INTERACTIONS =====*/
document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.button, .projects__button, .contact__button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        button.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(0) scale(0.98)';
        });

        button.addEventListener('mouseup', function () {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.projects__card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';

            // Animate project image
            const img = this.querySelector('.projects__img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }

            // Animate technology tags
            const techTags = this.querySelectorAll('.projects__tech');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';

            const img = this.querySelector('.projects__img');
            if (img) {
                img.style.transform = 'scale(1)';
            }

            const techTags = this.querySelectorAll('.projects__tech');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });

    // Skills bar hover effects
    const skillsData = document.querySelectorAll('.skills__data');
    skillsData.forEach(skill => {
        skill.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.skills__icon');
            const percentage = this.querySelector('.skills__percentage');

            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--color-accent)';
            }

            if (percentage) {
                percentage.style.boxShadow = '0 0 15px rgba(37, 99, 235, 0.5)';
            }
        });

        skill.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.skills__icon');
            const percentage = this.querySelector('.skills__percentage');

            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            }

            if (percentage) {
                percentage.style.boxShadow = '';
            }
        });
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact__card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';

            const icon = this.querySelector('.contact__card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';

            const icon = this.querySelector('.contact__card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Navigation link hover effects
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form input focus effects
    const formInputs = document.querySelectorAll('.contact__form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.contact__social-link, .footer__social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Certification card special effects
    const certCards = document.querySelectorAll('.certification__card');
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';

            const icon = this.querySelector('.certification__icon');
            const badge = this.querySelector('.certification__badge');

            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }

            if (badge) {
                badge.style.transform = 'rotate(15deg) scale(1.1)';
            }

            // Special effect for award cards
            if (this.classList.contains('award')) {
                this.style.boxShadow = '0 15px 35px rgba(245, 158, 11, 0.3)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';

            const icon = this.querySelector('.certification__icon');
            const badge = this.querySelector('.certification__badge');

            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }

            if (badge) {
                badge.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
});

/*===== CLICK ANIMATIONS =====*/
document.addEventListener('DOMContentLoaded', function () {
    // Add click ripple effect to buttons
    const clickableElements = document.querySelectorAll('.button, .projects__button, .contact__button, .nav__link');

    clickableElements.forEach(element => {
        element.addEventListener('click', function (e) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);/*=
==== ENHANCED PREFERS-REDUCED-MOTION SUPPORT =====*/
// Create a comprehensive motion preference manager
class MotionPreferenceManager {
    constructor() {
        this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.prefersReducedMotion = this.mediaQuery.matches;
        this.init();
    }

    init() {
        // Listen for changes in motion preference
        this.mediaQuery.addEventListener('change', (e) => {
            this.prefersReducedMotion = e.matches;
            this.updateAnimations();
        });

        // Initial setup
        this.updateAnimations();
    }

    updateAnimations() {
        const body = document.body;

        if (this.prefersReducedMotion) {
            body.classList.add('reduce-motion');
            this.disableAnimations();
        } else {
            body.classList.remove('reduce-motion');
            this.enableAnimations();
        }
    }

    disableAnimations() {
        // Disable CSS animations and transitions
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            .reduce-motion *,
            .reduce-motion *::before,
            .reduce-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            .reduce-motion .hero__name {
                border-right: none !important;
            }
            
            .reduce-motion .skills__percentage {
                width: var(--target-width, 0%) !important;
            }
            
            .reduce-motion .animate-pulse,
            .reduce-motion .animate-bounce {
                animation: none !important;
            }
        `;

        // Remove existing reduced motion styles
        const existingStyle = document.getElementById('reduced-motion-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        document.head.appendChild(style);

        // Disable JavaScript animations
        this.disableJSAnimations();
    }

    enableAnimations() {
        // Remove reduced motion styles
        const style = document.getElementById('reduced-motion-styles');
        if (style) {
            style.remove();
        }

        // Re-enable JavaScript animations
        this.enableJSAnimations();
    }

    disableJSAnimations() {
        // Clear any running intervals/timeouts for animations
        const elements = document.querySelectorAll('[data-animation-id]');
        elements.forEach(element => {
            const animationId = element.dataset.animationId;
            if (animationId) {
                clearInterval(parseInt(animationId));
                clearTimeout(parseInt(animationId));
            }
        });

        // Set immediate values for counters
        const statNumbers = document.querySelectorAll('.about__stat-number');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace('+', ''));
            stat.textContent = finalValue + '+';
        });

        // Set immediate values for skill bars
        const skillBars = document.querySelectorAll('.skills__percentage');
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }

    enableJSAnimations() {
        // Re-initialize animations if needed
        // This would trigger the normal animation flow
    }

    // Public method to check motion preference
    shouldReduceMotion() {
        return this.prefersReducedMotion;
    }
}

// Initialize motion preference manager
const motionManager = new MotionPreferenceManager();

// Export for use in other parts of the application
window.motionManager = motionManager;

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
document.addEventListener('DOMContentLoaded', function () {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function () {
            if (!motionManager.shouldReduceMotion()) {
                this.style.outline = '2px solid var(--color-primary)';
                this.style.outlineOffset = '2px';
                this.style.transform = 'scale(1.02)';
            } else {
                this.style.outline = '2px solid var(--color-primary)';
                this.style.outlineOffset = '2px';
            }
        });

        element.addEventListener('blur', function () {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.transform = '';
        });
    });

    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Announce when sections come into view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('aria-labelledby') ||
                    entry.target.querySelector('h2, h3')?.textContent ||
                    'Section';
                announceToScreenReader(`Entered ${sectionName} section`);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
});

/*===== PERFORMANCE MONITORING =====*/
// Monitor animation performance
class AnimationPerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    stop() {
        this.isMonitoring = false;
    }

    monitor() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;

            // If FPS drops below 30, suggest reducing animations
            if (this.fps < 30 && !motionManager.shouldReduceMotion()) {
                console.warn('Low FPS detected. Consider reducing animations for better performance.');
                // Optionally auto-reduce animations
                // this.reduceAnimationsForPerformance();
            }
        }

        requestAnimationFrame(() => this.monitor());
    }

    reduceAnimationsForPerformance() {
        document.body.classList.add('performance-mode');

        const style = document.createElement('style');
        style.id = 'performance-mode-styles';
        style.textContent = `
            .performance-mode * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance monitor in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const perfMonitor = new AnimationPerformanceMonitor();
    perfMonitor.start();
    window.perfMonitor = perfMonitor;
}