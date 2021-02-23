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

  let timerState = {
    isSessionActive: false
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
  const getClockState = (isSessionActive) => {
    timerState.isSessionActive = isSessionActive;
  }

  const getDefaultSettings = () => {
    return defaultSettings;
  }

  const getUserSettings = () => {
    return userCustomSettings;
  }

  // Utilities
  const userSettingsHandler = () => {
    userCustomSettings = {
      workSessionDuration: $workSessionDuration.value * 60,
      currentTimeLeftInSession: $workSessionDuration.value * 60,
      shortBreakDuration: $shortBreakDuration.value * 60,
      longBreakDuration: $longBreakDuration.value * 60,
      autoStart: $autoStartRound.checked,
      longBreakInterval: $longBreakInterval.value
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
    userSettingsHandler();
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
