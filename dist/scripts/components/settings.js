export const settingsModal = () => {
  const $backdrop = document.querySelector('#backdrop');
  const $modal = document.querySelector('#pomodoro-set-modal');
  const $showModalBtn = document.querySelector('#show-modal');
  const $cancelModalBtn = document.querySelector('#cancel-modal-settings');
  const $confirmModalBtn = document.querySelector('#confirm-modal-settings');

  const toggleModalHandler = () => {
    $backdrop.classList.toggle('hidden');
    $modal.classList.toggle('hidden');
  }

  $showModalBtn.addEventListener('click', toggleModalHandler);
  $backdrop.addEventListener('click', toggleModalHandler);
  $cancelModalBtn.addEventListener('click', toggleModalHandler);
  $confirmModalBtn.addEventListener('click', () => {
    toggleModalHandler();
  })

  return {
    $modal
  }

}