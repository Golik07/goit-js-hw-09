import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  date: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hourse: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  span: document.querySelector('.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
};

let isActive = false;
let interval = 0;

function flatpickr(selectedDates) {
  if (selectedDates[0] <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    refs.btnStart.disabled = true;
  } else {
    refs.btnStart.disabled = false;
  }
}

flatpickr('input#datetime-picker', options.onClose(selectedDates));

refs.btnStart.addEventListener('click', start);

function start() {
  clearInterval(interval);
  if (isActive) {
    return;
  }

  const startTime = selectedDates[0];

  isActive = true;

  interval = setInterval(() => {
    refs.date.disabled = true;
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    if (deltaTime <= 0) {
      refs.date.disabled = false;
      clearInterval(interval);
    } else {
      const time = convertMs(deltaTime);
      updateClockTime(time);
      console.log(time);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hourse.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(time / day));
  const hours = addLeadingZero(Math.floor((time % day) / hour));
  const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((time % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
