export const renderCurrentLeftTime = (currentTimeLeftInSession) => {
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

  const $pomodoroTimer = document.querySelector('#pomodoro-timer');
  $pomodoroTimer.textContent = result.toString();

}