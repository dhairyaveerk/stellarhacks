// Get references to the form and display area
const journalForm = document.getElementById('journalForm');
const entriesList = document.getElementById('entriesList');

// Load existing journal entries from local storage
window.onload = function() {
    displayEntries();
};

// Handle form submission
journalForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload on form submission

    const date = document.getElementById('journalDate').value;
    const entry = document.getElementById('journalEntry').value;

    if (date && entry) {
        // Get existing entries from local storage
        const entries = JSON.parse(localStorage.getItem('entries')) || [];

        // Add the new entry
        const newEntry = { date, entry };
        entries.push(newEntry);

        // Save updated entries to local storage
        localStorage.setItem('entries', JSON.stringify(entries));

        // Clear the form
        journalForm.reset();

        // Display the updated list of entries
        displayEntries();
    }
});

// Function to display all journal entries
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesList.innerHTML = ''; // Clear the existing list

    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries yet. Start writing!</p>';
    } else {
        // Display each entry
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <strong>${entry.date}</strong>
                <p>${entry.entry}</p>
            `;
            entriesList.appendChild(entryDiv);
        });
    }
}
