// Global Variables
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTop');
const loader = document.querySelector('.loader');
const contactForm = document.querySelector('.contact-form');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;
if (savedTheme === 'dark') {
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing Animation
function typeWriter(element, texts, speed = 100) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? speed - 50 : speed;
        setTimeout(type, typeSpeed);
    }

    function completeCycle() {
        if (!isDeleting && charIndex === texts[textIndex].length) {
            isDeleting = true;
            return setTimeout(type, speed + 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            return setTimeout(type, 500);
        }
        type();
    }

    completeCycle();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.querySelector('.typed-text');
    const texts = ['Bhavesh Baviskar', 'IT Student', 'Web Developer'];
    typeWriter(typedText, texts, 150);

    // Hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });

    // Scroll to top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Animate cards on scroll
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .info-item');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        cardObserver.observe(el);
    });

    // Contact form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate form submission
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Message Sent! 🎉';
            contactForm.reset();
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Navbar shrink on scroll for mobile
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});