export const renderCurrentLeftTime = (currentTimeLeftInSession, type = '') => {
  const WORK = 'pomodoro';
  const SHORT_BREAK = 'shortbreak';
  const LONG_BREAK = 'longbreak';

  const secondsLeft = currentTimeLeftInSession;
  let result = '';
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;
  let hours = parseInt(secondsLeft / 3600);

  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time;
  }

  result =
    (hours > 0)
      ? result += `${hours}:`
      : result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;

  // clock
  const $pomodoroTimer = document.querySelector('#pomodoro-timer');
  $pomodoroTimer.textContent = result.toString();

  // title
  let $documentTitle = document.querySelector('title');
  $documentTitle.textContent = 
    (type === WORK)
      ? `${result.toString()} - Time to focus!`
      : `${result.toString()} - Time for a break!`;

}
