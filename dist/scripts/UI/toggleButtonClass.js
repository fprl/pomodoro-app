export const toggleButtonClass = (elem) => {
  const $sessionTypeButtons = document.querySelectorAll('#session-type button');
  $sessionTypeButtons.forEach((button) => {
    if (button.classList.contains('btn--active')) {
      button.classList.remove('btn--active');
    }
    return;
  })
  elem.classList.add('btn--active');
};
