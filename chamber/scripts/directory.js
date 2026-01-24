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

// DOM Elements - initialized on DOMContentLoaded
let membersContainer;
let loadingElement;
let errorElement;
let gridButton;
let listButton;

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements after content is loaded
    membersContainer = document.getElementById('members-container');
    loadingElement = document.getElementById('loading');
    errorElement = document.getElementById('error');
    gridButton = document.getElementById('grid');
    listButton = document.getElementById('list');

    loadMembers();
    setupEventListeners();
    updateFooter();
    restoreViewPreference();
});

// Setup event listeners
function setupEventListeners() {
    if (gridButton) {
        gridButton.addEventListener('click', function () {
            switchView('grid');
        });
    }

    if (listButton) {
        listButton.addEventListener('click', function () {
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
    const section = document.createElement('section');
    section.className = 'member-card';

    const membershipClass = member.membership_level === 3 ? 'gold' :
        member.membership_level === 2 ? 'silver' : '';

    const imagePath = `images/members/${member.image}`;

    section.innerHTML = `
        <img src="${imagePath}" alt="${member.company_name}" class="member-image" 
             onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(member.company_name)}'">
        <h3>${member.company_name}</h3>
        <p class="member-membership">${member.membership_label}</p>
        <a href="${member.website}" target="_blank" class="member-link">Details</a>
    `;

    return section;
}

// Switch view between grid and list
function switchView(view) {
    appState.currentView = view;

    // Update button states
    if (gridButton && listButton) {
        if (view === 'grid') {
            gridButton.classList.add('active');
            listButton.classList.remove('active');
        } else {
            gridButton.classList.remove('active');
            listButton.classList.add('active');
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
    const yearElement = document.getElementById('currentyear');
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
