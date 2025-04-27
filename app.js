// Get references to the form, display area, and clear button
const journalForm = document.getElementById('journalForm');
const entriesList = document.getElementById('entriesList');
const clearEntriesButton = document.getElementById('clearEntriesButton');
const journalDate = document.getElementById('journalDate');  // Reference to the date input field

// Automatically set the current date in the journal date input field
window.onload = function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months are zero-based
    let dd = today.getDate();

    // Add leading zeros to single-digit months and days
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const currentDate = yyyy + '-' + mm + '-' + dd; // Format as YYYY-MM-DD
    journalDate.value = currentDate;

    // Load and display existing journal entries
    displayEntries();
};

// Handle form submission
journalForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload on form submission

    const date = journalDate.value;
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

// Handle clear entries button click with confirmation
clearEntriesButton.addEventListener('click', function() {
    // Ask for confirmation before clearing all entries
    const confirmation = window.confirm('Are you sure you want to clear all journal entries? This action cannot be undone.');

    if (confirmation) {
        // Remove all journal entries from local storage
        localStorage.removeItem('entries');

        // Clear the displayed entries
        entriesList.innerHTML = '<p>All entries have been cleared.</p>';
    } else {
        // If user cancels, do nothing
        return;
    }
});
