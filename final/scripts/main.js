// main.js - ES Module for the Home Page
import { openModal, closeModal } from './modal.js';

// ========== Data Fetching with Async/Await and Try/Catch ==========
async function fetchResources() {
    try {
        const response = await fetch('data/tof-resources.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.resources;
    } catch (error) {
        console.error('Error fetching resources:', error);
        const container = document.getElementById('resources-container');
        container.innerHTML = '<p class="error-message">Unable to load resources. Please try again later.</p>';
        return [];
    }
}

// ========== Dynamic Content Generation with Template Literals ==========
function createResourceCard(resource) {
    const stars = '&#9733;'.repeat(resource.rating) + '&#9734;'.repeat(5 - resource.rating);

    return `<article class="resource-card" data-category="${resource.category}">
        <div class="resource-category">${resource.category}</div>
        <h3>${resource.name}</h3>
        <p>${resource.description}</p>
        <div class="resource-details">
            <span class="resource-location">${resource.location}</span>
            <span class="resource-specialty">${resource.specialty}</span>
        </div>
        <div class="resource-rating" aria-label="Rating: ${resource.rating} out of 5">${stars}</div>
        <button class="view-details-btn" data-name="${resource.name}">View Details</button>
    </article>`;
}

// ========== Display Resources with Array Methods ==========
function displayResources(resources, filter = 'all') {
    const container = document.getElementById('resources-container');

    // Array method: filter
    const filteredResources = filter === 'all'
        ? resources
        : resources.filter(resource => resource.category === filter);

    // Array method: map + template literals
    const cardsHTML = filteredResources.map(resource => createResourceCard(resource)).join('');

    container.innerHTML = cardsHTML || '<p class="no-results">No resources found for this category.</p>';

    // DOM Manipulation: Attach event listeners to detail buttons
    const detailButtons = container.querySelectorAll('.view-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceName = e.target.dataset.name;
            const resource = resources.find(r => r.name === resourceName);
            if (resource) {
                showResourceModal(resource);
            }
        });
    });
}

// ========== Modal Dialog ==========
function showResourceModal(resource) {
    const modal = document.getElementById('resource-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const details = document.getElementById('modal-details');

    title.textContent = resource.name;
    description.textContent = resource.description;

    const stars = '\u2605'.repeat(resource.rating) + '\u2606'.repeat(5 - resource.rating);

    details.innerHTML = `
        <div class="modal-info">
            <p><strong>Category:</strong> ${resource.category}</p>
            <p><strong>Location:</strong> ${resource.location}</p>
            <p><strong>Specialty:</strong> ${resource.specialty}</p>
            <p><strong>Rating:</strong> <span class="modal-rating">${stars}</span></p>
            <a href="${resource.website}" target="_blank" rel="noopener noreferrer" class="modal-link">Visit Website</a>
        </div>
    `;

    openModal(modal);
}

// ========== Local Storage for Category Filter ==========
function saveFilterPreference(filter) {
    localStorage.setItem('tof-category-filter', filter);
}

function loadFilterPreference() {
    return localStorage.getItem('tof-category-filter') || 'all';
}

// ========== Initialize ==========
async function init() {
    const resources = await fetchResources();

    if (resources.length === 0) return;

    // Load saved filter preference from localStorage
    const savedFilter = loadFilterPreference();
    const filterSelect = document.getElementById('category-filter');

    if (filterSelect) {
        filterSelect.value = savedFilter;
        displayResources(resources, savedFilter);

        // DOM Manipulation: Event listener for filter change
        filterSelect.addEventListener('change', (e) => {
            const selectedFilter = e.target.value;
            saveFilterPreference(selectedFilter);
            displayResources(resources, selectedFilter);
        });
    }

    // Modal close button
    const modal = document.getElementById('resource-modal');
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

init();
