import {renderCurrentLeftTime} from '../UI/renderTime.js'
import {settings} from './settings.js';

export const pomodoroTimer = () => {
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');

  let isClockRunning = false;
  let isClockStopped = true;
  let type = 'Work';
  let timeSpentInCurrentSession = 0;
  let clockTimer;
  
  const Settings = settings();
  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration, autoStart, longBreakInterval} = Settings.getDefaultSettings();
  
  
  // Timer settings
  const getUserSettings = () => {
    let userSettings = Settings.getUserSettings();
    if (!userSettings) {
      return;
    }
    setUpdatedSettings(userSettings);
  }
  
  const setUpdatedSettings = (settings) => {
    if (type === 'Work') {
      currentTimeLeftInSession = (settings.updatedWorkSessionDuration)
        ? settings.updatedWorkSessionDuration
        :  workSessionDuration
      workSessionDuration = currentTimeLeftInSession;
    } else {
      currentTimeLeftInSession = (settings.updatedShortBreakDuration)
        ? settings.updatedShortBreakDuration
        : shortBreakDuration
      shortBreakDuration = currentTimeLeftInSession;
    }
  }


  // Timer
  const startTimer = () => {
    isClockRunning = true;
    clockTimer = setInterval(() => {
      stepDown();
      renderCurrentLeftTime(currentTimeLeftInSession);
    }, 1000);
  };

  const pauseClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
  };

  const stopClock = () => {
    getUserSettings();
    clearInterval(clockTimer);
    isClockStopped = true;
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    renderCurrentLeftTime(currentTimeLeftInSession);
    type = 'Work';
    timeSpentInCurrentSession = 0;
  };

  
  // Toggler
  const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } 
    else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (type === 'Work') {
        currentTimeLeftInSession = shortBreakDuration
        // displaySessionLog('Work'); 
        type = 'Short break';
        getUserSettings();
      } else {
        currentTimeLeftInSession = workSessionDuration;
        type = 'Work';
        getUserSettings();
        if (type === 'Short break') {
        }
        // displaySessionLog('Short break');
      }
    }
    renderCurrentLeftTime(currentTimeLeftInSession);
  }

  const toggleClockHandler = (reset) => {
    if (reset) {
      stopClock();
    } else {
      if (isClockStopped) {
        getUserSettings();
        isClockStopped = false;
      }
      if (isClockRunning) {
        clearInterval(clockTimer);
        isClockRunning = false;
      } else {
        clockTimer = setInterval (() => {
          stepDown();
          renderCurrentLeftTime(currentTimeLeftInSession);
        }, 1000)
        isClockRunning = true;
      }
    }
  };


  // Handlers
  $startBtn.addEventListener('click', () => {
/*     if (isClockRunning) {
      return
    } */
    toggleClockHandler();
  });
  
  $pauseBtn.addEventListener('click', () => {
/*     if (!isClockRunning) {
      return
    } */
    toggleClockHandler();
  });
  
  $stopBtn.addEventListener('click', () => {
    toggleClockHandler(true);
  });

}