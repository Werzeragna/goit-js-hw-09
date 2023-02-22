import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objectPromise = { position, delay };
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(objectPromise);
      } else {
        reject(objectPromise);
      }
    }, delay);
  });
}

function onCreatePromise(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    formEl.reset();
  }
}

formEl.addEventListener('submit', onCreatePromise);
