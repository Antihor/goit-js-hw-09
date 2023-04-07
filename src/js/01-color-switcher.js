const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

let timerId = null;

startRef.addEventListener('click', onStart);
stopRef.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startRef.disabled = true;
  stopRef.disabled = false;
}
function onStop() {
  clearInterval(timerId);
  startRef.disabled = false;
  stopRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
