import {renderCurrentLeftTime} from '../UI/renderTime.js'

export const settings = () => {
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
  const getDefaultSettings = () => {
    return defaultSettings;
  }

  const getUserSettings = () => {
    return userCustomSettings;
  }

  const renderUserCurrentLeftTime = () => {
    let {updatedCurrentTimeLeftInSession} = userCustomSettings;

    renderCurrentLeftTime(updatedCurrentTimeLeftInSession);
  }


  // Utilities
  const userSettingsHandler = () => {
    userCustomSettings = {
      updatedWorkSessionDuration: $workSessionDuration.value * 60,
      updatedCurrentTimeLeftInSession: $workSessionDuration.value * 60,
      updatedShortBreakDuration: $shortBreakDuration.value * 60,
      updatedLongBreakDuration: $longBreakDuration.value * 60,
      updatedAutoStart: $autoStartRound.checked,
      updatedLongBreakInterval: $longBreakInterval.value
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
    renderUserCurrentLeftTime();
  })

  return {
    getDefaultSettings,
    getUserSettings,
    renderUserCurrentLeftTime
  }

}