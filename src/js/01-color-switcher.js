const bodyEl = document.querySelector('body');
const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');

startEl.addEventListener('click', getRandomHexColor);
stopEl.addEventListener('click', stopInterval);

let color = null;
let isActive = false;

function getRandomHexColor() {
  if (isActive) {
    return;
  }
  isActive = true;
  color = setInterval(() => {
    const random = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
    bodyEl.style.backgroundColor = random;
  }, 1000);
}

function stopInterval() {
  clearInterval(color);
  isActive = false;
}
