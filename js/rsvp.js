/**
 * RAJU & AISHU - RSVP Form Handling
 */

function initRSVP() {
    const data = invitationData.rsvp;
    if (!data.enabled) return;

    const form = document.getElementById('rsvp-form');
    const status = document.getElementById('rsvp-status');
    const optionsContainer = document.getElementById('rsvp-attendance-options');

    // Populate attendance options
    optionsContainer.innerHTML = '';
    data.fields.attendance.options.forEach((option, index) => {
        const optionId = `attendance-${index}`;
        const div = document.createElement('div');
        div.className = 'radio-option';
        div.innerHTML = `
            <input type="radio" id="${optionId}" name="attendance" value="${option}" ${index === 0 ? 'required' : ''}>
            <label for="${optionId}" class="radio-label">${option}</label>
        `;
        optionsContainer.appendChild(div);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('rsvp-submit');
        const originalText = submitBtn.textContent;
        
        // Show processing state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        // Simulate network delay
        setTimeout(() => {
            status.textContent = 'Thank you! Your RSVP has been recorded (Demo).';
            status.className = 'rsvp-status success';
            status.classList.remove('hidden');
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            form.reset();
        }, 1500);
    });
}
