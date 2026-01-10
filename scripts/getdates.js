// Set current year
const currentYearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Set last modified date
const lastModifiedParagraph = document.getElementById('lastModified');
const lastModified = document.lastModified;
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;
