/*===== NAVIGATION MENU =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SMOOTH SCROLLING =====*/
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70; // Account for fixed header
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL UP =====*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*===== QUALIFICATIONS TABS =====*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        // Remove active class from all tab contents
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualifications__active');
        });

        // Add active class to target content
        target.classList.add('qualifications__active');

        // Remove active class from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('qualifications__active');
        });

        // Add active class to clicked tab
        tab.classList.add('qualifications__active');
    });
});

/*===== SKILLS ANIMATION =====*/
function animateSkills() {
    const skillsSection = document.querySelector('.about__skills');
    const skillsBars = document.querySelectorAll('.skills__percentage');

    // Check if skills section is in viewport
    const skillsTop = skillsSection.offsetTop;
    const skillsHeight = skillsSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    if (scrollTop > (skillsTop + skillsHeight - windowHeight)) {
        skillsBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }
}

// Animate skills on scroll
window.addEventListener('scroll', animateSkills);

// Animate skills on page load if already in view
document.addEventListener('DOMContentLoaded', animateSkills);

/*===== ENHANCED INTERSECTION OBSERVER FOR ANIMATIONS =====*/
// Enhanced intersection observer that works with the new animation system
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element comes into view
            entry.target.classList.add('animate-in');

            // Check if motion should be reduced
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Animate skills bars if it's the skills section
            if (entry.target.classList.contains('about__skills') && !prefersReducedMotion) {
                const skillsBars = entry.target.querySelectorAll('.skills__percentage');
                skillsBars.forEach((bar, index) => {
                    const percentage = bar.getAttribute('data-percentage');
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                        bar.classList.add('animate');
                    }, 200 + (index * 100));
                });
            } else if (entry.target.classList.contains('about__skills') && prefersReducedMotion) {
                // Immediate animation for reduced motion
                const skillsBars = entry.target.querySelectorAll('.skills__percentage');
                skillsBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = percentage + '%';
                    bar.classList.add('animate');
                });
            }

            // Animate stats counters
            if (entry.target.classList.contains('about__stats')) {
                const stats = entry.target.querySelectorAll('.about__stat-number');
                stats.forEach((stat, index) => {
                    const finalValue = parseInt(stat.textContent.replace('+', ''));

                    if (prefersReducedMotion) {
                        // Immediate display for reduced motion
                        stat.textContent = finalValue + '+';
                    } else {
                        // Animated counter
                        let currentValue = 0;
                        const increment = finalValue / 50;
                        const animationId = setTimeout(() => {
                            const counter = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= finalValue) {
                                    stat.textContent = finalValue + '+';
                                    clearInterval(counter);
                                } else {
                                    stat.textContent = Math.floor(currentValue) + '+';
                                }
                            }, 30);
                            stat.dataset.animationId = counter;
                        }, index * 200);
                        stat.dataset.animationId = animationId;
                    }
                });
            }

            // Trigger project card animations
            if (entry.target.classList.contains('projects')) {
                const projectCards = entry.target.querySelectorAll('.projects__card');
                projectCards.forEach((card, index) => {
                    if (!prefersReducedMotion) {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    } else {
                        card.classList.add('animate-in');
                    }
                });
            }

            // Trigger contact section animations
            if (entry.target.classList.contains('contact')) {
                const contactCards = entry.target.querySelectorAll('.contact__card');
                contactCards.forEach((card, index) => {
                    if (!prefersReducedMotion) {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150);
                    } else {
                        card.classList.add('animate-in');
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about__stats, .about__skills, .about__qualifications, .about__certifications, .projects, .contact');
    animatedElements.forEach(el => observer.observe(el));
});

/*===== RESUME DOWNLOAD TRACKING =====*/
const resumeButton = document.querySelector('a[download]');
if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        // Track resume download (you can integrate with analytics here)
        console.log('Resume downloaded');

        // Optional: Show a success message
        const originalText = resumeButton.innerHTML;
        resumeButton.innerHTML = 'Downloaded! <i class="fas fa-check"></i>';
        resumeButton.style.backgroundColor = 'var(--color-accent)';

        setTimeout(() => {
            resumeButton.innerHTML = originalText;
            resumeButton.style.backgroundColor = '';
        }, 2000);
    });
}

