// Display form data from URL Search Params on the thank you page
const formDataContainer = document.getElementById('form-data');
const params = new URLSearchParams(window.location.search);

const fieldLabels = {
    'first-name': 'First Name',
    'last-name': 'Last Name',
    'email': 'Email Address',
    'phone': 'Phone Number',
    'role': 'Your Role',
    'how-found': 'How You Found Us',
    'message': 'Message',
    'newsletter': 'Newsletter Subscription'
};

if (params.toString()) {
    let html = '<table class="summary-table">';
    for (const [key, value] of params) {
        const label = fieldLabels[key] || key;
        const displayValue = key === 'newsletter' ? 'Yes, subscribed' : value;
        if (displayValue) {
            html += `<tr><th>${label}</th><td>${displayValue}</td></tr>`;
        }
    }
    html += '</table>';
    formDataContainer.innerHTML = html;
} else {
    formDataContainer.innerHTML = '<p>No form data was received. Please <a href="contact.html">go back</a> and submit the form.</p>';
}
