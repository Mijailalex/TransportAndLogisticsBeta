// ===================================
// PERU LOGISTICS - ANIMACIONES CORREGIDAS Y OPTIMIZADAS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // SISTEMA DE LIMPIEZA DE ANIMACIONES
    // ===================================
    
    // Limpiar conflictos de animaciones previas
    function cleanupAnimations() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.willChange = 'auto';
            el.addEventListener('transitionend', function() {
                this.style.willChange = 'auto';
            });
            el.addEventListener('animationend', function() {
                this.style.willChange = 'auto';
                this.classList.add('animation-complete');
            });
        });
    }
    
    // ===================================
    // CORRECCIÓN: HOVER STATES QUE REVIERTEN
    // ===================================
    
    function fixHoverStates() {
        const hoverElements = document.querySelectorAll(
            '.feature-card, .service-card, .news-card, .value-card, ' +
            '.benefit-card, .responsibility-card, .office-card, .case-card'
        );
        
        hoverElements.forEach(element => {
            // Agregar clase de corrección
            element.classList.add('hover-fix');
            
            // Forzar estado inicial
            const resetElement = () => {
                element.style.transform = '';
                element.style.boxShadow = '';
                element.style.borderColor = '';
                element.style.background = '';
                element.style.zIndex = '';
            };
            
            // Estado hover
            element.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform, box-shadow, border-color';
                this.style.zIndex = '10';
            });
            
            // Estado normal - CORRECCIÓN PRINCIPAL
            element.addEventListener('mouseleave', function() {
                this.style.willChange = 'auto';
                this.style.zIndex = '';
                // Timeout para asegurar transición suave
                setTimeout(resetElement, 50);
            });
            
            // Reset forzado en caso de problemas
            element.addEventListener('blur', resetElement);
        });
    }
    
    // ===================================
    // TIMELINE CRONOLÓGICO MEJORADO
    // ===================================
    
    function initTimelineEnhanced() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        const progressBar = document.createElement('div');
        progressBar.className = 'timeline-progress';
        timeline.appendChild(progressBar);
        
        // Intersection Observer para timeline
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.animationName = 'timeline-reveal';
                    entry.target.style.animationDuration = '0.8s';
                    entry.target.style.animationFillMode = 'both';
                    
                    // Actualizar barra de progreso
                    updateTimelineProgress();
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        timelineItems.forEach((item, index) => {
            // Agregar iconos dinámicos
            const content = item.querySelector('.timeline-content');
            if (content && !content.querySelector('.icon')) {
                const icon = document.createElement('div');
                icon.className = 'icon';
                icon.innerHTML = getTimelineIcon(index);
                content.appendChild(icon);
            }
            
            timelineObserver.observe(item);
        });
        
        function updateTimelineProgress() {
            const visibleItems = timeline.querySelectorAll('.timeline-item.revealed').length;
            const totalItems = timelineItems.length;
            const progress = (visibleItems / totalItems) * 100;
            
            progressBar.style.height = progress + '%';
            progressBar.classList.add('active');
        }
        
        function getTimelineIcon(index) {
            const icons = ['🏢', '🚀', '🌟', '💻', '🏆', '🌍'];
            return icons[index] || '📅';
        }
    }
    
    // ===================================
    // LAYOUT DINÁMICO NO LINEAL
    // ===================================
    
    function initDynamicLayout() {
        // Convertir grids lineales a layouts dinámicos
        const grids = document.querySelectorAll('.features-grid, .services-grid, .news-grid');
        
        grids.forEach(grid => {
            grid.classList.add('masonry-grid');
            
            const items = grid.querySelectorAll('.feature-card, .service-card, .news-card');
            items.forEach((item, index) => {
                item.classList.add('masonry-item');
                
                // Agregar variación de altura
                if (index % 3 === 0) {
                    item.style.gridRow = 'span 2';
                } else if (index % 4 === 2) {
                    item.style.gridRow = 'span 3';
                }
                
                // Agregar elementos flotantes
                if (index % 5 === 0) {
                    addFloatingElements(item);
                }
            });
        });
    }
    
    function addFloatingElements(container) {
        if (window.innerWidth <= 768) return; // No en móviles
        
        for (let i = 0; i < 3; i++) {
            const floater = document.createElement('div');
            floater.className = 'floating-element';
            floater.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 40}px;
                height: ${20 + Math.random() * 40}px;
                background: rgba(237, 137, 54, ${0.1 + Math.random() * 0.1});
                border-radius: 50%;
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 80}%;
                pointer-events: none;
                z-index: 0;
                animation: float-random ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.style.position = 'relative';
            container.appendChild(floater);
        }
    }
    
    // ===================================
    // OBSERVER PARA ANIMACIONES SECUENCIALES
    // ===================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Observer para elementos individuales
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.willChange = 'transform, opacity';
                    
                    // Aplicar animación según el tipo
                    if (element.classList.contains('stat-item')) {
                        animateCounter(element);
                        element.style.animation = 'subtle-bounce 0.6s ease-out';
                    } else {
                        element.style.animation = 'timeline-reveal 0.8s ease-out both';
                    }
                    
                    // Limpiar will-change después de la animación
                    setTimeout(() => {
                        element.style.willChange = 'auto';
                    }, 800);
                    
                    elementObserver.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observer para grupos con stagger
        const groupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const items = container.children;
                    
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.willChange = 'transform, opacity';
                            item.style.animation = `timeline-reveal 0.6s ease-out both`;
                            item.style.animationDelay = `${index * 0.1}s`;
                            
                            // Limpiar will-change
                            setTimeout(() => {
                                item.style.willChange = 'auto';
                            }, 600 + (index * 100));
                        }, index * 100);
                    });
                    
                    groupObserver.unobserve(container);
                }
            });
        }, observerOptions);
        
        // Aplicar observers
        document.querySelectorAll('.stat-item, .timeline-item').forEach(el => {
            elementObserver.observe(el);
        });
        
        document.querySelectorAll('.features-grid, .services-grid, .news-grid').forEach(el => {
            groupObserver.observe(el);
        });
    }
    
    // ===================================
    // CONTADOR ANIMADO CORREGIDO
    // ===================================
    
    function animateCounter(element) {
        const numberElement = element.querySelector('.stat-number, h4');
        if (!numberElement) return;
        
        const finalText = numberElement.textContent;
        const finalNumber = parseFloat(finalText.replace(/[^\d.]/g, ''));
        if (isNaN(finalNumber)) return;
        
        const suffix = finalText.replace(finalNumber.toString(), '');
        let current = 0;
        const increment = finalNumber / 50;
        const isDecimal = finalNumber % 1 !== 0;
        
        numberElement.style.willChange = 'content';
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(counter);
                numberElement.style.willChange = 'auto';
            }
            
            const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
            numberElement.textContent = displayValue + suffix;
        }, 40);
    }
    
    // ===================================
    // SLIDER MEJORADO SIN CONFLICTOS
    // ===================================
    
    function initSliderFixed() {
        const slider = document.querySelector('.slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        let isAnimating = false;
        let autoplayTimer;
        
        function showSlide(index, direction = 'next') {
            if (isAnimating || index === currentSlide) return;
            
            isAnimating = true;
            const current = slides[currentSlide];
            const next = slides[index];
            
            // Limpiar estilos previos
            slides.forEach(slide => {
                slide.style.transform = '';
                slide.style.opacity = '';
            });
            
            // Animación suave
            current.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            next.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            current.style.opacity = '0';
            current.style.transform = direction === 'next' ? 'translateX(-50px)' : 'translateX(50px)';
            
            next.classList.add('active');
            next.style.opacity = '1';
            next.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                current.classList.remove('active');
                current.style.transform = '';
                current.style.opacity = '';
                isAnimating = false;
            }, 600);
            
            // Actualizar dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
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
            autoplayTimer = setInterval(nextSlide, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            setTimeout(startAutoplay, 3000);
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            setTimeout(startAutoplay, 3000);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                showSlide(index);
                setTimeout(startAutoplay, 3000);
            });
        });
        
        // Pausa en hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        
        // Iniciar autoplay
        startAutoplay();
    }
    
    // ===================================
    // SISTEMA DE NOTIFICACIONES MEJORADO
    // ===================================
    
    function showNotificationFixed(message, type = 'info', duration = 5000) {
        // Remover notificaciones existentes
        const existing = document.querySelectorAll('.notification');
        existing.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-progress" style="--duration: ${duration}ms"></div>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-hide
        const hideTimer = setTimeout(() => {
            hideNotification(notification);
        }, duration);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimer);
            hideNotification(notification);
        });
        
        function hideNotification(notif) {
            notif.classList.remove('show');
            setTimeout(() => {
                if (notif.parentNode) {
                    notif.remove();
                }
            }, 400);
        }
    }
    
    // ===================================
    // MANEJO DE PERFORMANCE
    // ===================================
    
    function optimizePerformance() {
        // Reducir animaciones en dispositivos lentos
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            document.body.classList.add('low-performance');
        }
        
        // Intersection Observer para lazy loading de animaciones
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.willChange = 'transform';
                } else {
                    entry.target.style.willChange = 'auto';
                }
            });
        }, { rootMargin: '100px' });
        
        document.querySelectorAll('.feature-card, .service-card').forEach(el => {
            lazyObserver.observe(el);
        });
    }
    
    // ===================================
    // INICIALIZACIÓN
    // ===================================
    
    // Ejecutar limpiezas y correcciones
    cleanupAnimations();
    fixHoverStates();
    
    // Inicializar funcionalidades
    initTimelineEnhanced();
    initDynamicLayout();
    initScrollAnimations();
    initSliderFixed();
    optimizePerformance();
    
    // Hacer función de notificación global
    window.showNotification = showNotificationFixed;
    
    // Indicador de carga completa
    document.body.classList.add('loaded');
    
    console.log('✅ Peru Logistics - Animaciones corregidas y optimizadas');
    
    // ===================================
    // UTILIDADES DE DEBUG
    // ===================================
    
    // Función de emergencia para resetear estilos
    window.resetAllStyles = function() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.transform = '';
            el.style.transition = '';
            el.style.animation = '';
            el.style.willChange = 'auto';
            el.classList.remove('animation-complete');
        });
        console.log('🔄 Estilos reseteados');
    };
    
    // Función para activar modo debug
    window.debugAnimations = function() {
        document.body.classList.toggle('debug-animations');
        console.log('🐛 Modo debug activado/desactivado');
    };
});

// ===================================
// ESTILOS DE DEBUG (CSS en JS)
// ===================================

const debugStyles = `
    .debug-animations * {
        outline: 1px solid rgba(255, 0, 0, 0.3) !important;
    }
    
    .debug-animations .animated-element {
        outline: 2px solid rgba(0, 255, 0, 0.5) !important;
    }
    
    .low-performance .feature-card:hover,
    .low-performance .service-card:hover {
        transform: translateY(-3px) !important;
    }
    
    .low-performance .floating-element {
        display: none !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = debugStyles;
document.head.appendChild(styleSheet);