/*===== PROJECTS DATA AND FUNCTIONALITY =====*/
// Project data structure
const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform with shopping cart, payment integration, and admin dashboard.',
        longDescription: 'A comprehensive e-commerce solution built with React and Node.js. Features include user authentication, product catalog, shopping cart functionality, secure payment processing with Stripe, order management, and an admin dashboard for inventory management. The platform is fully responsive and optimized for performance.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'CSS3'],
        category: 'web',
        images: ['images/projects/project1.jpg', 'images/projects/project1-2.jpg', 'images/projects/project1-3.jpg'],
        liveUrl: 'https://ecommerce-demo.example.com',
        githubUrl: 'https://github.com/sonuabraham/ecommerce-platform',
        featured: true,
        completedDate: '2024-01-15'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        longDescription: 'A full-featured task management application that allows teams to collaborate effectively. Built with React Native for cross-platform compatibility, it includes features like real-time synchronization, drag-and-drop task organization, team member assignments, deadline tracking, and progress visualization. The app uses Firebase for backend services and real-time database functionality.',
        technologies: ['React Native', 'Firebase', 'JavaScript', 'Redux'],
        category: 'app',
        images: ['images/projects/project2.jpg', 'images/projects/project2-2.jpg'],
        liveUrl: 'https://taskmanager-demo.example.com',
        githubUrl: 'https://github.com/sonuabraham/task-manager',
        featured: true,
        completedDate: '2023-11-20'
    },
    {
        id: 3,
        title: 'Brand Identity Design',
        description: 'Complete brand identity design including logo, color palette, and marketing materials.',
        longDescription: 'A comprehensive brand identity project for a tech startup. The project included logo design, color palette development, typography selection, business card design, letterhead, and social media templates. Created using Figma and Adobe Creative Suite, the design system ensures consistency across all brand touchpoints.',
        technologies: ['Figma', 'Photoshop', 'Illustrator'],
        category: 'design',
        images: ['images/projects/project3.jpg', 'images/projects/project3-2.jpg', 'images/projects/project3-3.jpg'],
        liveUrl: 'https://behance.net/project-showcase',
        githubUrl: null,
        featured: false,
        completedDate: '2023-09-10'
    },
    {
        id: 4,
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard with location-based forecasts and interactive charts.',
        longDescription: 'A modern weather dashboard application that provides detailed weather information with beautiful visualizations. Features include current weather conditions, 7-day forecasts, interactive charts showing temperature and precipitation trends, location search, and geolocation support. Built with vanilla JavaScript and Chart.js for data visualization.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'API'],
        category: 'web',
        images: ['images/projects/project4.jpg', 'images/projects/project4-2.jpg'],
        liveUrl: 'https://weather-dashboard-demo.example.com',
        githubUrl: 'https://github.com/sonuabraham/weather-dashboard',
        featured: true,
        completedDate: '2023-12-05'
    },
    {
        id: 5,
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing creative work with smooth animations.',
        longDescription: 'A creative portfolio website designed for a photographer and visual artist. The site features a masonry grid layout for showcasing work, smooth scroll animations, lightbox gallery functionality, and a contact form. Built with modern CSS Grid and Flexbox for responsive design, with JavaScript for interactive elements.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        category: 'web',
        images: ['images/projects/project5.jpg'],
        liveUrl: 'https://portfolio-demo.example.com',
        githubUrl: 'https://github.com/sonuabraham/portfolio-site',
        featured: false,
        completedDate: '2023-08-15'
    },
    {
        id: 6,
        title: 'Mobile Banking App UI',
        description: 'Modern mobile banking app interface design with focus on user experience and security.',
        longDescription: 'A comprehensive UI/UX design for a mobile banking application. The design focuses on security, ease of use, and modern aesthetics. Includes screens for account overview, transaction history, money transfers, bill payments, and security settings. Created with Figma, the design system includes components, icons, and interaction prototypes.',
        technologies: ['Figma', 'Sketch', 'Principle'],
        category: 'design',
        images: ['images/projects/project6.jpg', 'images/projects/project6-2.jpg'],
        liveUrl: 'https://figma.com/banking-app-prototype',
        githubUrl: null,
        featured: true,
        completedDate: '2024-02-28'
    }
];

// Initialize projects functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
});

function initializeProjects() {
    renderProjects(projectsData);
    initializeProjectFilters();
    initializeProjectModal();
}

