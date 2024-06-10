function isValidFloat(input) {
    const num = parseFloat(input);
    // Check if it's a valid number and finite
    if (!isNaN(num) && isFinite(num) && input.trim() !== "") {
        // Check if there's a decimal point in the input or a fractional part
        return input.includes('.') && (num % 1 !== 0 || input.endsWith('.0'));
    }
    return false;
};

function validateDateInput(dateString) {
    // Splitting the dateString to manually construct the date to avoid timezone issues
    const parts = dateString.split(/[- :]/);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based in JavaScript
    const day = parseInt(parts[2], 10);
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);
    const second = parseInt(parts[5], 10);

    // Early reject for invalid year input
    if (year < 1001 || year > 9999) {
        return false;
    }

    const date = new Date(year, month, day, hour, minute, second);

    // Define the minimum and maximum allowable dates in local time
    const minDate = new Date(1001, 0, 1, 0, 0, 0); // 1001-01-01 00:00:00
    const maxDate = new Date(9999, 11, 31, 23, 59, 59); // 9999-12-31 23:59:59

    // Check if the date is valid and within the allowed range
    return date >= minDate && date <= maxDate;
};
