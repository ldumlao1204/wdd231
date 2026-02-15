// main.js - ES Module for the Home Page
import { openModal, closeModal } from './modal.js';
import { resources } from '../data/tof-resources.mjs';

// ========== Dynamic Content Generation with Template Literals ==========
function createResourceCard(resource) {
    const stars = '&#9733;'.repeat(resource.rating) + '&#9734;'.repeat(5 - resource.rating);

    return `<article class="resource-card" data-category="${resource.category}">
        <figure class="resource-img">
            <img src="${resource.image}" alt="${resource.name} logo" width="300" height="200" loading="lazy">
        </figure>
        <div class="resource-category">${resource.category}</div>
        <h3 class="resource-name">${resource.name}</h3>
        <p class="resource-desc">${resource.description}</p>
        <div class="resource-details">
            <span class="resource-location">${resource.location}</span>
            <span class="resource-specialty">${resource.specialty}</span>
        </div>
        <div class="resource-rating" aria-label="Rating: ${resource.rating} out of 5">${stars}</div>
        <button class="view-details-btn" data-name="${resource.name}">View Details</button>
    </article>`;
}

// ========== Display Resources with Array Methods ==========
function displayResources(resourceList, filter = 'all') {
    const container = document.getElementById('resources-container');

    // Array method: filter
    const filteredResources = filter === 'all'
        ? resourceList
        : resourceList.filter(resource => resource.category === filter);

    // Array method: map + template literals
    const cardsHTML = filteredResources.map(resource => createResourceCard(resource)).join('');

    container.innerHTML = cardsHTML || '<p class="no-results">No resources found for this category.</p>';

    // DOM Manipulation: Attach event listeners to detail buttons
    const detailButtons = container.querySelectorAll('.view-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceName = e.target.dataset.name;
            const resource = resourceList.find(r => r.name === resourceName);
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
function init() {
    if (resources.length === 0) return;

    // Load saved filter preference from localStorage
    const savedFilter = loadFilterPreference();
    const filterContainer = document.getElementById('filter-buttons');

    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');

        // Set active state from saved preference
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === savedFilter);
        });

        displayResources(resources, savedFilter);

        // DOM Manipulation: Event listeners for filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const selectedFilter = btn.dataset.filter;
                saveFilterPreference(selectedFilter);
                displayResources(resources, selectedFilter);
            });
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