// Render projects to the DOM
function renderProjects(projects) {
    const projectsContainer = document.querySelector('.projects__content');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Create individual project card with lazy loading
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `projects__card mix ${project.category}`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);

    const githubButton = project.githubUrl ?
        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="projects__button">
            Code <i class="fab fa-github projects__button-icon"></i>
        </a>` : '';

    // Create placeholder image for lazy loading
    const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGQUZDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM2NDc0OEIiLz4KPHBhdGggZD0iTTE1MCAyMDBMMjAwIDE1MEwyNTAgMjAwVjI0MEgxNTBWMjAwWiIgZmlsbD0iIzY0NzQ4QiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4QiIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

    card.innerHTML = `
        <img src="${placeholderSrc}" 
             data-src="${project.images[0]}" 
             alt="${project.title} - ${project.description}" 
             class="projects__img lazy" 
             onclick="openProjectModal(${project.id})"
             loading="lazy">
        
        <div class="projects__data">
            <h3 class="projects__title" onclick="openProjectModal(${project.id})">${project.title}</h3>
            <p class="projects__description">${project.description}</p>
            
            <div class="projects__technologies">
                ${project.technologies.map(tech => `<span class="projects__tech">${tech}</span>`).join('')}
            </div>
            
            <div class="projects__buttons">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="projects__button">
                    Demo <i class="fas fa-arrow-right projects__button-icon"></i>
                </a>
                ${githubButton}
            </div>
        </div>
    `;

    return card;
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.projects__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active-work'));
            button.classList.add('active-work');

            // Filter projects
            filterProjects(filter);
        });
    });
}

// Filter projects based on category
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.projects__card');

    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || filter === `.${category}`) {
            card.classList.remove('hidden');
            // Add animation delay for staggered effect
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, Math.random() * 200);
        } else {
            card.classList.add('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });
}

// Project modal functionality
function initializeProjectModal() {
    // Create modal HTML if it doesn't exist
    if (!document.querySelector('.project-modal')) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal__content">
                <button class="project-modal__close" onclick="closeProjectModal()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="" alt="" class="project-modal__image">
                <div class="project-modal__body">
                    <h2 class="project-modal__title"></h2>
                    <p class="project-modal__description"></p>
                    <div class="project-modal__technologies"></div>
                    <div class="project-modal__gallery">
                        <h3 class="project-modal__gallery-title">Project Images</h3>
                        <div class="project-modal__images"></div>
                    </div>
                    <div class="project-modal__buttons"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Close modal when clicking outside
    document.querySelector('.project-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('project-modal')) {
            closeProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.project-modal.active')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.querySelector('.project-modal');
    const modalImage = modal.querySelector('.project-modal__image');
    const modalTitle = modal.querySelector('.project-modal__title');
    const modalDescription = modal.querySelector('.project-modal__description');
    const modalTechnologies = modal.querySelector('.project-modal__technologies');
    const modalImages = modal.querySelector('.project-modal__images');
    const modalButtons = modal.querySelector('.project-modal__buttons');

    // Populate modal content with lazy loading
    modalImage.src = project.images[0];
    modalImage.alt = `${project.title} - Main project image`;
    modalImage.classList.add('lazy', 'loaded'); // Main image loads immediately
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.longDescription;

    // Populate technologies
    modalTechnologies.innerHTML = project.technologies
        .map(tech => `<span class="project-modal__tech">${tech}</span>`)
        .join('');

    // Populate image gallery with lazy loading
    const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGQUZDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM2NDc0OEIiLz4KPHBhdGggZD0iTTE1MCAyMDBMMjAwIDE1MEwyNTAgMjAwVjI0MEgxNTBWMjAwWiIgZmlsbD0iIzY0NzQ4QiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4QiIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

    modalImages.innerHTML = project.images
        .map((image, index) => `
            <img src="${index === 0 ? image : placeholderSrc}" 
                 data-src="${image}" 
                 alt="${project.title} - Image ${index + 1}" 
                 class="project-modal__gallery-image ${index === 0 ? '' : 'lazy'}"
                 loading="lazy">
        `).join('');

    // Populate buttons
    const githubButton = project.githubUrl ?
        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-modal__button project-modal__button--secondary">
            <i class="fab fa-github"></i> View Code
        </a>` : '';

    modalButtons.innerHTML = `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-modal__button">
            <i class="fas fa-external-link-alt"></i> View Live Demo
        </a>
        ${githubButton}
    `;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;/*==
=== CONTACT FORM VALIDATION =====*/
document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('.contact__form-input');
    const submitButton = document.getElementById('contact-submit');
    const formMessage = document.getElementById('form-message');

    // Add event listeners for real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmit);

    function validateField(field) {
        const fieldContainer = field.closest('.contact__form-div');
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous validation states
        fieldContainer.classList.remove('success', 'error');

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (!fieldValue) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (fieldValue.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                } else if (fieldValue.length > 50) {
                    isValid = false;
                    errorMessage = 'Name must be less than 50 characters';
                } else if (!/^[a-zA-Z\s'-]+$/.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!fieldValue) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'subject':
                if (fieldValue && fieldValue.length > 100) {
                    isValid = false;
                    errorMessage = 'Subject must be less than 100 characters';
                }
                break;

            case 'message':
                if (!fieldValue) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (fieldValue.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                } else if (fieldValue.length > 1000) {
                    isValid = false;
                    errorMessage = 'Message must be less than 1000 characters';
                }
                break;
        }

        // Update field validation state
        if (isValid && fieldValue) {
            fieldContainer.classList.add('success');
        } else if (!isValid) {
            fieldContainer.classList.add('error');
            const errorElement = fieldContainer.querySelector('.contact__form-error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }

        return isValid;
    }

    function clearFieldError(field) {
        const fieldContainer = field.closest('.contact__form-div');
        if (fieldContainer.classList.contains('error')) {
            fieldContainer.classList.remove('error');
        }
    }

    function validateForm() {
        let isFormValid = true;
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        // Validate optional subject field if it has content
        const subjectField = contactForm.querySelector('input[name="subject"]');
        if (subjectField && subjectField.value.trim()) {
            if (!validateField(subjectField)) {
                isFormValid = false;
            }
        }

        return isFormValid;
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `contact__form-message ${type} show`;

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }

    function setSubmitButtonState(loading = false) {
        const buttonIcon = submitButton.querySelector('.button__icon');

        if (loading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            buttonIcon.className = 'fas fa-spinner button__icon';
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            buttonIcon.className = 'fas fa-paper-plane button__icon';
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Hide any previous messages
        formMessage.classList.remove('show');

        // Validate form
        if (!validateForm()) {
            showFormMessage('Please fix the errors above and try again.', 'error');
            return;
        }

        // Set loading state
        setSubmitButtonState(true);

        // Collect form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Simulate form submission (replace with actual form submission logic)
            await simulateFormSubmission(formObject);

            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Clear validation states
            formInputs.forEach(input => {
                const fieldContainer = input.closest('.contact__form-div');
                fieldContainer.classList.remove('success', 'error');
            });

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            // Reset button state
            setSubmitButtonState(false);
        }
    }

    // Simulate form submission (replace with actual implementation)
    function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate random success/failure for demo purposes
                // In real implementation, this would be an actual API call
                if (Math.random() > 0.1) { // 90% success rate for demo
                    console.log('Form submitted:', formData);
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }
}

/*===== CONTACT FORM ACCESSIBILITY ENHANCEMENTS =====*/
// Add keyboard navigation support for form
document.addEventListener('keydown', (e) => {
    // Submit form with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        const contactForm = document.getElementById('contact-form');
        const submitButton = document.getElementById('contact-submit');

        if (document.activeElement && contactForm.contains(document.activeElement)) {
            e.preventDefault();
            submitButton.click();
        }
    }
});

/*===== SOCIAL LINKS ANALYTICS TRACKING =====*/
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.contact__social-link, .footer__social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = getSocialPlatform(link.href);
            console.log(`Social link clicked: ${platform}`);

            // Here you can integrate with analytics services like Google Analytics
            // gtag('event', 'social_click', {
            //     'social_platform': platform,
            //     'link_location': 'contact_section'
            // });
        });
    });

    function getSocialPlatform(url) {
        if (url.includes('github.com')) return 'GitHub';
        if (url.includes('linkedin.com')) return 'LinkedIn';
        if (url.includes('twitter.com')) return 'Twitter';
        if (url.includes('instagram.com')) return 'Instagram';
        if (url.includes('behance.net')) return 'Behance';
        if (url.includes('dribbble.com')) return 'Dribbble';
        return 'Unknown';
    }
});

