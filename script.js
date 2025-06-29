// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorOutline.style.left = e.clientX - 20 + 'px';
        cursorOutline.style.top = e.clientY - 20 + 'px';
    }, 100);
});

// Cursor hover effects
document.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'scale(1)';
    cursorOutline.style.transform = 'scale(1)';
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'scale(0)';
    cursorOutline.style.transform = 'scale(0)';
});

// Enhanced cursor effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .craft-item, .work-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
        cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.borderColor = 'var(--text-primary)';
    });
});

// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
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
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.craft-item, .work-item, .section-title, .section-subtitle');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Parallax effect for geometric elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.geo-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
    });
});

// Craft item hover animations
document.querySelectorAll('.craft-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const number = card.querySelector('.craft-number');
        const visual = card.querySelector('.craft-visual');
        
        number.style.transform = 'scale(1.2)';
        number.style.opacity = '0.6';
        visual.style.opacity = '0.6';
        visual.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const number = card.querySelector('.craft-number');
        const visual = card.querySelector('.craft-visual');
        
        number.style.transform = 'scale(1)';
        number.style.opacity = '0.3';
        visual.style.opacity = '0.3';
        visual.style.transform = 'scale(1)';
    });
});

// Work item hover effects with smooth transitions
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const preview = item.querySelector('.work-preview');
        const overlay = item.querySelector('.work-overlay');
        
        preview.style.transform = 'scale(1.02)';
        overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        const preview = item.querySelector('.work-preview');
        const overlay = item.querySelector('.work-overlay');
        
        preview.style.transform = 'scale(1)';
        overlay.style.transform = 'translateY(100%)';
    });
});

// Form field animations
document.querySelectorAll('.form-field input, .form-field textarea').forEach(input => {
    input.addEventListener('focus', () => {
        const field = input.parentElement;
        const line = field.querySelector('.field-line');
        
        field.classList.add('focused');
        line.style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
        const field = input.parentElement;
        const line = field.querySelector('.field-line');
        
        if (!input.value) {
            field.classList.remove('focused');
            line.style.width = '0';
        }
    });
});

// Contact form submission with enhanced feedback
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-button');
    const buttonText = submitBtn.querySelector('.button-text');
    const buttonArrow = submitBtn.querySelector('.button-arrow');
    const originalText = buttonText.textContent;
    
    // Animate button
    submitBtn.style.transform = 'scale(0.95)';
    buttonText.textContent = 'Sending...';
    buttonArrow.style.transform = 'rotate(45deg) scale(0.8)';
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        buttonText.textContent = 'Message Sent!';
        buttonArrow.style.transform = 'rotate(45deg) scale(1.2)';
        submitBtn.style.background = 'rgba(255, 255, 255, 0.9)';
        
        // Reset form
        setTimeout(() => {
            buttonText.textContent = originalText;
            buttonArrow.style.transform = 'rotate(45deg)';
            submitBtn.style.background = '#ffffff';
            e.target.reset();
            
            // Reset form fields
            document.querySelectorAll('.form-field').forEach(field => {
                field.classList.remove('focused');
                const line = field.querySelector('.field-line');
                if (line) line.style.width = '0';
            });
        }, 2000);
    }, 1500);
});

// Navbar scroll effect with enhanced styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav');
    const brandSymbol = document.querySelector('.brand-symbol');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
        brandSymbol.style.transform = 'rotate(180deg)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        brandSymbol.style.transform = 'rotate(0deg)';
    }
});

