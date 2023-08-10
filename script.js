function calculateAge() {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);

    // Clear previous error messages
    const errorDayElement = document.querySelector('.errorDay');
    const errorMonthElement = document.querySelector('.errorMonth');
    const errorYearElement = document.querySelector('.errorYear');
    errorDayElement.textContent = '';
    errorMonthElement.textContent = '';
    errorYearElement.textContent = '';

    // Input validation
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || month < 1 || month > 12 || year < 1900 || year > 2100) {
        if (isNaN(day) || day < 1 || day > 31) {
            errorDayElement.textContent = "Must be a valid day";
        }

        if (isNaN(month) || month < 1 || month > 12) {
            errorMonthElement.textContent = "Must be a valid month";
        }

        if (isNaN(year) || year < 1900 || year > 2100) {
            errorYearElement.textContent = "Must be a valid year";
        }

        return; // Stop further execution
    }

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    if ((month === 2 && day > (isLeapYear ? 29 : 28)) || ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) || day > 31) {
        errorDayElement.textContent = "Invalid day for selected month";
        return; // Stop further execution
    }

    if (birthDate > currentDate) {
        errorYearElement.textContent = 'Birthdate must be in the past.';
        return; // Stop further execution
    }

    // Calculate age (remaining code unchanged)
    const ageInMilliseconds = currentDate - birthDate;
    const ageDate = new Date(ageInMilliseconds);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    const actualYearElement = document.querySelector('.actual_year');
    const actualMonthElement = document.querySelector('.actual_month');
    const actualDayElement = document.querySelector('.actual_day');

    actualYearElement.textContent = years;
    actualMonthElement.textContent = months;
    actualDayElement.textContent = days;
}

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    calculateAge(); // Call your age calculation function
});

// Add event listeners to input fields to clear error messages
const dayInput = document.getElementById("inputDay");
const monthInput = document.getElementById("inputMonth");
const yearInput = document.getElementById("inputYear");

dayInput.addEventListener('input', clearErrorMessage);
monthInput.addEventListener('input', clearErrorMessage);
yearInput.addEventListener('input', clearErrorMessage);