/*===== MOBILE TOUCH INTERACTIONS =====*/
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileTouchInteractions();
});

function initializeMobileTouchInteractions() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.button, .nav__toggle, .nav__close, .projects__button');

    buttons.forEach(button => {
        // Add touch start feedback
        button.addEventListener('touchstart', function () {
            this.classList.add('touch-active');
        }, { passive: true });

        // Remove touch feedback
        button.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });

        // Handle touch cancel
        button.addEventListener('touchcancel', function () {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Improve mobile navigation
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu && navToggle) {
        // Close menu when touching outside
        document.addEventListener('touchstart', (e) => {
            if (navMenu.classList.contains('show-menu') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('show-menu');
            }
        }, { passive: true });
    }

    // Optimize scroll performance on mobile
    let ticking = false;

    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                scrollActive();
                scrollHeader();
                scrollUp();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Use passive listeners for better performance
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Add swipe gestures for project modal
    initializeSwipeGestures();
}

/*===== SWIPE GESTURES FOR MOBILE =====*/
function initializeSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const projectModal = document.querySelector('.project-modal');

    if (projectModal) {
        projectModal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        projectModal.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - could navigate to previous project
                console.log('Swipe right detected');
            } else {
                // Swipe left - could navigate to next project
                console.log('Swipe left detected');
            }
        }

        // Swipe down to close modal
        if (deltaY > minSwipeDistance && Math.abs(deltaX) < minSwipeDistance) {
            if (projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        }
    }
}

