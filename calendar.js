const calendarContainer = document.getElementById('calendarContainer');
const yearTitle = document.getElementById('yearTitle');

const today = new Date();
const currentYear = today.getFullYear();
yearTitle.textContent = `${currentYear} Year Calendar`;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function createMonthCalendar(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const monthName = months[monthIndex];

  const monthDiv = document.createElement("div");
  monthDiv.className = "month";

  const title = document.createElement("h2");
  title.textContent = monthName;
  monthDiv.appendChild(title);

  const weekdays = document.createElement("div");
  weekdays.className = "weekdays";
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    weekdays.appendChild(dayDiv);
  });
  monthDiv.appendChild(weekdays);

  const dates = document.createElement("div");
  dates.className = "dates";

  // Empty days before the first of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const empty = document.createElement("div");
    dates.appendChild(empty);
  }

  // Actual days
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const dateDiv = document.createElement("div");
    const fullDate = new Date(year, monthIndex, date);

    dateDiv.textContent = date;

    if (
      fullDate.getFullYear() === today.getFullYear() &&
      fullDate.getMonth() === today.getMonth() &&
      fullDate.getDate() === today.getDate()
    ) {
      dateDiv.classList.add("today");
    }

    dates.appendChild(dateDiv);
  }

  monthDiv.appendChild(dates);
  return monthDiv;
}

function renderFullYearCalendar(year) {
  for (let i = 0; i < 12; i++) {
    const monthCalendar = createMonthCalendar(year, i);
    calendarContainer.appendChild(monthCalendar);
  }
}

renderFullYearCalendar(currentYear);
