import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.btnStart.disabled = false;
    } else {
      refs.btnStart.disabled = true;
      Notify.failure('Error. Choose a future date.');
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPadZero(value) {
  return String(value).padStart(2, 0);
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.btnStart.disabled = true;
    refs.inputDateEl.disabled = true;
    if (countdown < 0) {
      refs.inputDateEl.disabled = false;
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(countdown));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addPadZero(days);
  refs.timerHours.textContent = addPadZero(hours);
  refs.timerMinutes.textContent = addPadZero(minutes);
  refs.timerSeconds.textContent = addPadZero(seconds);
}

const fp = flatpickr(refs.inputDateEl, options);

refs.btnStart.addEventListener('click', onTimerStart);