/*===== CROSS-BROWSER COMPATIBILITY FIXES =====*/
document.addEventListener('DOMContentLoaded', () => {
    initializeCrossBrowserFixes();
});

function initializeCrossBrowserFixes() {
    // Fix for iOS Safari viewport height issue
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

    // Fix for Safari's bounce scroll
    document.body.addEventListener('touchmove', (e) => {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    // Fix for IE/Edge smooth scroll
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for smooth scroll
        const smoothScrollPolyfill = (target, duration = 800) => {
            const targetElement = document.querySelector(target);
            if (!targetElement) return;

            const targetPosition = targetElement.offsetTop - 70;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        };

        // Replace smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                smoothScrollPolyfill(this.getAttribute('href'));
            });
        });
    }

    // Fix for older browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        const animatedElements = document.querySelectorAll('.about__stats, .about__skills, .about__qualifications, .about__certifications');

        function checkElementsInView() {
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (isInView && !el.classList.contains('animate-in')) {
                    el.classList.add('animate-in');

                    // Trigger animations manually
                    if (el.classList.contains('about__skills')) {
                        const skillsBars = el.querySelectorAll('.skills__percentage');
                        skillsBars.forEach((bar, index) => {
                            const percentage = bar.getAttribute('data-percentage');
                            setTimeout(() => {
                                bar.style.width = percentage + '%';
                            }, 200 + (index * 100));
                        });
                    }
                }
            });
        }

        window.addEventListener('scroll', checkElementsInView, { passive: true });
        checkElementsInView(); // Check on load
    }
}

/*===== PERFORMANCE OPTIMIZATIONS =====*/
document.addEventListener('DOMContentLoaded', () => {
    initializePerformanceOptimizations();
});

