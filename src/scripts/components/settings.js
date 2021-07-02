import {renderCurrentLeftTime} from '../UI/renderTime.js'

const settings = () => {
  const $backdrop = document.querySelector('#backdrop');
  const $modal = document.querySelector('#pomodoro-set-modal');
  const $showModalBtn = document.querySelector('#show-modal');
  const $cancelModalBtn = document.querySelector('#cancel-modal-settings');
  const $confirmModalBtn = document.querySelector('#confirm-modal-settings');

  const $workSessionDuration = $modal.querySelector('#work-duration');
  const $shortBreakDuration = $modal.querySelector('#short-break-duration');
  const $longBreakDuration = $modal.querySelector('#long-break-duration');
  const $autoStartRound = $modal.querySelector('#toogle');
  const $longBreakInterval = $modal.querySelector('#long-break-interval');

  const WORK = 'pomodoro';
  const SHORT_BREAK = 'shortbreak';
  const LONG_BREAK = 'longbreak';

  let timerState = {
    isSessionActive: false,
    type: WORK
  }

  let defaultSettings = {
    workSessionDuration: 1500,
    currentTimeLeftInSession: 1500,
    shortBreakDuration: 300,
    longBreakDuration: 900,
    autoStart: true,
    longBreakInterval: 4
  };
  
  let userCustomSettings;


  // Returned
  const getClockState = (state) => {
    let {isSessionActive, type} = state;

    timerState.isSessionActive = isSessionActive;
    timerState.type = type;
    
  }

  const getDefaultSettings = () => {
    return defaultSettings;
  }

  const getUserSettings = () => {
    return userCustomSettings;
  }

  // Utilities
  const userSettingsHandler = (type) => {
    let workSessionDuration = (type === WORK) ? $workSessionDuration.value * 60
      : (type === SHORT_BREAK) ? $shortBreakDuration.value * 60
      : $longBreakDuration.value * 60;

    userCustomSettings = {
      workSessionDuration: $workSessionDuration.value * 60,
      currentTimeLeftInSession: workSessionDuration,
      shortBreakDuration: $shortBreakDuration.value * 60,
      longBreakDuration: $longBreakDuration.value * 60,
      autoStart: $autoStartRound.checked,
      longBreakInterval: parseInt($longBreakInterval.value)
    }
  }

  // UI
  const toggleModalHandler = () => {
    $backdrop.classList.toggle('hidden');
    $modal.classList.toggle('hidden');
  }


  $showModalBtn.addEventListener('click', toggleModalHandler);
  $backdrop.addEventListener('click', toggleModalHandler);
  $cancelModalBtn.addEventListener('click', toggleModalHandler);
  $confirmModalBtn.addEventListener('click', () => {
    toggleModalHandler();
    userSettingsHandler(timerState.type);
    if (!timerState.isSessionActive) {
      renderCurrentLeftTime(userCustomSettings.currentTimeLeftInSession);
    }
  })

  return {
    getDefaultSettings,
    getUserSettings,
    getClockState,
  }

}

export const Settings = settings();
