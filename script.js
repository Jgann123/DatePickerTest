document.addEventListener('DOMContentLoaded', function () {
    var inputElement = document.getElementById('date-input');
    var iconElement = document.getElementById('icon-button');
    var popupElement = document.querySelector('.datepicker-popup');
    var monthSelectElement = document.getElementById('month-select');
    var yearSelectElement = document.getElementById('year-select');
    var calendarElement = document.querySelector('.datepicker-calendar');
    var previousMonthButton = document.getElementById('previous-month');
    var nextMonthButton = document.getElementById('next-month');
    var currentDate = new Date();
    var selectedDate = null;
    var blackoutDates = ['2023-05-22', '2023-05-24', '2023-05-26']; // Example blackout dates
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    var currentYear = currentDate.getFullYear();
    for (var i = 0; i < 12; i++) {
        var option = document.createElement('option');
        option.value = i.toString();
        option.textContent = months[i];
        monthSelectElement.appendChild(option);
    }
    for (var i = currentYear - 10; i <= currentYear + 10; i++) {
        var option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        yearSelectElement.appendChild(option);
    }
    // Show initial calendar
    renderCalendar();
    // Function to toggle datepicker popup visibility
    function togglePopup() {
        popupElement.style.display = popupElement.style.display === 'none' ? 'block' : 'none';
    }
    // Function to render the calendar for the current month
    // Function to render the calendar for the current month
    function renderCalendar() {
        var year = Number(yearSelectElement.value);
        var month = Number(monthSelectElement.value);
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var startDay = new Date(year, month, 1).getDay();
        calendarElement.innerHTML = '';
        // Render empty days for the start of the month
        for (var i = 0; i < startDay; i++) {
            var emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty-day');
            calendarElement.appendChild(emptyDay);
        }
        // Render days of the month
        for (var i = 1; i <= daysInMonth; i++) {
            var day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i.toString();
            // Check if the current day matches the selected date
            if (selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year) {
                day.classList.add('selected-day');
            }
            day.addEventListener('click', handleDateSelection);
            calendarElement.appendChild(day);
        }
        // Apply blackout dates
        blackoutDates.forEach(function (blackoutDate) {
            var _a = blackoutDate.split('-'), blackoutYear = _a[0], blackoutMonth = _a[1], blackoutDay = _a[2];
            if (Number(blackoutMonth) === month && Number(blackoutYear) === year) {
                var blackoutDayElement = Array.from(calendarElement.children).find(function (child) { return child.textContent === blackoutDay && child.classList.contains('day'); });
                if (blackoutDayElement) {
                    blackoutDayElement.classList.add('blackout-day');
                }
            }
        });
    }
    // Function to handle date selection
    function handleDateSelection(event) {
        var selectedDay = Number(event.target.textContent);
        var selectedMonth = Number(monthSelectElement.value);
        var selectedYear = Number(yearSelectElement.value);
        // Remove selected-day class from previously selected day
        var previouslySelectedDayElement = calendarElement.querySelector('.selected-day');
        if (previouslySelectedDayElement) {
            previouslySelectedDayElement.classList.remove('selected-day');
        }
        selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
        inputElement.value = formatDate(selectedDate);
        event.target.classList.add('selected-day');
        togglePopup();
    }
    // Function to format date as MM/DD/YYYY
    function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return "".concat(month, "/").concat(day, "/").concat(year);
    }
    // Event listeners
    inputElement.addEventListener('click', togglePopup);
    iconElement.addEventListener('click', togglePopup);
    previousMonthButton.addEventListener('click', function () {
        var currentMonth = Number(monthSelectElement.value);
        if (currentMonth > 0) {
            monthSelectElement.value = (currentMonth - 1).toString();
        }
        else {
            monthSelectElement.value = '11';
            yearSelectElement.value = (Number(yearSelectElement.value) - 1).toString();
        }
        renderCalendar();
    });
    nextMonthButton.addEventListener('click', function () {
        var currentMonth = Number(monthSelectElement.value);
        if (currentMonth < 11) {
            monthSelectElement.value = (currentMonth + 1).toString();
        }
        else {
            monthSelectElement.value = '0';
            yearSelectElement.value = (Number(yearSelectElement.value) + 1).toString();
        }
        renderCalendar();
    });
});
