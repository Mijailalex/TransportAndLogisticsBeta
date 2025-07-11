// ===================================
// PERU LOGISTICS - ANIMACIONES DINÁMICAS MEJORADAS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // INTERSECTION OBSERVER PARA ANIMACIONES EN SCROLL
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observer para elementos individuales
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Aplicar animación según la clase
                if (element.classList.contains('animate-on-scroll')) {
                    element.classList.add('animate-fade-up');
                }
                
                if (element.classList.contains('timeline-item')) {
                    element.classList.add('animate-fade-up');
                }
                
                if (element.classList.contains('stat-item')) {
                    element.classList.add('animate-bounce-in');
                    animateNumber(element);
                }
                
                elementObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observer para grupos con animación escalonada
    const groupObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const items = container.querySelectorAll('.feature-card, .service-card, .news-card, .value-card, .benefit-card, .responsibility-card');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-fade-up');
                        item.style.animationDelay = `${index * 0.1}s`;
                    }, index * 100);
                });
                
                groupObserver.unobserve(container);
            }
        });
    }, observerOptions);
    
    // Aplicar observers
    document.querySelectorAll('.timeline-item, .stat-item, .animate-on-scroll').forEach(el => {
        elementObserver.observe(el);
    });
    
    document.querySelectorAll('.features, .services-grid, .news-grid, .values-grid, .benefits-grid, .responsibility-grid').forEach(el => {
        groupObserver.observe(el);
    });
    
    // ===================================
    // ANIMACIÓN DE NÚMEROS (CONTADORES)
    // ===================================
    
    function animateNumber(element) {
        const numberElement = element.querySelector('.stat-number, h4');
        if (!numberElement) return;
        
        const finalNumber = numberElement.textContent.replace(/[^\d.]/g, '');
        if (!finalNumber) return;
        
        const target = parseFloat(finalNumber);
        const suffix = numberElement.textContent.replace(finalNumber, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayNumber = Math.floor(current);
            if (target % 1 !== 0) {
                displayNumber = current.toFixed(1);
            }
            
            numberElement.textContent = displayNumber + suffix;
            numberElement.classList.add('counting');
        }, 40);
    }
    
    // ===================================
    // NAVEGACIÓN STICKY MEJORADA
    // ===================================
    
    const internalNav = document.querySelector('.internal-nav');
    if (internalNav) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Agregar clase 'scrolled' cuando se hace scroll
            if (currentScrollY > 100) {
                internalNav.classList.add('scrolled');
            } else {
                internalNav.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Smooth scroll para links internos
        const tabLinks = document.querySelectorAll('.tab-link');
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('#header').offsetHeight;
                    const navHeight = internalNav.offsetHeight;
                    const offsetTop = targetElement.offsetTop - headerHeight - navHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar active state
                    tabLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // ===================================
    // EFECTOS DE HOVER DINÁMICOS
    // ===================================
    
    // Aplicar efectos automáticamente a cards
    document.querySelectorAll('.feature-card, .service-card, .value-card, .benefit-card').forEach(card => {
        card.classList.add('hover-lift-rotate', 'depth-card');
        
        // Efecto de partículas en hover
        card.addEventListener('mouseenter', function() {
            if (!this.querySelector('.particles-bg')) {
                this.classList.add('particles-bg');
            }
        });
    });
    
    // ===================================
    // SLIDER MEJORADO CON AUTOPLAY INTELIGENTE
    // ===================================
    
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        let isAnimating = false;
        let autoplayInterval;
        let isUserInteracting = false;
        
        function showSlide(index, direction = 'next') {
            if (isAnimating || index === currentSlide) return;
            isAnimating = true;
            
            const current = slides[currentSlide];
            const next = slides[index];
            
            // Animación mejorada
            current.style.transform = direction === 'next' ? 
                'translateX(-100%) scale(0.8)' : 'translateX(100%) scale(0.8)';
            current.style.opacity = '0';
            
            next.style.transform = direction === 'next' ? 
                'translateX(100%) scale(0.8)' : 'translateX(-100%) scale(0.8)';
            next.classList.add('active');
            next.style.opacity = '1';
            
            setTimeout(() => {
                next.style.transform = 'translateX(0) scale(1)';
                setTimeout(() => {
                    current.classList.remove('active');
                    current.style.transform = '';
                    current.style.opacity = '';
                    isAnimating = false;
                }, 300);
            }, 50);
            
            // Actualizar dots
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next, 'next');
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev, 'prev');
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (!isUserInteracting) {
                    nextSlide();
                }
            }, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            isUserInteracting = true;
            nextSlide();
            setTimeout(() => isUserInteracting = false, 3000);
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            isUserInteracting = true;
            prevSlide();
            setTimeout(() => isUserInteracting = false, 3000);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                isUserInteracting = true;
                const direction = index > currentSlide ? 'next' : 'prev';
                showSlide(index, direction);
                setTimeout(() => isUserInteracting = false, 3000);
            });
        });
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        slider.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', e => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                isUserInteracting = true;
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                setTimeout(() => isUserInteracting = false, 3000);
            }
        });
        
        // Start autoplay
        startAutoplay();
    }
    
    // ===================================
    // EFECTOS DE TEXTO DINÁMICOS
    // ===================================
    
    // Aplicar efecto gradient animado a títulos principales
    document.querySelectorAll('.hero-title, .section-title').forEach(title => {
        if (!title.classList.contains('text-gradient-animated')) {
            title.classList.add('text-gradient-animated');
        }
    });
    
    // ===================================
    // BARRAS DE PROGRESO ANIMADAS
    // ===================================
    
    function createProgressBars() {
        const statsItems = document.querySelectorAll('.stat-item, .impact-item');
        
        statsItems.forEach(item => {
            const numberEl = item.querySelector('h4');
            if (numberEl) {
                const number = parseFloat(numberEl.textContent.replace(/[^\d.]/g, ''));
                if (number && number <= 100) {
                    const progressBar = document.createElement('div');
                    progressBar.className = 'progress-bar';
                    progressBar.style.marginTop = '1rem';
                    
                    const progressFill = document.createElement('div');
                    progressFill.className = 'progress-fill';
                    progressFill.style.width = '0%';
                    
                    progressBar.appendChild(progressFill);
                    item.appendChild(progressBar);
                    
                    // Animar cuando sea visible
                    const observer = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    progressFill.style.width = number + '%';
                                }, 500);
                                observer.unobserve(entry.target);
                            }
                        });
                    });
                    
                    observer.observe(item);
                }
            }
        });
    }
    
    createProgressBars();
    
    // ===================================
    // ICONOS CON ANIMACIÓN DE PULSO
    // ===================================
    
    document.querySelectorAll('.feature-icon, .service-icon, .value-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('icon-pulse');
        });
        
        icon.addEventListener('animationend', function() {
            this.classList.remove('icon-pulse');
        });
    });
    
    // ===================================
    // EFECTOS DE PARTÍCULAS INTELIGENTES
    // ===================================
    
    function addParticleEffect(element) {
        if (window.innerWidth <= 768) return; // No en móviles
        
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('particles-bg')) {
                this.classList.add('particles-bg');
            }
        });
    }
    
    // Aplicar a secciones principales
    document.querySelectorAll('.hero, .cta, .features').forEach(addParticleEffect);
    
    // ===================================
    // OPTIMIZACIÓN DE PERFORMANCE
    // ===================================
    
    // Intersection Observer para lazy loading de animaciones
    const lazyAnimationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.willChange = 'transform, opacity';
                } else {
                    entry.target.style.willChange = 'auto';
                }
            });
        },
        { rootMargin: '100px' }
    );
    
    document.querySelectorAll('.feature-card, .service-card, .timeline-item').forEach(el => {
        lazyAnimationObserver.observe(el);
    });
    
    // ===================================
    // MANEJO DE ERRORES Y FALLBACKS
    // ===================================
    
    // Detectar soporte de animaciones
    const supportsAnimations = CSS.supports('animation', 'fadeIn 1s');
    if (!supportsAnimations) {
        document.body.classList.add('no-animations');
    }
    
    // Detectar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    console.log('🎨 Peru Logistics - Animaciones dinámicas cargadas exitosamente');
});

// ===================================
// UTILIDADES GLOBALES
// ===================================

// Función para agregar animación a elemento específico
window.addAnimation = function(element, animationClass, delay = 0) {
    setTimeout(() => {
        element.classList.add(animationClass);
    }, delay);
};

// Función para crear efecto de escritura
window.typewriterEffect = function(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(timer);
        }
    }, speed);
};