function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observe project images for lazy loading
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize events
            if (window.innerWidth > 768 && document.getElementById('nav-menu').classList.contains('show-menu')) {
                document.getElementById('nav-menu').classList.remove('show-menu');
            }
        }, 250);
    });

    // Preload critical resources
    const preloadLinks = [
        'css/styles.css',
        'css/responsive.css',
        'css/animations.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
document.addEventListener('DOMContentLoaded', () => {
    initializeAccessibilityEnhancements();
});

function initializeAccessibilityEnhancements() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark if not present
    const main = document.querySelector('.main');
    if (main && !main.id) {
        main.id = 'main';
    }

    // Improve keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.project-modal.active');
            if (modal) {
                closeProjectModal();
            }

            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                document.getElementById('nav-toggle').focus();
            }
        }

        // Navigate projects with arrow keys when modal is open
        if (document.querySelector('.project-modal.active')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                // Could implement project navigation here
                console.log(`Navigate ${e.key === 'ArrowLeft' ? 'previous' : 'next'} project`);
            }
        }
    });

    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Make announcements available globally
    window.announceToScreenReader = announceToScreenReader;

    // Improve focus management for modal
    const originalOpenProjectModal = window.openProjectModal;
    window.openProjectModal = function (projectId) {
        originalOpenProjectModal(projectId);

        // Focus the close button when modal opens
        setTimeout(() => {
            const closeButton = document.querySelector('.project-modal__close');
            if (closeButton) {
                closeButton.focus();
            }
        }, 100);

        // Announce modal opening
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            announceToScreenReader(`Opened project details for ${project.title}`);
        }
    };

    const originalCloseProjectModal = window.closeProjectModal;
    window.closeProjectModal = function () {
        announceToScreenReader('Project details closed');
        originalCloseProjectModal();

        // Return focus to the element that opened the modal
        const projectCard = document.querySelector(`[data-id="${window.lastOpenedProjectId}"]`);
        if (projectCard) {
            const focusTarget = projectCard.querySelector('.projects__title') || projectCard;
            focusTarget.focus();
        }
    };
};
if (url.includes('linkedin.com')) return 'LinkedIn';
if (url.includes('twitter.com')) return 'Twitter';
if (url.includes('instagram.com')) return 'Instagram';
if (url.includes('behance.net')) return 'Behance';
if (url.includes('dribbble.com')) return 'Dribbble';
if (url.includes('whatsapp.com')) return 'WhatsApp';
return 'Unknown';
    }
});
/*===== A
CCESSIBILITY ENHANCEMENTS =====*/

// Keyboard navigation for mobile menu
document.addEventListener('DOMContentLoaded', () => {
    initializeAccessibility();
});

function initializeAccessibility() {
    // Handle keyboard navigation for mobile menu
    setupMobileMenuKeyboardNavigation();

    // Handle keyboard navigation for tabs
    setupTabKeyboardNavigation();

    // Handle keyboard navigation for project filters
    setupProjectFiltersKeyboardNavigation();

    // Handle focus management for modals
    setupModalFocusManagement();

    // Handle form accessibility
    setupFormAccessibility();

    // Handle skip link functionality
    setupSkipLink();
}

function setupMobileMenuKeyboardNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Handle Enter and Space key for nav toggle
    navToggle?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
            // Focus first nav link when menu opens
            setTimeout(() => {
                const firstNavLink = navMenu.querySelector('.nav__link');
                firstNavLink?.focus();
            }, 100);
        }
    });

    // Handle Enter and Space key for nav close
    navClose?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navClose.click();
            // Return focus to toggle button
            navToggle?.focus();
        }
    });

    // Handle Escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu?.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            navToggle?.focus();
            updateAriaExpanded(navToggle, false);
        }
    });

    // Update ARIA attributes when menu opens/closes
    navToggle?.addEventListener('click', () => {
        const isExpanded = navMenu?.classList.contains('show-menu');
        updateAriaExpanded(navToggle, !isExpanded);
    });

    navClose?.addEventListener('click', () => {
        updateAriaExpanded(navToggle, false);
    });

    // Handle arrow key navigation in mobile menu
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            }
        });
    });
}

function setupTabKeyboardNavigation() {
    // Handle qualifications tabs
    const qualificationTabs = document.querySelectorAll('.qualifications__button');
    const qualificationPanels = document.querySelectorAll('.qualifications__content[data-content]');

    qualificationTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            handleTabKeyNavigation(e, qualificationTabs, qualificationPanels, index);
        });
    });
}

