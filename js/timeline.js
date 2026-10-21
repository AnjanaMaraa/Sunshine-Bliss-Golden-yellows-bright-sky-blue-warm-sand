/**
 * ARJUN & MEERA - Program Timeline
 */

function initTimeline() {
    const container = document.getElementById('timeline-container');
    const events = invitationData.events;

    if (!events || events.length === 0) {
        document.getElementById('timeline-section').classList.add('hidden');
        return;
    }

    container.innerHTML = '';

    events.forEach((event, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const eventEl = document.createElement('div');
        eventEl.className = `timeline-event ${side}`;
        
        eventEl.innerHTML = `
            <div class="timeline-content">
                <h3>${event.title}</h3>
                ${event.time ? `<span class="timeline-time">${event.time}</span>` : ''}
                <p>${event.description}</p>
            </div>
        `;
        
        container.appendChild(eventEl);
    });
}
