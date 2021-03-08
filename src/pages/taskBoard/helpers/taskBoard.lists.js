// Lodash
import _findIndex from "lodash/findIndex";
import _trim from 'lodash/trim';

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../../constants";

const getTaskDetails = (lists, listId, taskId) => {
  const listIndex = _findIndex(lists, (list) => list.id === listId);
  const list = lists[listIndex] || EMPTY_OBJECT;
  const tasks = list.tasks || EMPTY_ARRAY;
  const taskIndex = _findIndex(tasks, (task) => task.id === taskId);
  const task = tasks[taskIndex] || EMPTY_OBJECT;
  return {
    list,
    listIndex,
    task,
    taskIndex,
  };
};

const createNewEmptyList = (title) => ({
  id: Date.now(),
  title: _trim(title),
  tasks: EMPTY_ARRAY
})

export { getTaskDetails, createNewEmptyList };