function setupProjectFiltersKeyboardNavigation() {
    const filterButtons = document.querySelectorAll('.projects__item');

    filterButtons.forEach((button, index) => {
        // Convert spans to buttons for better accessibility
        if (button.tagName === 'SPAN') {
            const newButton = document.createElement('button');
            newButton.className = button.className;
            newButton.textContent = button.textContent;
            newButton.setAttribute('data-filter', button.getAttribute('data-filter'));
            newButton.setAttribute('role', 'tab');
            newButton.setAttribute('aria-selected', button.classList.contains('active-work'));
            newButton.setAttribute('tabindex', button.classList.contains('active-work') ? '0' : '-1');

            button.parentNode.replaceChild(newButton, button);
        }

        // Handle keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + filterButtons.length) % filterButtons.length;

                // Update focus and selection
                filterButtons[nextIndex].focus();
                filterButtons[nextIndex].click();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

function setupModalFocusManagement() {
    let lastFocusedElement = null;

    // Override the existing openProjectModal function to handle focus
    const originalOpenModal = window.openProjectModal;
    window.openProjectModal = function (projectId) {
        lastFocusedElement = document.activeElement;
        originalOpenModal(projectId);

        // Focus the modal close button
        setTimeout(() => {
            const closeButton = document.querySelector('.project-modal__close');
            closeButton?.focus();
        }, 100);
    };

    // Override the existing closeProjectModal function to handle focus
    const originalCloseModal = window.closeProjectModal;
    window.closeProjectModal = function () {
        originalCloseModal();

        // Return focus to the element that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };

    // Handle keyboard navigation within modal
    document.addEventListener('keydown', (e) => {
        const modal = document.querySelector('.project-modal.active');
        if (!modal) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            window.closeProjectModal();
        } else if (e.key === 'Tab') {
            // Trap focus within modal
            trapFocusInModal(e, modal);
        }
    });
}

function setupFormAccessibility() {
    const form = document.getElementById('contact-form');
    const inputs = form?.querySelectorAll('.contact__form-input');

    inputs?.forEach(input => {
        // Add aria-describedby for error messages
        const errorElement = input.parentElement.querySelector('.contact__form-error');
        const successElement = input.parentElement.querySelector('.contact__form-success');

        if (errorElement) {
            const errorId = `${input.id}-error`;
            errorElement.id = errorId;
            input.setAttribute('aria-describedby', errorId);
        }

        // Handle Enter key in form fields
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const nextInput = getNextFormElement(input);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    // Focus submit button if it's the last field
                    const submitButton = form.querySelector('button[type="submit"]');
                    submitButton?.focus();
                }
            }
        });
    });
}

function setupSkipLink() {
    const skipLink = document.querySelector('.skip-to-content');
    skipLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Helper functions
function updateAriaExpanded(element, isExpanded) {
    if (element) {
        element.setAttribute('aria-expanded', isExpanded.toString());
    }
}

function handleTabKeyNavigation(e, tabs, panels, currentIndex) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;

        // Update tab selection
        tabs.forEach((tab, index) => {
            const isSelected = index === nextIndex;
            tab.setAttribute('aria-selected', isSelected);
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');

            if (isSelected) {
                tab.focus();
                tab.click(); // Trigger the existing tab functionality
            }
        });
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tabs[currentIndex].click();
    }
}

function trapFocusInModal(e, modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    } else {
        if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

function getNextFormElement(currentElement) {
    const form = currentElement.closest('form');
    const formElements = Array.from(form.querySelectorAll('input, textarea, select, button'));
    const currentIndex = formElements.indexOf(currentElement);

    for (let i = currentIndex + 1; i < formElements.length; i++) {
        const element = formElements[i];
        if (!element.disabled && element.type !== 'hidden') {
            return element;
        }
    }

    return null;
}

// Update existing tab functionality to work with accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Update qualifications tabs to work with keyboard navigation
    const tabs = document.querySelectorAll('[data-target]');
    const tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);

            // Remove active class from all tab contents and hide them
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualifications__active');
                tabContent.setAttribute('aria-hidden', 'true');
            });

            // Add active class to target content and show it
            target.classList.add('qualifications__active');
            target.setAttribute('aria-hidden', 'false');

            // Remove active class from all tabs and update ARIA
            tabs.forEach(t => {
                t.classList.remove('qualifications__active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });

            // Add active class to clicked tab and update ARIA
            tab.classList.add('qualifications__active');
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
        });
    });

    // Update project filters to work with accessibility
    const filterButtons = document.querySelectorAll('.projects__item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update ARIA attributes for all filter buttons
            filterButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
                btn.classList.remove('active-work');
            });

            // Update clicked button
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            button.classList.add('active-work');
        });
    });
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Update project filtering to announce changes
const originalFilterProjects = window.filterProjects || function () { };
window.filterProjects = function (filter) {
    originalFilterProjects(filter);

    // Announce filter change to screen readers
    const filterName = filter === 'all' ? 'All projects' :
        filter === '.web' ? 'Web projects' :
            filter === '.app' ? 'App projects' :
                filter === '.design' ? 'Design projects' : 'Projects';

    announceToScreenReader(`Showing ${filterName}`);
};