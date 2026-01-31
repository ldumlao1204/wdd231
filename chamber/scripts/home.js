// ================================================
// SPOTLIGHT CARDS - Chamber Members
// ================================================

const membersUrl = 'data/members.json';

// Fetch and Display Spotlight Members
async function fetchSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        displaySpotlightError();
    }
}

// Display Spotlight Cards
function displaySpotlights(members) {
    const container = document.getElementById('spotlight-info');

    if (!container) {
        console.error('Spotlight container not found');
        return;
    }

    // Filter for Gold (3) or Silver (2) members only
    const qualifiedMembers = members.filter(member =>
        member.membership_level === 3 || member.membership_level === 2
    );

    if (qualifiedMembers.length === 0) {
        container.innerHTML = '<p>No qualified members available</p>';
        return;
    }

    // Shuffle array randomly
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // Select 2-3 members randomly
    const numberOfSpotlights = Math.min(3, shuffled.length);
    const selected = shuffled.slice(0, numberOfSpotlights);

    // Clear container
    container.innerHTML = '';

    // Create spotlight cards
    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        // Determine membership badge
        const membershipBadge = member.membership_level === 3 ? 'Gold Member' : 'Silver Member';
        const badgeClass = member.membership_level === 3 ? 'gold-badge' : 'silver-badge';

        card.innerHTML = `
            <div class="spotlight-header">
                <img src="images/members/${member.image}"
                     alt="${member.company_name} logo"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(member.company_name)}'">
                <h3>${member.company_name}</h3>
                <span class="membership-badge ${badgeClass}">${membershipBadge}</span>
            </div>
            <div class="spotlight-body">
                <p class="spotlight-phone">
                    <strong>Phone:</strong> <a href="tel:${member.phone.replace(/\s/g, '')}">${member.phone}</a>
                </p>
                <p class="spotlight-address">
                    <strong>Address:</strong> ${member.address}
                </p>
                <p class="spotlight-website">
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Display error message
function displaySpotlightError() {
    const container = document.getElementById('spotlight-info');
    if (container) {
        container.innerHTML = '<p class="error-message">Unable to load spotlight members</p>';
    }
}

// Initialize spotlight cards on page load
if (document.getElementById('spotlight-info')) {
    fetchSpotlightMembers();
}
