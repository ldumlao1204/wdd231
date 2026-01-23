// Set current year
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
}

// Set last modified date in format: MM/DD/YYYY HH:MM:SS
const lastModifiedParagraph = document.getElementById('last-modified');
if (lastModifiedParagraph) {
    const lastModified = new Date(document.lastModified);

    // Format: MM/DD/YYYY HH:MM:SS
    const month = String(lastModified.getMonth() + 1).padStart(2, '0');
    const day = String(lastModified.getDate()).padStart(2, '0');
    const year = lastModified.getFullYear();
    const hours = String(lastModified.getHours()).padStart(2, '0');
    const minutes = String(lastModified.getMinutes()).padStart(2, '0');
    const seconds = String(lastModified.getSeconds()).padStart(2, '0');

    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    lastModifiedParagraph.textContent = formattedDate;
}
