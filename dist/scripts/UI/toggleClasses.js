export const toggleClasses = (elem, type) => {
  const $sessionTypeButtons = document.querySelectorAll('#session-type button');
  const $background = document.querySelector('#app-background');
  const $clock = document.querySelector('#app-clock');
  
  const btnActiveClass = 'btn--active';
  const bgClass = ` bg--${type}`;
  const textClass = ` text--${type}`;
  
  const bgRegex = /(^|\s)bg-\S+/g;
  const textRegex = /(^|\s)text-\S+/g;

  // Session type toggler
  $sessionTypeButtons.forEach((button) => {
    if (button.classList.contains(btnActiveClass)) {
      button.classList.remove(btnActiveClass);
    }
    elem.classList.add(btnActiveClass);
  })

  // Rest of UI
  $background.className = $background.className.replace(bgRegex, bgClass);
  $clock.className = $clock.className.replace(bgRegex, bgClass);
  $clock.className = $clock.className.replace(textRegex, textClass);

}
