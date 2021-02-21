import {renderCurrentLeftTime} from '../UI/renderTime.js'
import {Settings} from './settings.js';

export const pomodoroTimer = () => {
  const $pomodoro = document.querySelector('#pomodoro');
  const $shortBreak = document.querySelector('#short-break');
  const $LongBreak = document.querySelector('#long-break');
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');

  const WORK = 'Work';
  const SHORT_BREAK = 'Short Break';
  const LONG_BREAK = 'Long Break';

  const state = {
    isClockRunning: false,
    isClockStopped: true,
    type: WORK,
  }

  const defaultSettings = Settings.getDefaultSettings();
  let userSettings;

  let timeSpentInCurrentSession = 0;
  let clockTimer;
  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration, autoStart, longBreakInterval} = Settings.getDefaultSettings();
  
  
  // Utilities
  const setSettings = (userSettings) => {
    if (state.type === WORK) {
      currentTimeLeftInSession = (userSettings)
        ? userSettings.workSessionDuration
        : defaultSettings.workSessionDuration;
      workSessionDuration = currentTimeLeftInSession;
    } else if (state.type === SHORT_BREAK) {
      currentTimeLeftInSession = (userSettings)
        ? userSettings.shortBreakDuration
        : defaultSettings.shortBreakDuration;
      shortBreakDuration = currentTimeLeftInSession;
    } else if (state.type === LONG_BREAK) {
      currentTimeLeftInSession = (userSettings)
        ? userSettings.longBreakDuration
        : defaultSettings.longBreakDuration;
      shortBreakDuration = currentTimeLeftInSession;
    }
  }

  
  // Session toggler
  const toggleSessionType = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } 
    else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (state.type === WORK) {
        state.type = SHORT_BREAK;
        userSettings = Settings.getUserSettings();
        setSettings(userSettings);
      } else if (state.type === SHORT_BREAK) {
        state.type = WORK;
        userSettings = Settings.getUserSettings();
        setSettings(userSettings);
      }
    }
  }


  // Timer
  const startTimer = () => {
    if (state.isClockRunning) {
      return;
    }
    if (timeSpentInCurrentSession === 0) {
      userSettings = Settings.getUserSettings();
      setSettings(userSettings);
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
    clearInterval(clockTimer);
    userSettings = Settings.getUserSettings();
    setSettings(userSettings);
    state.isClockStopped = true;
    state.isClockRunning = false;
    state.type = WORK;
    renderCurrentLeftTime(currentTimeLeftInSession);
    timeSpentInCurrentSession = 0;
    Settings.getClockState(timeSpentInCurrentSession);
  };


  // Handlers
  /* $pomodoro.addEventListener('click', setType);
  $shortBreak.addEventListener('click', setType);
  $LongBreak.addEventListener('click', setType); */

  $startBtn.addEventListener('click', startTimer);  
  $pauseBtn.addEventListener('click', pauseTimer);
  $stopBtn.addEventListener('click', stopTimer);

}
