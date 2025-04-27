const journalForm = document.getElementById('journalForm');
const entriesList = document.getElementById('entriesList');
const clearEntriesButton = document.getElementById('clearEntriesButton');
const journalDate = document.getElementById('journalDate'); 
window.onload = function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const currentDate = yyyy + '-' + mm + '-' + dd;
    journalDate.value = currentDate;

    displayEntries();
};

journalForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = journalDate.value;
    const entry = document.getElementById('journalEntry').value;

    if (date && entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const newEntry = { date, entry };
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
        journalForm.reset();
        displayEntries();
    }
});
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesList.innerHTML = '';

    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries yet. Start writing!</p>';
    } else {
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

clearEntriesButton.addEventListener('click', function() {
     const confirmation = window.confirm('Are you sure you want to clear all journal entries? This action cannot be undone.');
if (confirmation) {
        localStorage.removeItem('entries');
        entriesList.innerHTML = '<p>All entries have been cleared.</p>';
    } else {
        return;
