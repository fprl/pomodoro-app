const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startBtn = document.querySelector('#pomodoro-start');
const pauseBtn = document.querySelector('#pomodoro-pause');
const stopBtn = document.querySelector('#pomodoro-stop');



function pomodoro() {
  let workSessionDuration = 1500;
  let currentTimeLeftInSession = 1500;
  let breakDuration = 300;
  let longBreakDuration = 900;
  let isClockRunning = false;
  let clockTimer;

  const startTimer = () => {
    isClockRunning = true;
    clockTimer = setInterval(() => {
      currentTimeLeftInSession--;
      displayCurrentLeftTime();
    }, 1000);
  };

  const pauseClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
  };

  const stopClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentLeftTime();
  };

  const toggleClockHandler = (reset) => {
    if (reset) {
      stopClock();
    }
    return isClockRunning ? pauseClock() : startTimer();
  }

  const displayCurrentLeftTime = () => {
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

    pomodoroTimer.textContent = result.toString();
  };

  return {toggleClockHandler}
}

const app = pomodoro();

startBtn.addEventListener('click', () => {
  app.toggleClockHandler();
});

pauseBtn.addEventListener('click', () => {
  app.toggleClockHandler()
});

stopBtn.addEventListener('click', () => {
  app.toggleClockHandler(true)
});
