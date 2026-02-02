// Get the query string from the URL
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);

// Retrieve form data from URL parameters
const firstName = urlParams.get('first-name');
const lastName = urlParams.get('last-name');
const email = urlParams.get('email');
const mobile = urlParams.get('mobile');
const businessName = urlParams.get('business-name');
const timestamp = urlParams.get('timestamp');

// Display the data in the appropriate elements
document.getElementById('display-first-name').textContent = firstName || 'N/A';
document.getElementById('display-last-name').textContent = lastName || 'N/A';
document.getElementById('display-email').textContent = email || 'N/A';
document.getElementById('display-mobile').textContent = mobile || 'N/A';
document.getElementById('display-business-name').textContent = businessName || 'N/A';

// Format and display the timestamp
if (timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedDate = date.toLocaleString('en-US', options);
    document.getElementById('display-timestamp').textContent = formattedDate;
} else {
    document.getElementById('display-timestamp').textContent = 'N/A';
}
