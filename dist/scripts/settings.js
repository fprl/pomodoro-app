export const pomoSettings = ({
  workSessionDuration = 1500,
  currentTimeLeftInSession = workSessionDuration,
  shortBreakDuration = 300,
  longBreakDuration = 900
}) => {

  return {
    workSessionDuration,
    currentTimeLeftInSession,
    shortBreakDuration,
    longBreakDuration,
  }
}