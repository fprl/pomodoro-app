import {renderCurrentLeftTime} from '../UI/renderTime.js'
import {settings} from './settings.js';

export const pomodoroTimer = () => {
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');

  const state = {
    isClockRunning: false,
    isClockStopped: true,
    type: 'Work',
  }

  let timeSpentInCurrentSession = 0;
  let clockTimer;
  
  const Settings = settings();
  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration, autoStart, longBreakInterval} = Settings.getDefaultSettings();
  
  
  // Timer settings utilities
  const getUserSettings = () => {
    let userSettings = Settings.getUserSettings();
    if (!userSettings) {
      return;
    }
    setUserSettings(userSettings);
  }
  
  const setUserSettings = (settings) => {
    if (state.type === 'Work') {
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
    if (state.isClockRunning) {
      return;
    }
    clockTimer = setInterval(() => {
      toggleSessionType()
      renderCurrentLeftTime(currentTimeLeftInSession);
    }, 1000);
    state.isClockStopped = false;
    state.isClockRunning = true;
    Settings.getClockState(timeSpentInCurrentSession + 1);
  };

  const pauseTimer = () => {
    clearInterval(clockTimer);
    state.isClockStopped = true;
    state.isClockRunning = false;
  };

  const stopTimer = () => {
    getUserSettings();
    clearInterval(clockTimer);
    state.isClockStopped = true;
    state.isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    renderCurrentLeftTime(currentTimeLeftInSession);
    state.type = 'Work';
    timeSpentInCurrentSession = 0;
    Settings.getClockState(timeSpentInCurrentSession);
  };

  
  // Toggler
  const toggleSessionType = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } 
    else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (state.type === 'Work') {
        currentTimeLeftInSession = shortBreakDuration
        state.type = 'Short break';
        getUserSettings();
      } else {
        currentTimeLeftInSession = workSessionDuration;
        state.type = 'Work';
        getUserSettings();
      }
    }
    renderCurrentLeftTime(currentTimeLeftInSession);
  }


  // Handlers
  $startBtn.addEventListener('click', () => {
    startTimer();
  });
  
  $pauseBtn.addEventListener('click', () => {
    pauseTimer();
  });
  
  $stopBtn.addEventListener('click', () => {
    stopTimer();
  });

}