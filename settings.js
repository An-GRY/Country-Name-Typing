let GebiModelist = document.getElementById('modelist');
let GebiTimelist = document.getElementById('timelist');
let Gebicustomtext = document.getElementById('customtimelimit');
let mode = GebiModelist.value;
// Load saved values from local storage on page load
const modeSavedValue = localStorage.getItem('modeOption');
if (modeSavedValue) {
  GebiModelist.value = modeSavedValue;
}

// Save selected values to local storage on change
GebiModelist.addEventListener('change', function() {
  localStorage.setItem('modeOption', modeValue);
});

document.getElementById('save-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});