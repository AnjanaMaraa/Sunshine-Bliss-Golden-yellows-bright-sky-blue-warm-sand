/**
 * ARJUN & MEERA - Countdown Timer
 */

function initCountdown() {
    const weddingDate = new Date(invitationData.wedding.date + 'T00:00:00');
    const timerElement = document.getElementById('countdown-timer');
    const messageElement = document.getElementById('countdown-past-message');

    // Check if date is in the past
    const now = new Date();
    if (weddingDate < now) {
        timerElement.classList.add('hidden');
        messageElement.classList.remove('hidden');
        return;
    }

    function updateCountdown() {
        const now = new Date();
        const difference = weddingDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}
