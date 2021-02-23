import {renderCurrentLeftTime} from '../UI/renderTime.js';
import {toggleClasses} from '../UI/toggleClasses.js';
import {Settings} from './settings.js';
import {Tasks} from './tasks.js';

export const pomodoroTimer = () => {
  const $pomodoro = document.querySelector('#pomodoro');
  const $shortBreak = document.querySelector('#short-break');
  const $longBreak = document.querySelector('#long-break');
  const $startBtn = document.querySelector('#pomodoro-start');
  const $pauseBtn = document.querySelector('#pomodoro-pause');
  const $stopBtn = document.querySelector('#pomodoro-stop');
  const WORK = 'pomodoro';
  const SHORT_BREAK = 'shortbreak';
  const LONG_BREAK = 'longbreak';

  const state = {
    isClockRunning: false,
    isClockStopped: true,
    isSessionActive: false,
    type: WORK,
  }

  let timeSpentInCurrentSession = 0;
  let clockTimer;
  let {workSessionDuration, currentTimeLeftInSession, shortBreakDuration, longBreakDuration, autoStart, longBreakInterval} = Settings.getDefaultSettings;

  
  // Utilities
  const setSettings = () => {
    const defaultSettings = Settings.getDefaultSettings();
    const userSettings = Settings.getUserSettings();

    autoStart = (userSettings)
      ? userSettings.autoStart
      : defaultSettings.autoStart

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
      longBreakDuration = currentTimeLeftInSession;
    }
  }
  
  
  // Session toggler
  const toggleSessionType = () => {
    if (currentTimeLeftInSession > 0) {
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (state.type === WORK) {
        state.type = SHORT_BREAK;
        toggleClasses($shortBreak, state.type);
        setSettings();
        if (!autoStart) {
          pauseTimer();
        }
      } else if (state.type === SHORT_BREAK) {
        state.type = WORK;
        toggleClasses($pomodoro, state.type);
        setSettings();
        if (!autoStart) {
          pauseTimer();
        }
      }
    }
  }


  // Type toggler handler
  const setTypeHandler = (type) => {
    if (state.isSessionActive) {
      stopTimer();
    }
    state.isClockStopped = true;
    state.isClockRunning = false;
    state.isSessionActive = false;
    state.type = type;
    setSettings();
    renderCurrentLeftTime(currentTimeLeftInSession, type);
  }


  // Timer
  const startTimer = () => {
    if (state.isClockRunning) {
      return;
    }
    if (timeSpentInCurrentSession === 0) {
      setSettings();
    }
    clockTimer = setInterval(() => {
      toggleSessionType()
      renderCurrentLeftTime(currentTimeLeftInSession, state.type);
    }, 1000);
    
    state.isClockStopped = false;
    state.isClockRunning = true;
    state.isSessionActive = true;
    Settings.getClockState(state.isSessionActive);
  };

  const pauseTimer = () => {
    clearInterval(clockTimer);
    state.isClockStopped = true;
    state.isClockRunning = false;
  };

  const stopTimer = () => {
    clearInterval(clockTimer);
    setSettings();
    state.isClockStopped = true;
    state.isClockRunning = false;
    state.isSessionActive = false;
    renderCurrentLeftTime(currentTimeLeftInSession, state.type);
    timeSpentInCurrentSession = 0;
    Settings.getClockState(state.isSessionActive);
  };


  // Handlers
  $pomodoro.addEventListener('click', () => {
    setTypeHandler(WORK);
    toggleClasses($pomodoro, WORK);

  });
  $shortBreak.addEventListener('click', () => {
    setTypeHandler(SHORT_BREAK);
    toggleClasses($shortBreak, SHORT_BREAK);
  });
  $longBreak.addEventListener('click', () => {
    setTypeHandler(LONG_BREAK);
    toggleClasses($longBreak, LONG_BREAK);
  });

  $startBtn.addEventListener('click', startTimer); 
  $pauseBtn.addEventListener('click', pauseTimer);
  $stopBtn.addEventListener('click', stopTimer);

}
