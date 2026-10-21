/**
 * RAJU & AISHU - Entrance Curtain Animation
 */

function initEntrance() {
    const data = invitationData.entrance;
    const overlay = document.getElementById('entrance-overlay');
    const cta = document.getElementById('entrance-cta');
    const ctaText = document.getElementById('entrance-cta-text');
    const tagTitle = document.getElementById('entrance-tag-title');
    const tagNames = document.getElementById('entrance-tag-names');
    const tagDate = document.getElementById('entrance-tag-date');

    if (!data.enabled) {
        overlay.classList.add('hidden');
        document.body.classList.remove('is-locked');
        return;
    }

    ctaText.textContent = data.title;
    tagTitle.textContent = data.cardTitle;
    tagNames.textContent = data.cardSubtitle;
    tagDate.textContent = data.cardDate;

    // Use a flag to prevent multiple triggers
    let isOpening = false;

    const handleOpen = () => {
        if (isOpening) return;
        isOpening = true;
        
        overlay.classList.add('is-opened');
        document.body.classList.remove('is-locked');
        
        // Remove from DOM to stop capturing clicks
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1500);

        startMusic();
    };

    cta.addEventListener('click', handleOpen);
    // Keyboard support
    cta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') handleOpen();
    });
}

function startMusic() {
    const data = invitationData.music;
    const musicBtn = document.getElementById('music-toggle');
    
    if (!data.enabled || !data.source) return;
    
    musicBtn.classList.remove('hidden');
    
    if (!window.weddingAudio) {
        window.weddingAudio = new Audio(data.source);
        window.weddingAudio.loop = true;
    }
    
    window.weddingAudio.play().catch(err => {
        console.log('Autoplay blocked:', err);
    });
}
