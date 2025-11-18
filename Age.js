 document.addEventListener('DOMContentLoaded', function() {
            const dayInput = document.getElementById('day');
            const monthInput = document.getElementById('month');
            const yearInput = document.getElementById('year');
            const calculateBtn = document.getElementById('calculate-btn');
            const dayError = document.getElementById('day-error');
            const monthError = document.getElementById('month-error');
            const yearError = document.getElementById('year-error');
            const yearsElement = document.getElementById('years');
            const monthsElement = document.getElementById('months');
            const daysElement = document.getElementById('days');
            
            // Set maximum year to current year
            const currentYear = new Date().getFullYear();
            yearInput.max = currentYear;
            
            // Validate day input
            dayInput.addEventListener('input', function() {
                const day = parseInt(dayInput.value);
                if (isNaN(day) || day < 1 || day > 31) {
                    dayError.textContent = 'Please enter a valid day (1-31)';
                } else {
                    dayError.textContent = '';
                }
            });
            
            // Validate month input
            monthInput.addEventListener('input', function() {
                const month = parseInt(monthInput.value);
                if (isNaN(month) || month < 1 || month > 12) {
                    monthError.textContent = 'Please enter a valid month (1-12)';
                } else {
                    monthError.textContent = '';
                }
            });
            
            // Validate year input
            yearInput.addEventListener('input', function() {
                const year = parseInt(yearInput.value);
                if (isNaN(year) || year < 1900 || year > currentYear) {
                    yearError.textContent = `Please enter a valid year (1900-${currentYear})`;
                } else {
                    yearError.textContent = '';
                }
            });
            
            // Calculate age when button is clicked
            calculateBtn.addEventListener('click', function() {
                // Reset errors
                dayError.textContent = '';
                monthError.textContent = '';
                yearError.textContent = '';
                
                // Get input values
                const day = parseInt(dayInput.value);
                const month = parseInt(monthInput.value);
                const year = parseInt(yearInput.value);
                
                // Validate inputs
                let isValid = true;
                
                if (isNaN(day) || day < 1 || day > 31) {
                    dayError.textContent = 'Please enter a valid day';
                    isValid = false;
                }
                
                if (isNaN(month) || month < 1 || month > 12) {
                    monthError.textContent = 'Please enter a valid month';
                    isValid = false;
                }
                
                if (isNaN(year) || year < 1900 || year > currentYear) {
                    yearError.textContent = `Please enter a valid year (1900-${currentYear})`;
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Validate date (e.g., check if February has 29 days in leap year)
                const date = new Date(year, month - 1, day);
                if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
                    dayError.textContent = 'Invalid date';
                    return;
                }
                
                // Calculate age
                const today = new Date();
                const birthDate = new Date(year, month - 1, day);
                
                let years = today.getFullYear() - birthDate.getFullYear();
                let months = today.getMonth() - birthDate.getMonth();
                let days = today.getDate() - birthDate.getDate();
                
                if (days < 0) {
                    months--;
                    // Get the number of days in the previous month
                    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                    days += lastMonth.getDate();
                }
                
                if (months < 0) {
                    years--;
                    months += 12;
                }
                
                // Handle future dates
                if (years < 0) {
                    yearsElement.textContent = '0';
                    monthsElement.textContent = '0';
                    daysElement.textContent = '0';
                    return;
                }
                
                // Display the result
                yearsElement.textContent = years;
                monthsElement.textContent = months;
                daysElement.textContent = days;
            });
        });