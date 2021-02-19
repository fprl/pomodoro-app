import {settings} from './settings.js';

export const pomodoroTimer = () => {
  const $pomodoroTimer = document.querySelector('#pomodoro-timer');
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');

  let isClockRunning = false;
  let clockTimer;
  let type = 'Work';
  let timeSpentInCurrentSession = 0;

  let Settings = settings();
  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration, autoStart, longBreakInterval} = Settings.getDefaultSettings();
  let userCustomSettings;


  // Utilities
  const getCustomSettings = () => {
    userCustomSettings = Settings.getUserSettings();
    if (!userCustomSettings) {
      return;
    }
    console.log(userCustomSettings);
  }

  const setUpdatedSettings = () => {
    if (type === 'Work') {
      
    }
  }

  const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } 
    else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (type === 'Work') {
        currentTimeLeftInSession = shortBreakDuration
        displaySessionLog('Work');
        type = 'Short break';
      } else {
        currentTimeLeftInSession = workSessionDuration;
        type = 'Work';
        if (type === 'Short break') {
          $addTaskBtn.classList.add('hidden');
        }
        displaySessionLog('Short break');
      }
    }
  }


  // Timer
  const startTimer = () => {
    isClockRunning = true;
    clockTimer = setInterval(() => {
      stepDown();
      renderCurrentLeftTime();
    }, 1000);
  };

  const pauseClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
  };

  const stopClock = () => {
    timeSpentInCurrentSession = 0;
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    renderCurrentLeftTime();
    type = 'Work';
  };

  const toggleClockHandler = (reset) => {
    if (reset) {
      stopClock();
    }
    return isClockRunning ? pauseClock() : startTimer();
  };

  
  // UI
  const renderCurrentLeftTime = () => {
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

    $pomodoroTimer.textContent = result.toString();
  };


  // Handlers
  $startBtn.addEventListener('click', () => {
    if (isClockRunning) {
      return
    }
    getCustomSettings();
    toggleClockHandler();
  });
  
  $pauseBtn.addEventListener('click', () => {
    if (!isClockRunning) {
      return
    }
    toggleClockHandler();
  });
  
  $stopBtn.addEventListener('click', () => {
    toggleClockHandler(true);
  });


}