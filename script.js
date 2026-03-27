document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Universal Sidebar Toggle & Overlay Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    };

    if (mobileToggle && sidebar && sidebarOverlay) {
        mobileToggle.addEventListener('click', toggleSidebar);
        
        // Close when clicking the dim overlay
        sidebarOverlay.addEventListener('click', toggleSidebar);

        // Close sidebar universally when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('open')) {
                    toggleSidebar();
                }
            });
        });
    }

    // 2. Active Sidebar Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal, .reveal-item');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine if it's a grid item that might need staggering
                const parent = entry.target.parentElement;
                
                // If the parent is a flex/grid setup, stagger the items based on their index
                if (parent.classList.contains('services-grid') || 
                    parent.classList.contains('team-flex') || 
                    parent.classList.contains('trust-grid')) {
                        
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150); // 150ms delay per index
                } else {
                    entry.target.classList.add('active');
                }
                
                observer.unobserve(entry.target); // Reveal only once for premium feel
            }
        });
    }, { rootMargin: "0px 0px -100px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));
    
    // Topbar Scroll Effect
    const topbar = document.getElementById('topbar');
    if (topbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                topbar.classList.add('scrolled');
            } else {
                topbar.classList.remove('scrolled');
            }
        });
    }
    
    // Trigger any pre-visible items immediately
    setTimeout(() => {
        reveals.forEach(reveal => {
            const top = reveal.getBoundingClientRect().top;
            if (top < window.innerHeight) {
                reveal.classList.add('active');
            }
        });
    }, 100);

    // 5. Initialize Swiper Sliders
    if (typeof Swiper !== 'undefined') {
        // Hero Auto Slider (Sliding Animation)
        new Swiper('.hero-swiper', {
            speed: 1200, // Smooth transition speed
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-nav.swiper-button-next',
                prevEl: '.hero-nav.swiper-button-prev',
            },
            allowTouchMove: true
        });

        // Gallery Interative slider (Center Zoom effect)
        new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            breakpoints: {
                768: { slidesView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2.5, spaceBetween: 50 }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 4000,
            }
        });

        // Testimonial Focus Slider
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 6000,
            }
        });
    }

    // 6. Language Toggle Logic (EN / KZ UI Flipper)
    const langOptions = document.querySelectorAll('.lang-option');
    const translatableElements = document.querySelectorAll('[data-en][data-kz]');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            
            langOptions.forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');

            translatableElements.forEach(el => {
                const newText = el.getAttribute(`data-${selectedLang}`);
                if (newText) {
                    el.style.opacity = '0';
                    setTimeout(() => {
                        el.textContent = newText;
                        el.style.opacity = '1';
                    }, 200);
                }
            });
        });
    });

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if(btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                // Close all
                faqItems.forEach(faq => faq.classList.remove('open'));
                // Open if it wasn't open
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

});
