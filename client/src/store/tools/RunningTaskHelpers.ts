export interface Task {
  isRunning: boolean;
  error: string | null;
  numAttempts: number;
}

function startTask(task: Task) {
  task.isRunning = true;
}

function stopTask(task: Task) {
  task.isRunning = false;
}

function taskSuccess(task: Task) {
  stopTask(task);
  task.error = null;
  task.numAttempts = 0;
}

function taskError(task: Task, error: string) {
  stopTask(task);
  task.error = error;
  task.numAttempts += 1;
}

export const TaskHelpers = {
  startTask,
  stopTask,
  taskSuccess,
  taskError,
};
