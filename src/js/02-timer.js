import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const startRef = document.querySelector('button[data-start]');
const secRef = document.querySelector('[data-seconds]');
const minRef = document.querySelector('[data-minutes]');
const hourRef = document.querySelector('[data-hours]');
const dayRef = document.querySelector('[data-days]');

startRef.addEventListener('click', onStart);

let timerId = null;
let currentDate;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    selectedDate = selectedDates[0];

    if (selectedDate < startTime) {
      startRef.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selectedDate > startTime) {
      startRef.removeAttribute('disabled', true);
    }

    currentDate = new Date(selectedDate);
  },
};

function onStart() {
  inputRef.setAttribute('disabled', 'true');
  startRef.setAttribute('disabled', 'true');
  timerId = setInterval(() => {
    const currentStart = Date.now();
    const TIME = currentDate - currentStart;
    const getTime = convertMs(TIME);

    secRef.textContent = getTime.seconds;
    minRef.textContent = getTime.minutes;
    hourRef.textContent = getTime.hours;
    dayRef.textContent = getTime.days;

    if (TIME < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

flatpickr(inputRef, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
