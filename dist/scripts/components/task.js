export const tasks = () => {
  const $addTaskBtn = document.querySelector('#add-task');
  const $modal = document.querySelector('#add-task-modal');
  const $taskTitle = $modal.querySelector('input');
  const $taskSummary = $modal.querySelector('textarea');
  const $cancelTaskModal = document.querySelector('#cancel-task-modal');
  const $confirmTaskModal = document.querySelector('#confirm-task-modal');

  let sessionTasks = [];


  // Returned
  const getSessionTasks = () => {
    return sessionTasks;
  }


  // Utilities
  const submitNewTask = () => {
    let taskTitle = $taskTitle.value;
    let taskSummary = $taskSummary.value;
    let currentTask = {
      taskTitle,
      taskSummary
    };

    sessionTasks.push(currentTask);
    return currentTask;
  }


  // UI
  const toggleModalHandler = () => {
    $addTaskBtn.classList.toggle('hidden');
    $modal.classList.toggle('hidden');
  }

  const clearInputsHandler = () => {
    $taskTitle.value = '';
    $taskSummary.value = '';
  }

  const renderNewTaskHandler = () => {
    const $tasksInfo = document.querySelector('#tasks-info');
    const $taskTitleUI = $tasksInfo.querySelector('h1');
    const $taskSummaryUI = $tasksInfo.querySelector('p');

    let submitedTask = submitNewTask();
    let {taskTitle, taskSummary} = submitedTask;

    $taskTitleUI.textContent = taskTitle;
    $taskSummaryUI.textContent = taskSummary;
  }


  // Handlers
  $addTaskBtn.addEventListener('click', toggleModalHandler);
  $cancelTaskModal.addEventListener('click', () => {
    toggleModalHandler();
    clearInputsHandler();
  });
  $confirmTaskModal.addEventListener('click', () => {
    toggleModalHandler();
    renderNewTaskHandler();
    clearInputsHandler();
  });

  return {
    $addTaskBtn,
    getSessionTasks
  }

}
