// stories.js - ES Module for Heart Warrior Stories page
// Demonstrates: fetch API, localStorage, template literals, array methods, DOM manipulation

// ========== localStorage Visit Tracking ==========
function trackVisits() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('stories-last-visit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = 'Welcome! This is your first time visiting our Heart Warrior Stories. We hope these stories inspire you.';
    } else {
        const msPerDay = 86400000;
        const elapsed = now - Number(lastVisit);
        const days = Math.floor(elapsed / msPerDay);

        if (days < 1) {
            visitMessage.textContent = 'Back so soon! We love your enthusiasm for Heart Warrior stories.';
        } else if (days === 1) {
            visitMessage.textContent = 'You last visited 1 day ago. Welcome back!';
        } else {
            visitMessage.textContent = `You last visited ${days} days ago. Welcome back!`;
        }
    }

    localStorage.setItem('stories-last-visit', now);
}

// ========== Dynamic Content with Template Literals ==========
function createStoryCard(story) {
    const dateObj = new Date(story.date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `<article class="story-card">
        <figure class="story-img">
            <img src="${story.image}" alt="${story.name}" width="200" height="300" loading="lazy" style="object-position: ${story.imagePosition || 'center center'}">
        </figure>
        <h3 class="story-name">${story.name}</h3>
        <p class="story-age">${story.age}</p>
        <p class="story-milestone">${story.milestone}</p>
        <p class="story-text">${story.story}</p>
        <div class="story-meta">
            <span class="story-diagnosis">${story.diagnosis}</span>
            <span class="story-date">${formattedDate}</span>
        </div>
    </article>`;
}

// ========== Display Stories with Array Methods ==========
function displayStories(stories, sortOrder = 'newest') {
    const container = document.getElementById('stories-container');

    // Array method: sort
    const sortedStories = [...stories].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Array method: map + template literals
    const cardsHTML = sortedStories.map(story => createStoryCard(story)).join('');

    container.innerHTML = cardsHTML || '<p class="no-results">No stories found.</p>';
}

// ========== Fetch API with async/await ==========
async function fetchStories() {
    try {
        const response = await fetch('data/stories.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const stories = await response.json();
        return stories;
    } catch (error) {
        const container = document.getElementById('stories-container');
        container.innerHTML = `<p class="error-message">Unable to load stories. Please try again later.</p>`;
        return [];
    }
}

// ========== Initialize ==========
async function init() {
    // Track visits with localStorage
    trackVisits();

    // Fetch stories from JSON file
    const stories = await fetchStories();
    if (stories.length === 0) return;

    // Display stories sorted by newest first
    displayStories(stories, 'newest');

    // DOM Manipulation: Sort button event listeners
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sortOrder = btn.dataset.sort;
            displayStories(stories, sortOrder);
        });
    });
}

init();
