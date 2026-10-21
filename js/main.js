/**
 * ARJUN & MEERA - Wedding Invitation Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupUIFromData();
    if (typeof initEntrance === 'function') initEntrance();
    if (typeof initScratch === 'function') initScratch();
    if (typeof initCountdown === 'function') initCountdown();
    if (typeof initTimeline === 'function') initTimeline();
    if (typeof initRSVP === 'function') initRSVP();
    setupScrollAnimations();
    setupFloatingControls();
}

function setupUIFromData() {
    const data = invitationData;
    
    // Hero Section
    document.getElementById('hero-names').textContent = `${data.couple.groom} & ${data.couple.bride}`;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-display-date').textContent = data.wedding.displayDate;
    document.getElementById('hero-cta').textContent = data.hero.cta;
    
    const heroImage = document.getElementById('hero-image');
    if (data.hero.image) {
        heroImage.src = data.hero.image;
        heroImage.alt = `${data.couple.groom} & ${data.couple.bride}`;
    }

    // Scratch Section
    document.getElementById('scratch-heading').textContent = data.scratchReveal.heading;
    document.getElementById('scratch-subheading').textContent = data.scratchReveal.subheading;
    document.getElementById('revealed-names').textContent = `${data.couple.groom} & ${data.couple.bride}`;
    document.getElementById('revealed-date').textContent = data.wedding.displayDate;
    
    // Calculate weekday
    if (data.wedding.date) {
        const weddingDate = new Date(data.wedding.date + 'T00:00:00');
        const weekday = weddingDate.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById('revealed-weekday').textContent = weekday;
    }
    
    if (data.wedding.time) {
        document.getElementById('revealed-time').textContent = data.wedding.time;
    } else {
        document.getElementById('revealed-time').classList.add('hidden');
    }

    // Intro Section
    const introSection = document.getElementById('intro');
    introSection.querySelector('.intro-names').textContent = `${data.couple.groom} & ${data.couple.bride}`;
    introSection.querySelector('.intro-date').textContent = data.wedding.displayDate;

    // Gifts Section
    if (data.gifts.enabled) {
        document.getElementById('gift-message').textContent = data.gifts.message;
    } else {
        document.getElementById('gifts-section').classList.add('hidden');
    }

    // RSVP Section
    if (!data.rsvp.enabled) {
        document.getElementById('rsvp-section').classList.add('hidden');
        document.querySelector('.rsvp-shortcut').classList.add('hidden');
    }

    // Footer
    document.querySelector('.footer-names').textContent = `${data.couple.groom} & ${data.couple.bride}`;
    
    // Optional Sections Visibility
    toggleSection('venue-section', data.venue.enabled);
    toggleSection('dress-code-section', data.dressCode.enabled);
    toggleSection('pre-wedding-section', data.preWeddingEvents && data.preWeddingEvents.length > 0);
    toggleSection('transportation-section', data.transportation.enabled);
    toggleSection('accommodation-section', data.accommodation.enabled);
}

function toggleSection(id, isEnabled) {
    const section = document.getElementById(id);
    if (section) {
        if (isEnabled) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add 'reveal' class to sections and elements
    const elementsToReveal = document.querySelectorAll('section, .timeline-event, .rsvp-card, .venue-card');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

function setupFloatingControls() {
    const backToTopBtn = document.getElementById('back-to-top');
    const musicBtn = document.getElementById('music-toggle');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    musicBtn.addEventListener('click', () => {
        if (window.weddingAudio) {
            if (window.weddingAudio.paused) {
                window.weddingAudio.play();
                musicBtn.classList.add('is-playing');
            } else {
                window.weddingAudio.pause();
                musicBtn.classList.remove('is-playing');
            }
        }
    });
}
