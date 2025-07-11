// ===================================
// PERU LOGISTICS - DYNAMIC ENHANCED JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // PARTICLE SYSTEM
    // ===================================
    
    function createParticleSystem() {
        const hero = document.querySelector('.hero');
        const pageHeader = document.querySelector('.page-header');
        
        [hero, pageHeader].forEach(container => {
            if (container) {
                const particles = document.createElement('div');
                particles.className = 'particles';
                container.appendChild(particles);
                
                // Create floating particles
                for (let i = 0; i < 30; i++) {
                    createParticle(particles);
                }
            }
        });
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${animationDuration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle(container);
            }
        }, (animationDuration + delay) * 1000);
    }
    
    // ===================================
    // ENHANCED NAVIGATION
    // ===================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('#header');
    
    // Mobile menu with enhanced animations
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isActive = navToggle.classList.contains('active');
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Animate menu items
            if (!isActive) {
                navLinks.forEach((link, index) => {
                    link.style.animation = `slideInLeft 0.3s ease-out ${index * 0.1}s both`;
                });
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Enhanced header scroll effect with parallax
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            const parentItem = link.closest('.nav-item');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                parentItem.classList.add('active');
            } else {
                parentItem.classList.remove('active');
            }
        });
    }
    
    updateActiveNavLink();
    
    // ===================================
    // ADVANCED SLIDER WITH 3D EFFECTS
    // ===================================
    
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    
    if (slider && slides.length > 0) {
        
        function showSlide(index, direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;
            
            const currentSlideEl = slides[currentSlide];
            const nextSlideEl = slides[index];
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // 3D transition effect
            if (direction === 'next') {
                currentSlideEl.style.transform = 'translateX(-100%) rotateY(-15deg)';
                nextSlideEl.style.transform = 'translateX(100%) rotateY(15deg)';
            } else {
                currentSlideEl.style.transform = 'translateX(100%) rotateY(15deg)';
                nextSlideEl.style.transform = 'translateX(-100%) rotateY(-15deg)';
            }
            
            setTimeout(() => {
                currentSlideEl.classList.remove('active');
                nextSlideEl.classList.add('active');
                nextSlideEl.style.transform = 'translateX(0) rotateY(0)';
                
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
                
                setTimeout(() => {
                    currentSlideEl.style.transform = '';
                    isAnimating = false;
                }, 300);
            }, 100);
        }
        
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % totalSlides;
            showSlide(nextIndex, 'next');
            currentSlide = nextIndex;
        }
        
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex, 'prev');
            currentSlide = prevIndex;
        }
        
        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (index !== currentSlide && !isAnimating) {
                    const direction = index > currentSlide ? 'next' : 'prev';
                    showSlide(index, direction);
                    currentSlide = index;
                }
            });
        });
        
        // Auto-play slider with pause on hover
        let slideInterval = setInterval(nextSlide, 6000);
        
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 6000);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (slider.matches(':hover')) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });
        
        // Initialize first slide
        showSlide(0);
    }
    
    // ===================================
    // SMOOTH SCROLLING WITH EASING
    // ===================================
    
    function smoothScrollTo(target, duration = 1000) {
        const targetPosition = target.offsetTop - header.offsetHeight - 20;
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
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target);
            }
        });
    });
    
    // ===================================
    // DYNAMIC SCROLL TO TOP BUTTON
    // ===================================
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-rocket"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);
    
    // Calculate scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollToTopBtn.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Enhanced scroll to top with rocket animation
    scrollToTopBtn.addEventListener('click', function() {
        // Change icon to rocket launching
        this.innerHTML = '<i class="fas fa-rocket"></i>';
        this.style.animation = 'rocketLaunch 0.6s ease-out';
        
        // Smooth scroll to top
        smoothScrollTo(document.body, 800);
        
        // Reset animation after completion
        setTimeout(() => {
            this.style.animation = '';
            this.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }, 800);
    });
    
    // ===================================
    // ENHANCED CONTACT FORM
    // ===================================
    
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        // Real-time validation with enhanced UX
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            // Create floating label effect
            const label = field.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                field.addEventListener('focus', function() {
                    label.style.transform = 'translateY(-25px) scale(0.9)';
                    label.style.color = 'var(--primary-color)';
                });
                
                field.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
            }
            
            // Enhanced validation
            field.addEventListener('input', function() {
                validateFieldEnhanced(this);
            });
        });
        
        function validateFieldEnhanced(field) {
            const value = field.value.trim();
            const fieldContainer = field.closest('.form-group');
            
            // Remove existing styles
            field.classList.remove('error', 'success');
            const existingError = fieldContainer.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            let isValid = true;
            let errorMessage = '';
            
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            } else if (field.type === 'email' && value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            } else if (field.type === 'tel' && value && !isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
            
            if (!isValid) {
                field.classList.add('error');
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = errorMessage;
                fieldContainer.appendChild(errorElement);
                
                // Shake animation for errors
                field.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            } else if (value) {
                field.classList.add('success');
            }
            
            return isValid;
        }
        
        // Form submission with loading states
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Validate all fields
            let isFormValid = true;
            requiredFields.forEach(field => {
                if (!validateFieldEnhanced(field)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                showNotification('Por favor, corrige los errores en el formulario', 'error');
                return;
            }
            
            // Show loading state with progress
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.width = submitBtn.offsetWidth + 'px'; // Prevent layout shift
            
            // Simulate form submission with progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress > 90) progress = 90;
                
                submitBtn.innerHTML = `<div class="loading-spinner"></div> Enviando... ${Math.round(progress)}%`;
            }, 200);
            
            // Simulate API call
            setTimeout(() => {
                clearInterval(progressInterval);
                
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = 'var(--gradient-success)';
                
                // Reset form with animation
                setTimeout(() => {
                    this.reset();
                    requiredFields.forEach(field => {
                        field.classList.remove('success', 'error');
                        const label = field.previousElementSibling;
                        if (label && label.tagName === 'LABEL') {
                            label.style.transform = '';
                            label.style.color = '';
                        }
                    });
                    
                    showNotification('¡Solicitud enviada exitosamente! Te contactaremos pronto.', 'success');
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.width = '';
                    
                }, 2000);
                
            }, 3000);
        });
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function isValidPhone(phone) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
            return phoneRegex.test(phone);
        }
    }
    
    // ===================================
    // INTERACTIVE FAQ WITH ANIMATIONS
    // ===================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other FAQ items with stagger effect
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    setTimeout(() => {
                        otherItem.classList.remove('open');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherAnswer.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                    }, Math.abs(otherIndex - index) * 50);
                }
            });
            
            // Toggle current item
            setTimeout(() => {
                if (isOpen) {
                    item.classList.remove('open');
                    answer.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            }, isOpen ? 0 : Math.abs(index) * 50);
        });
    });
    
    // ===================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Staggered animations
    const staggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.feature-card, .service-card, .news-card, .value-card, .benefit-card, .responsibility-card, .case-card');
                
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('fade-in-up');
                    }, index * 100);
                });
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Single element animations
    const singleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                singleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for staggered animations
    const staggerSections = document.querySelectorAll('.features, .services-overview, .news, .why-choose-us');
    staggerSections.forEach(section => {
        staggerObserver.observe(section);
    });
    
    // Observe individual elements
    const singleElements = document.querySelectorAll('.timeline-item, .stat-item, .content-text, .content-image');
    singleElements.forEach(el => {
        singleObserver.observe(el);
    });
    
    // ===================================
    // ENHANCED UTILITY FUNCTIONS
    // ===================================
    
    // Advanced notification system
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-progress"></div>
        `;
        
        document.body.appendChild(notification);
        
        // Add enhanced styles
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    border-radius: var(--border-radius-lg);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 10000;
                    transform: translateX(120%);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    background: rgba(16, 185, 129, 0.95);
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                }
                .notification-error {
                    background: rgba(239, 68, 68, 0.95);
                    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
                }
                .notification-info {
                    background: rgba(59, 130, 246, 0.95);
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 1rem 1.5rem;
                    color: white;
                }
                .notification-close {
                    background: none;
                    border: none;
                    margin-left: auto;
                    cursor: pointer;
                    color: white;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                    padding: 4px;
                    border-radius: 4px;
                }
                .notification-close:hover {
                    opacity: 1;
                    background: rgba(255, 255, 255, 0.1);
                }
                .notification-progress {
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    position: relative;
                    overflow: hidden;
                }
                .notification-progress::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    animation: progress-bar ${duration}ms linear;
                }
                @keyframes progress-bar {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Show notification with bounce effect
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            closeNotification(notification);
        });
        
        // Auto-hide
        setTimeout(() => {
            if (notification.parentNode) {
                closeNotification(notification);
            }
        }, duration);
        
        function closeNotification(notif) {
            notif.style.transform = 'translateX(120%) scale(0.9)';
            notif.style.opacity = '0';
            setTimeout(() => {
                notif.remove();
            }, 400);
        }
    }
    
    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Debounce function for scroll events
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
    
    // Optimized scroll events
    window.addEventListener('scroll', throttle(updateScrollProgress, 16)); // 60fps
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // CUSTOM ANIMATIONS KEYFRAMES
    // ===================================
    
    const customAnimations = document.createElement('style');
    customAnimations.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes rocketLaunch {
            0% {
                transform: scale(1) translateY(0);
            }
            50% {
                transform: scale(1.2) translateY(-10px);
            }
            100% {
                transform: scale(1) translateY(-50px);
                opacity: 0.8;
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounceInDown {
            0% {
                opacity: 0;
                transform: translate3d(0, -3000px, 0) scaleY(3);
            }
            60% {
                opacity: 1;
                transform: translate3d(0, 25px, 0) scaleY(0.9);
            }
            75% {
                transform: translate3d(0, -10px, 0) scaleY(0.95);
            }
            90% {
                transform: translate3d(0, 5px, 0) scaleY(0.985);
            }
            100% {
                transform: translate3d(0, 0, 0) scaleY(1);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
            }
            50% {
                box-shadow: 0 0 30px rgba(37, 99, 235, 0.6), 0 0 40px rgba(37, 99, 235, 0.4);
            }
        }
    `;
    document.head.appendChild(customAnimations);
    
    // ===================================
    // EASTER EGGS & INTERACTIONS
    // ===================================
    
    // Konami Code Easter Egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerEasterEgg() {
        showNotification('🚀 ¡Código Konami activado! Peru Logistics mode: TURBO', 'success', 3000);
        
        // Add rainbow animation to logo
        const logo = document.querySelector('.nav-logo img');
        if (logo) {
            logo.style.animation = 'rainbow 2s ease-in-out infinite';
        }
        
        // Create confetti effect
        createConfetti();
    }
    
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 100%, 50%);
                z-index: 10000;
                pointer-events: none;
                animation: confetti 3s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti {
            0% {
                transform: translateY(-100vh) rotateZ(0deg);
            }
            100% {
                transform: translateY(100vh) rotateZ(720deg);
            }
        }
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    // ===================================
    // INITIALIZATION COMPLETE
    // ===================================
    
    // Initialize particle system
    createParticleSystem();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Show welcome notification for first time visitors
    if (!localStorage.getItem('peru-logistics-visited')) {
        setTimeout(() => {
            showNotification('¡Bienvenido a Peru Logistics! 🚛', 'info', 4000);
            localStorage.setItem('peru-logistics-visited', 'true');
        }, 1000);
    }
    
    console.log('🚀 Peru Logistics - Enhanced dynamic website initialized successfully!');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in: ${pageLoadTime}ms`);
        });
    }
});

// ===================================
// SERVICE WORKER REGISTRATION
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===================================
// GLOBAL PERFORMANCE OPTIMIZATION
// ===================================

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'css/main.css', as: 'style' },
        { href: 'css/navigation.css', as: 'style' },
        { href: 'css/responsive.css', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// Initialize critical resources on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}