// Mobile navigation toggle with smooth animation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate toggle lines
    const lines = navToggle.querySelectorAll('.toggle-line');
    if (navToggle.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        lines[0].style.transform = 'rotate(0deg) translate(0, 0)';
        lines[1].style.transform = 'rotate(0deg) translate(0, 0)';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const lines = navToggle.querySelectorAll('.toggle-line');
        lines[0].style.transform = 'rotate(0deg) translate(0, 0)';
        lines[1].style.transform = 'rotate(0deg) translate(0, 0)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: #ffffff;
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// Page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.title-word, .hero-description, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize page
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// --- MULTILANGUAGE SUPPORT ---
const translations = {
    es: {
        nav_home: 'Inicio',
        nav_craft: 'La Experiencia',
        nav_work: 'Proyectos',
        nav_connect: 'Contacto',
        hero_title: '<span class="title-word">Solipago</span><span class="title-word">Cromencemos</span>',
        hero_desc: 'Donde la precisión se encuentra con la innovación en desarrollo web',
        hero_cta_primary: 'Comenzar Proyecto',
        hero_cta_secondary: 'Ver Proyectos',
        scroll: 'Desliza',
        craft_title: 'La Experiencia',
        craft_subtitle: 'Tres pilares de excelencia digital',
        craft_dev_title: 'Desarrollo',
        craft_dev_desc: 'Arquitectura de soluciones robustas y escalables con tecnologías de vanguardia',
        craft_design_title: 'Diseño',
        craft_design_desc: 'Creamos experiencias intuitivas que conectan con los usuarios',
        craft_opt_title: 'Asesoría',
        craft_opt_desc: 'Asesoría en desarrollo web y optimización de sitios web',
        work_title: 'Proyectos Seleccionados',
        work_subtitle: 'Proyectos que definen nuestro enfoque',
        work1_title: 'Plataforma E-Commerce',
        work1_desc: 'Tienda online moderna con experiencia de usuario fluida',
        work2_title: 'Sitio Portfolio',
        work2_desc: 'Diseño minimalista para profesionales creativos',
        work3_title: 'Aplicación Dashboard',
        work3_desc: 'Plataforma de visualización y análisis de datos',
        connect_title: 'Creemos Juntos',
        connect_desc: '¿Listo para transformar tu presencia digital? Conversemos sobre tu visión y hagámosla realidad.',
        connect_email_label: 'Email',
        connect_location_label: 'Ubicación',
        connect_location_value: 'Global',
        form_name: 'Nombre',
        form_email: 'Correo electrónico',
        form_message: 'Mensaje',
        form_send: 'Enviar Mensaje',
    },
    en: {
        nav_home: 'Home',
        nav_craft: 'Craft',
        nav_work: 'Work',
        nav_connect: 'Contact',
        hero_title: '<span class="title-word">Digital</span><span class="title-word">Craftsmanship</span>',
        hero_desc: 'Where precision meets innovation in web development',
        hero_cta_primary: 'Start Project',
        hero_cta_secondary: 'View Work',
        scroll: 'Scroll',
        craft_title: 'The Craft',
        craft_subtitle: 'Three pillars of digital excellence',
        craft_dev_title: 'Development',
        craft_dev_desc: 'Architecting robust, scalable solutions with cutting-edge technologies',
        craft_design_title: 'Design',
        craft_design_desc: 'Creating intuitive experiences that resonate with users',
        craft_opt_title: 'Optimization',
        craft_opt_desc: 'Fine-tuning performance for exceptional user experiences',
        work_title: 'Selected Work',
        work_subtitle: 'Projects that define our approach',
        work1_title: 'E-Commerce Platform',
        work1_desc: 'Modern online store with seamless user experience',
        work2_title: 'Portfolio Website',
        work2_desc: 'Minimalist design for creative professionals',
        work3_title: 'Dashboard Application',
        work3_desc: 'Data visualization and analytics platform',
        connect_title: "Let's Create Together",
        connect_desc: "Ready to transform your digital presence? Let's discuss your vision and bring it to life.",
        connect_email_label: 'Email',
        connect_location_label: 'Location',
        connect_location_value: 'Worldwide',
        form_name: 'Name',
        form_email: 'Email',
        form_message: 'Message',
        form_send: 'Send Message',
    }
};

let currentLang = 'es';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else if (el.classList.contains('hero-title')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    // Cambia el texto del botón
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    }
}); 