// document.addEventListener('DOMContentLoaded', function() {
//     const inputElement = document.getElementById('date-input');
//     const popupElement = document.querySelector('.datepicker-popup');
//     const monthSelectElement = document.getElementById('month-select');
//     const yearSelectElement = document.getElementById('year-select');
//     const calendarElement = document.querySelector('.datepicker-calendar');
//     const previousMonthButton = document.getElementById('previous-month');
//     const nextMonthButton = document.getElementById('next-month');
  
//     let currentDate = new Date();
//     let selectedDate = null;
//     let blackoutDates = ['2023-05-22', '2023-05-24', '2023-05-26']; // Example blackout dates
  
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
  
//     const currentYear = currentDate.getFullYear();
  
//     for (let i = 0; i < 12; i++) {
//       const option = document.createElement('option');
//       option.value = i;
//       option.textContent = months[i];
//       monthSelectElement.appendChild(option);
//     }
  
//     for (let i = currentYear - 10; i <= currentYear + 10; i++) {
//       const option = document.createElement('option');
//       option.value = i;
//       option.textContent = i;
//       yearSelectElement.appendChild(option);
//     }
  
//     // Show initial calendar
//     renderCalendar();
  
//     // Function to toggle datepicker popup visibility
//     function togglePopup() {
//       popupElement.style.display = popupElement.style.display === 'none' ? 'block' : 'none';
//     }
  
//     // Function to render the calendar for the current month
//     function renderCalendar() {
//       const year = Number(yearSelectElement.value);
//       const month = Number(monthSelectElement.value);
//       const daysInMonth = new Date(year, month + 1, 0).getDate();
//       const startDay = new Date(year, month, 1).getDay();
  
//       calendarElement.innerHTML = '';
  
//       // Render empty days for the start of the month
//       for (let i = 0; i < startDay; i++) {
//         const emptyDay = document.createElement('div');
//         emptyDay.classList.add('day', 'empty-day');
//         calendarElement.appendChild(emptyDay);
//       }
  
//       // Render days of the month
//       for (let i = 1; i <= daysInMonth; i++) {
//         const day = document.createElement('div');
//         day.classList.add('day');
//         day.textContent = i;
//         day.addEventListener('click', selectDate);
//         calendarElement.appendChild(day);
//       }
  
//       // Highlight selected date if available
//       if (selectedDate) {
//         const selectedDayElement = Array.from(calendarElement.children).find(
//           (child) => child.textContent === selectedDate.getDate().toString()
//         );
//         if (selectedDayElement) {
//           selectedDayElement.classList.add('selected-day');
//         }
//       }
  
//       // Apply blackout dates
//       blackoutDates.forEach((blackoutDate) => {
//         const [year, month, day] = blackoutDate.split('-');
//         const blackoutDayElement = Array.from(calendarElement.children).find(
//           (child) => child.textContent === day && child.classList.contains('day')
//         );
//         if (blackoutDayElement) {
//           blackoutDayElement.classList.add('blackout-day');
//           blackoutDayElement.removeEventListener('click', selectDate);
//         }
//       });
//     }
  
//     // Function to handle date selection
//     function selectDate(event) {
//       const selectedDay = Number(event.target.textContent);
//       const selectedMonth = Number(monthSelectElement.value);
//       const selectedYear = Number(yearSelectElement.value);
  
//       selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
//       inputElement.value = formatDate(selectedDate);
//       togglePopup();
//     }
  
//     // Function to format date as yyyy-mm-dd
//     function formatDate(date) {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${month}/${day}/${year}`;
//     }
  
//     // Event listeners
//     inputElement.addEventListener('click', togglePopup);
//     previousMonthButton.addEventListener('click', () => {
//       const currentMonth = Number(monthSelectElement.value);
//       if (currentMonth > 0) {
//         monthSelectElement.value = currentMonth - 1;
//       } else {
//         monthSelectElement.value = 11;
//         yearSelectElement.value = Number(yearSelectElement.value) - 1;
//       }
//       renderCalendar();
//     });
//     nextMonthButton.addEventListener('click', () => {
//       const currentMonth = Number(monthSelectElement.value);
//       if (currentMonth < 11) {
//         monthSelectElement.value = currentMonth + 1;
//       } else {
//         monthSelectElement.value = 0;
//         yearSelectElement.value = Number(yearSelectElement.value) + 1;
//       }
//       renderCalendar();
//     });
//   });
  