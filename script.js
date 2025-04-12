document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect cleanup
    setTimeout(() => {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            typewriter.style.borderRight = 'none';
            typewriter.style.animation = 'none';
        }
    }, 3500);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, { threshold: 0.1 });

    const animateElements = (selector) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });
    };

    // Apply to all sections
    animateElements('.card, .education-item, .skill-category, .achievement-category, .gallery-item');

    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Animate achievement items
    document.querySelectorAll('.achievement-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        setTimeout(() => {
            observer.observe(category);
        }, index * 200);
    });

    // Animate education and skills items
    document.querySelectorAll('.education-item, .skill-category').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            observer.observe(item);
        }, index * 200);
    });

    // Gallery image loading effect
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.6s ease';
            img.style.opacity = '1';
        }, 100);
    });

    // Profile picture modal
    document.querySelector('.profile-pic')?.addEventListener('click', function() {
        document.querySelector('.pfp-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        document.querySelector('.pfp-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside image
    document.querySelector('.pfp-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Console easter egg
    console.log('%c🚀 Psst... Looking for something?', 'font-size: 18px; color: #e63946;');
    console.log('%cThis website runs on: 30% code, 50% memes, 20% pure luck', 'color: #f9f9f9;');
});