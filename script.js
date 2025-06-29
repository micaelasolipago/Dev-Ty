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

// Mobile Menu Functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
let isMenuOpen = false;

navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('mobile-open');
        navMenu.classList.remove('mobile-closed');
        navMenu.style.display = 'flex';
        
        // Animate hamburger to X
        const lines = navToggle.querySelectorAll('.toggle-line');
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        navMenu.classList.remove('mobile-open');
        navMenu.classList.add('mobile-closed');
        
        // Reset hamburger
        const lines = navToggle.querySelectorAll('.toggle-line');
        lines[0].style.transform = 'rotate(0) translate(0, 0)';
        lines[1].style.transform = 'rotate(0) translate(0, 0)';
        
        // Hide menu after animation
        setTimeout(() => {
            if (!isMenuOpen) {
                navMenu.style.display = 'none';
            }
        }, 300);
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            navToggle.click();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.click();
    }
});

// Custom Cursor - Only on desktop
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Check if device supports hover (desktop)
if (window.matchMedia('(hover: hover)').matches) {
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
} else {
    // Hide cursor on mobile devices
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}

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

// Parallax effect for geometric elements - Only on desktop
if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.geo-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Craft item hover animations - Only on desktop
if (window.matchMedia('(hover: hover)').matches) {
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
}

// Work item hover effects with smooth transitions - Only on desktop
if (window.matchMedia('(hover: hover)').matches) {
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
}

// Touch events for mobile work items
if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.work-item').forEach(item => {
        let touchStartY = 0;
        let touchEndY = 0;
        
        item.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        item.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const preview = item.querySelector('.work-preview');
            const overlay = item.querySelector('.work-overlay');
            
            if (touchEndY < touchStartY - 50) { // Swipe up
                overlay.style.transform = 'translateY(0)';
            } else if (touchEndY > touchStartY + 50) { // Swipe down
                overlay.style.transform = 'translateY(100%)';
            }
        }
    });
}

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
    
    // Check if input has value on load
    if (input.value) {
        const field = input.parentElement;
        const line = field.querySelector('.field-line');
        field.classList.add('focused');
        line.style.width = '100%';
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const originalText = buttonText.textContent;
    
    // Show loading state
    buttonText.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        buttonText.textContent = '¡Enviado!';
        submitButton.style.background = '#4CAF50';
        
        setTimeout(() => {
            buttonText.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            this.reset();
            
            // Reset form field states
            this.querySelectorAll('.form-field').forEach(field => {
                field.classList.remove('focused');
                const line = field.querySelector('.field-line');
                if (line) line.style.width = '0';
            });
        }, 2000);
    }, 1500);
});

// Language toggle functionality
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'es';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
    setLanguage(currentLang);
});

// Language translations
const translations = {
    es: {
        nav_home: 'Inicio',
        nav_craft: 'La Experiencia',
        nav_work: 'Proyectos',
        nav_connect: 'Contacto',
        hero_title: 'Solipago',
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
        form_send: 'Enviar Mensaje'
    },
    en: {
        nav_home: 'Home',
        nav_craft: 'Experience',
        nav_work: 'Projects',
        nav_connect: 'Contact',
        hero_title: 'Solipago',
        hero_desc: 'Where precision meets innovation in web development',
        hero_cta_primary: 'Start Project',
        hero_cta_secondary: 'View Projects',
        scroll: 'Scroll',
        craft_title: 'The Experience',
        craft_subtitle: 'Three pillars of digital excellence',
        craft_dev_title: 'Development',
        craft_dev_desc: 'Architecture of robust and scalable solutions with cutting-edge technologies',
        craft_design_title: 'Design',
        craft_design_desc: 'We create intuitive experiences that connect with users',
        craft_opt_title: 'Consulting',
        craft_opt_desc: 'Web development consulting and website optimization',
        work_title: 'Selected Projects',
        work_subtitle: 'Projects that define our approach',
        work1_title: 'E-Commerce Platform',
        work1_desc: 'Modern online store with fluid user experience',
        work2_title: 'Portfolio Site',
        work2_desc: 'Minimalist design for creative professionals',
        work3_title: 'Dashboard Application',
        work3_desc: 'Data visualization and analysis platform',
        connect_title: 'Let\'s Create Together',
        connect_desc: 'Ready to transform your digital presence? Let\'s talk about your vision and make it a reality.',
        connect_email_label: 'Email',
        connect_location_label: 'Location',
        connect_location_value: 'Global',
        form_name: 'Name',
        form_email: 'Email',
        form_message: 'Message',
        form_send: 'Send Message'
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Initialize language
setLanguage(currentLang);

// Responsive adjustments
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && isMenuOpen) {
        navMenu.style.display = 'none';
        isMenuOpen = false;
        
        // Reset hamburger
        const lines = navToggle.querySelectorAll('.toggle-line');
        lines[0].style.transform = 'rotate(0) translate(0, 0)';
        lines[1].style.transform = 'rotate(0) translate(0, 0)';
    }
}

window.addEventListener('resize', handleResize);

// Performance optimizations
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

// Throttled scroll events
const throttledScroll = throttle(() => {
    // Any scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources); 