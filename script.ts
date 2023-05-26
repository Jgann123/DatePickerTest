document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('date-input') as HTMLInputElement;
    const popupElement = document.querySelector('.datepicker-popup') as HTMLElement;
    const monthSelectElement = document.getElementById('month-select') as HTMLSelectElement;
    const yearSelectElement = document.getElementById('year-select') as HTMLSelectElement;
    const calendarElement = document.querySelector('.datepicker-calendar') as HTMLElement;
    const previousMonthButton = document.getElementById('previous-month') as HTMLButtonElement;
    const nextMonthButton = document.getElementById('next-month') as HTMLButtonElement;
  
    let currentDate = new Date();
    let selectedDate: Date | null = null;
    let blackoutDates: string[] = ['2023-05-22', '2023-05-24', '2023-05-26']; // Example blackout dates
  
    const months: string[] = [
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
  
    const currentYear = currentDate.getFullYear();
  
    for (let i = 0; i < 12; i++) {
      const option = document.createElement('option');
      option.value = i.toString();
      option.textContent = months[i];
      monthSelectElement.appendChild(option);
    }
  
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      const option = document.createElement('option');
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
    const year = Number(yearSelectElement.value);
    const month = Number(monthSelectElement.value);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
  
    calendarElement.innerHTML = '';
  
    // Render empty days for the start of the month
    for (let i = 0; i < startDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'empty-day');
      calendarElement.appendChild(emptyDay);
    }
  
    // Render days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.classList.add('day');
      day.textContent = i.toString();
  
      // Check if the current day matches the selected date
      if (
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      ) {
        day.classList.add('selected-day');
      }
  
      day.addEventListener('click', handleDateSelection);
      calendarElement.appendChild(day);
    }
  
    // Apply blackout dates
    blackoutDates.forEach((blackoutDate) => {
      const [blackoutYear, blackoutMonth, blackoutDay] = blackoutDate.split('-');
      if (Number(blackoutMonth) === month && Number(blackoutYear) === year) {
        const blackoutDayElement = Array.from(calendarElement.children).find(
          (child) => child.textContent === blackoutDay && child.classList.contains('day')
        );
        if (blackoutDayElement) {
          blackoutDayElement.classList.add('blackout-day');
         
        }
      }
    });
  }
  

// Function to handle date selection
function handleDateSelection(event: MouseEvent) {
    const selectedDay = Number((event.target as HTMLElement).textContent);
    const selectedMonth = Number(monthSelectElement.value);
    const selectedYear = Number(yearSelectElement.value);
  
    // Remove selected-day class from previously selected day
    const previouslySelectedDayElement = calendarElement.querySelector('.selected-day');
    if (previouslySelectedDayElement) {
      previouslySelectedDayElement.classList.remove('selected-day');
    }
  
    selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    inputElement.value = formatDate(selectedDate);
    (event.target as HTMLElement).classList.add('selected-day');
    togglePopup();
  }
  

  
  
    // Function to format date as MM/DD/YYYY
    function formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    }
  
    // Event listeners
    inputElement.addEventListener('click', togglePopup);
    previousMonthButton.addEventListener('click', () => {
      const currentMonth = Number(monthSelectElement.value);
      if (currentMonth > 0) {
        monthSelectElement.value = (currentMonth - 1).toString();
      } else {
        monthSelectElement.value = '11';
        yearSelectElement.value = (Number(yearSelectElement.value) - 1).toString();
      }
      renderCalendar();
    });
    nextMonthButton.addEventListener('click', () => {
      const currentMonth = Number(monthSelectElement.value);
      
      if (currentMonth < 11) {
        monthSelectElement.value = (currentMonth + 1).toString();
        
      } else {
        monthSelectElement.value = '0';
        yearSelectElement.value = (Number(yearSelectElement.value) + 1).toString();
      }
      renderCalendar();
    });
  });
  