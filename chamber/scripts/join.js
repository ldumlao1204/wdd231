// Set the timestamp when the page loads
function setTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', setTimestamp);

// Also try to set immediately in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimestamp();
}

// Modal functionality
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.membership-modal');

// Open modal when "Learn More" button is clicked
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

// Close modal when close button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.closest('dialog').close();
    });
});

// Close modal when clicking outside the modal (on the backdrop)
modals.forEach(modal => {
    modal.addEventListener('click', function(event) {
        const rect = this.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                           rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            this.close();
        }
    });
});
