document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. CLICK TRACKING =====
    document.addEventListener('click', function(event) {
        const target = event.target;
        const timestamp = new Date().toISOString();
        
        let elementType = target.tagName.toLowerCase();
        if (target.id) elementType += ` (${target.id})`;
        else if (target.className) elementType += ` (${target.className.split(' ')[0]})`;
        
        console.log(`${timestamp} , click , ${elementType}`);
    });

    // ===== 2. VIEW TRACKING =====
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = new Date().toISOString();
                console.log(`${timestamp} , view , section (${entry.target.id})`);
                
                // Existing animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, { threshold: 0.1 });

    // ===== 3. EXISTING ANIMATIONS =====
    const animateElements = (selector) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            sectionObserver.observe(el);
        });
    };

    // ===== 4. YOUR ORIGINAL FUNCTIONALITY =====
    // Typewriter effect
    setTimeout(() => {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            typewriter.style.borderRight = 'none';
            typewriter.style.animation = 'none';
        }
    }, 3500);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Apply animations
    animateElements('.card, .education-item, .skill-category, .achievement-category, .gallery-item');

    // CV download tracking
    document.querySelector('a[href*=".pdf"]')?.addEventListener('click', () => {
        console.log(`${new Date().toISOString()} , click , CV Download`);
    });

    // Gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.6s ease';
            img.style.opacity = '1';
        }, 100);
    });

    // Profile modal
    document.querySelector('.profile-pic')?.addEventListener('click', function() {
        document.querySelector('.pfp-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        document.querySelector('.pfp-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    document.querySelector('.pfp-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== 5. EASTER EGG (LAST) =====
    console.log('%cLooking for something?', 'font-size: 18px; color: #e63946;');
    console.log('%cThis website runs on: 30% code, 50% memes, 20% pure luck', 'color: #f9f9f9;');
});