import { discover } from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");
const visitMessage = document.getElementById("visit-message");

// Build cards and modals from the imported data
function buildCards() {
    discover.forEach((item) => {
        // Create the card
        const card = document.createElement("article");
        card.classList.add("discover-card");

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn" data-id="${item.id}">Learn More</button>
        `;

        grid.appendChild(card);

        // Create the modal dialog
        const modal = document.createElement("dialog");
        modal.classList.add("discover-modal");
        modal.id = `modal-${item.id}`;

        modal.innerHTML = `
            <button class="close-modal" aria-label="Close">&times;</button>
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            <address>${item.address}</address>
            <p>${item.details}</p>
        `;

        document.body.appendChild(modal);

        // Close button click
        modal.querySelector(".close-modal").addEventListener("click", () => {
            modal.close();
        });

        // Close when clicking outside the modal (on backdrop)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });

    // Add click listeners to all Learn More buttons
    grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".learn-more-btn");
        if (btn) {
            const id = btn.dataset.id;
            const modal = document.getElementById(`modal-${id}`);
            modal.showModal();
        }
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
