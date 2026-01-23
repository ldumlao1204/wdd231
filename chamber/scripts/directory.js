/* ==================================================
   DIRECTORY SCRIPT
   Handles member data loading, display, and view toggling
   ================================================== */

// State management
const appState = {
    members: [],
    currentView: 'grid',
    isLoading: true
};

// DOM Elements
const membersContainer = document.getElementById('members-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    loadMembers();
    setupEventListeners();
    updateFooter();
});

// Setup event listeners
function setupEventListeners() {
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', function () {
            switchView('grid');
        });
    }

    if (listViewBtn) {
        listViewBtn.addEventListener('click', function () {
            switchView('list');
        });
    }
}

// Load members from JSON file
async function loadMembers() {
    try {
        appState.isLoading = true;
        showLoading();

        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        appState.members = await response.json();
        appState.isLoading = false;

        hideLoading();
        displayMembers();
    } catch (error) {
        console.error('Error loading members:', error);
        appState.isLoading = false;
        showError();
    }
}

// Display members based on current view
function displayMembers() {
    if (!membersContainer) return;

    membersContainer.innerHTML = '';

    // Update container classes
    membersContainer.classList.remove('grid', 'list');
    membersContainer.classList.add(appState.currentView);

    if (appState.members.length === 0) {
        membersContainer.innerHTML = '<p>No members available.</p>';
        return;
    }

    appState.members.forEach(member => {
        const memberCard = createMemberCard(member);
        membersContainer.appendChild(memberCard);
    });
}

// Create member card element
function createMemberCard(member) {
    const card = document.createElement('article');
    card.className = 'member-card';

    const membershipClass = member.membership_level === 3 ? 'gold' :
        member.membership_level === 2 ? 'silver' : '';

    const imagePath = `images/members/${member.image}`;

    card.innerHTML = `
        <img src="${imagePath}" alt="${member.company_name}" class="member-image" 
             onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(member.company_name)}'">
        <div class="member-content">
            <h3>${member.company_name}</h3>
            <span class="member-level ${membershipClass}">${member.membership_label}</span>
            <div class="member-info">
                <p><strong>Industry:</strong> ${member.industry}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                <p><strong>Description:</strong> ${member.description}</p>
            </div>
            <div class="member-links">
                <a href="${member.website}" target="_blank" class="member-link">Visit Website</a>
                <a href="mailto:info@${member.website.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/g, '')}" class="member-link">Contact</a>
            </div>
        </div>
    `;

    return card;
}

// Switch view between grid and list
function switchView(view) {
    appState.currentView = view;

    // Update button states
    if (gridViewBtn && listViewBtn) {
        if (view === 'grid') {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else {
            gridViewBtn.classList.remove('active');
            listViewBtn.classList.add('active');
        }
    }

    // Redisplay members with new view
    displayMembers();

    // Store view preference in localStorage
    localStorage.setItem('preferredView', view);
}

// Show/hide loading state
function showLoading() {
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function hideLoading() {
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

function showError() {
    if (errorElement) {
        errorElement.style.display = 'block';
    }
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Update footer with current year and last modified date
function updateFooter() {
    const yearElement = document.getElementById('year');
    const modifiedElement = document.getElementById('last-modified');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        // Get last modified date from document
        const lastModified = new Date(document.lastModified);

        // Format: MM/DD/YYYY HH:MM:SS
        const month = String(lastModified.getMonth() + 1).padStart(2, '0');
        const day = String(lastModified.getDate()).padStart(2, '0');
        const year = lastModified.getFullYear();
        const hours = String(lastModified.getHours()).padStart(2, '0');
        const minutes = String(lastModified.getMinutes()).padStart(2, '0');
        const seconds = String(lastModified.getSeconds()).padStart(2, '0');

        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        modifiedElement.textContent = formattedDate;
    }
}

// Restore user's view preference on page load
function restoreViewPreference() {
    const savedView = localStorage.getItem('preferredView');
    if (savedView) {
        switchView(savedView);
    }
}

// Call restore preference after initial load
window.addEventListener('load', restoreViewPreference);
