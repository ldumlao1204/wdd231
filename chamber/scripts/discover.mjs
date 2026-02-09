import discover from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");
const visitMessage = document.getElementById("visit-message");

// Build cards from the imported data
function buildCards() {
    discover.forEach((item, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

// localStorage visit tracking
function trackVisits() {
    const lastVisit = localStorage.getItem("discover-last-visit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 86400000;
        const elapsed = now - Number(lastVisit);
        const days = Math.floor(elapsed / msPerDay);

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("discover-last-visit", now);
}

buildCards();
trackVisits();
