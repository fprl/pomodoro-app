import {settingsModal} from './components/settings.js';
import {taskModal} from './components/task.js';
import {pomoSettings} from './settings.js';

const pomodoroTimer = (settings) => {
  const $pomodoroTimer = document.querySelector('#pomodoro-timer');
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');
  const $addTaskBtn = document.querySelector('#add-task');

  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration} = settings;
  let isClockRunning = false;
  let clockTimer;
  let type = 'Work';
  let timeSpentInCurrentSession = 0;


  // Utilities
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

  const displaySessionLog = (type) => {
    const $sessionList = document.querySelector('#pomodoro-sessions');
    const li = document.createElement('li');
    
    let sessionLabel = type;
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60);
    elapsedTime = (elapsedTime > 0) ? elapsedTime: '< 1';

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);
    li.appendChild(text);
    $sessionList.appendChild(li);
  }


  // Handlers
  $startBtn.addEventListener('click', () => {
    if (isClockRunning) {
      return
    }
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


  return {
    $pomodoroTimer
  }
}

const Settings = settingsModal();
const Tasks = taskModal();
const pomoCurrentSettings = pomoSettings({});
const Timer = pomodoroTimer(pomoCurrentSettings);