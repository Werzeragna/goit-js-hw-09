const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStop.disabled = true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnClickStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnClickStop() {
  btnStart.disabled = false;
  btnStop.disabled = true;

  clearInterval(timerId);
}

btnStart.style.fontSize = '28px';
btnStop.style.fontSize = '28px';
btnStart.style.fontWeight = '600';
btnStop.style.fontWeight = '600';

btnStart.addEventListener('click', onBtnClickStart);
btnStop.addEventListener('click', onBtnClickStop);
