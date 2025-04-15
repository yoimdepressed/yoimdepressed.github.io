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

    // ===== 2. VIEW TRACKING & ANIMATIONS =====
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = new Date().toISOString();
                console.log(`${timestamp} , view , section (${entry.target.id})`);
                
                // Animation handling
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
            sectionObserver.observe(el);
        });
    };

    // ===== 3. UI INTERACTIONS =====
    // Toggle Text Analyser Section
    document.querySelector('a[href="#text-analyser"]').addEventListener('click', function(e) {
        e.preventDefault();
        const analyser = document.getElementById('text-analyser');
        analyser.style.display = analyser.style.display === 'none' ? 'block' : 'none';
        if (analyser.style.display === 'block') {
            analyser.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Text Analysis Functionality
    document.getElementById('analyze-btn').addEventListener('click', function() {
        const text = document.getElementById('text-input').value;
        const resultsDiv = document.getElementById('results');
        
        // Basic Counts
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        const words = text.trim() === '' ? 0 : text.split(/\s+/).length;
        const spaces = (text.match(/ /g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const symbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;

        // ===== PRONOUNS =====
const pronouns = {
    // Subject pronouns
    'I': (text.match(/\bI\b/g) || []).length,
    'you': (text.match(/\byou\b/gi) || []).length,
    'he': (text.match(/\bhe\b/gi) || []).length,
    'she': (text.match(/\bshe\b/gi) || []).length,
    'it': (text.match(/\bit\b/gi) || []).length,
    'we': (text.match(/\bwe\b/gi) || []).length,
    'they': (text.match(/\bthey\b/gi) || []).length,
    
    // Object pronouns
    'me': (text.match(/\bme\b/gi) || []).length,
    'him': (text.match(/\bhim\b/gi) || []).length,
    'her': (text.match(/\bher\b/gi) || []).length,
    'us': (text.match(/\bus\b/gi) || []).length,
    'them': (text.match(/\bthem\b/gi) || []).length,
    
    // Possessive pronouns
    'my': (text.match(/\bmy\b/gi) || []).length,
    'your': (text.match(/\byour\b/gi) || []).length,
    'his': (text.match(/\bhis\b/gi) || []).length,
    'its': (text.match(/\bits\b/gi) || []).length,
    'our': (text.match(/\bour\b/gi) || []).length,
    'their': (text.match(/\btheir\b/gi) || []).length
};

// ===== PREPOSITIONS =====
const prepositions = {
    'about': (text.match(/\babout\b/gi) || []).length,
    'above': (text.match(/\babove\b/gi) || []).length,
    'across': (text.match(/\bacross\b/gi) || []).length,
    'after': (text.match(/\bafter\b/gi) || []).length,
    'against': (text.match(/\bagainst\b/gi) || []).length,
    'along': (text.match(/\balong\b/gi) || []).length,
    'among': (text.match(/\bamong\b/gi) || []).length,
    'around': (text.match(/\baround\b/gi) || []).length,
    'at': (text.match(/\bat\b/gi) || []).length,
    'before': (text.match(/\bbefore\b/gi) || []).length,
    'behind': (text.match(/\bbehind\b/gi) || []).length,
    'below': (text.match(/\bbelow\b/gi) || []).length,
    'beside': (text.match(/\bbeside\b/gi) || []).length,
    'between': (text.match(/\bbetween\b/gi) || []).length,
    'by': (text.match(/\bby\b/gi) || []).length,
    'down': (text.match(/\bdown\b/gi) || []).length,
    'during': (text.match(/\bduring\b/gi) || []).length,
    'for': (text.match(/\bfor\b/gi) || []).length,
    'from': (text.match(/\bfrom\b/gi) || []).length,
    'in': (text.match(/\bin\b/gi) || []).length,
    'into': (text.match(/\binto\b/gi) || []).length,
    'like': (text.match(/\blike\b/gi) || []).length,
    'near': (text.match(/\bnear\b/gi) || []).length,
    'of': (text.match(/\bof\b/gi) || []).length,
    'off': (text.match(/\boff\b/gi) || []).length,
    'on': (text.match(/\bon\b/gi) || []).length,
    'over': (text.match(/\bover\b/gi) || []).length,
    'through': (text.match(/\bthrough\b/gi) || []).length,
    'to': (text.match(/\bto\b/gi) || []).length,
    'under': (text.match(/\bunder\b/gi) || []).length,
    'up': (text.match(/\bup\b/gi) || []).length,
    'with': (text.match(/\bwith\b/gi) || []).length,
    'without': (text.match(/\bwithout\b/gi) || []).length
};

        // Articles
        const articles = {
            'a': (text.match(/\ba\b/gi) || []).length,
            'an': (text.match(/\ban\b/gi) || []).length
        };

        // Generate Results
        resultsDiv.innerHTML = `
            <h3> Basic Statistics</h3>
            <p><strong>Letters:</strong> ${letters} | <strong>Words:</strong> ${words}</p>
            <p><strong>Spaces:</strong> ${spaces} | <strong>Newlines:</strong> ${newlines}</p>
            <p><strong>Special Symbols:</strong> ${symbols}</p>
            
            <h3> Pronouns</h3>
            <ul>
                ${Object.entries(pronouns)
                  .map(([word, count]) => `<li>${word}: ${count}</li>`)
                  .join('')}
            </ul>
            
            <h3> Prepositions</h3>
            <ul>
                ${Object.entries(prepositions)
                  .map(([word, count]) => `<li>${word}: ${count}</li>`)
                  .join('')}
            </ul>
            
            <h3> Indefinite Articles</h3>
            <ul>
                ${Object.entries(articles)
                  .map(([word, count]) => `<li>${word}: ${count}</li>`)
                  .join('')}
            </ul>
        `;
    });

    // ===== 4. GENERAL WEBSITE FUNCTIONALITY =====
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

    // ===== 5. EASTER EGG =====
    console.log('%cLooking for something?', 'font-size: 18px; color: #e63946;');
    console.log('%cThis website runs on: 30% code, 50% memes, 20% pure luck', 'color: #f9f9f9;');
});