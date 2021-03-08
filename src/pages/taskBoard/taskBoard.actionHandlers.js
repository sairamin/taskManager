import produce from "immer";

// Lodash
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import _isNil from "lodash/isNil";
import _trim from 'lodash/trim';

// Utils
import addElementAtIndex from "../../utils/addElementAtIndex";
import removeElementAtIndex from "../../utils/removeElementAtIndex";

// Helpers
import { getTaskDetails, createNewEmptyList } from "./helpers/taskBoard.lists";

// Constants
import ACTION_TYPES from "./constants/taskBoard.actionTypes";
import { EMPTY_OBJECT } from "../../constants";
import DRAGGABLE_TYPES from "../../constants/draggableTypes";

const handleFetchTasksList = async ({ payload = EMPTY_OBJECT }, { dispatch }) => {
  const { taskBoardid } = payload;
  dispatch({
    type: ACTION_TYPES.FETCH_BOARD_DETAILS,
    payload: {
      taskBoardid
    },
  });
};

const handleAddTask = ({ payload = EMPTY_OBJECT }, { getState, dispatch }) => {
  const { listId, title } = payload;
  const { lists } = getState();
  const targetListIndex = _findIndex(lists, (list) => list.id === listId);
  const updatedLists = produce(lists, (draft) => {
    const task = {
      id: Date.now(),
      title: _trim(title),
    };
    draft[targetListIndex].tasks.push(task);
  });
  dispatch({
    type: ACTION_TYPES.UPDATE_TASK_LISTS,
    payload: {
      lists: updatedLists,
    },
  });
};

const handleTaskDragWithinSameList = ({ payload }, { dispatch, getState }) => {
  const { dragSource = EMPTY_OBJECT, dragTarget = EMPTY_OBJECT } = payload;
  const { taskId: sourceTaskId, listId: sourceListId } = dragSource;
  const {
    taskId: targetTaskId,
    listId: targetListId,
  } = dragTarget;
  const { lists } = getState();
  const {
    list: sourceList,
    listIndex: sourceListIndex,
    taskIndex: sourceTaskIndex,
    task: sourceTask,
  } = getTaskDetails(lists, sourceListId, sourceTaskId);
  let {
    listIndex: targetListIndex,
    taskIndex: targetTaskIndex,
  } = getTaskDetails(lists, targetListId, targetTaskId);

  const updatedLists = produce(lists, (draft) => {
    const filteredList = removeElementAtIndex(
      sourceList.tasks,
      sourceTaskIndex
    );
    draft[sourceListIndex].tasks = filteredList;
    draft[targetListIndex].tasks = addElementAtIndex(
      filteredList,
      sourceTask,
      targetTaskIndex
    );
  });
  dispatch({
    type: ACTION_TYPES.UPDATE_TASK_LISTS,
    payload: {
      lists: updatedLists,
    },
  });
};

const handleTaskDragBetweenLists = (
  { payload = EMPTY_OBJECT },
  { dispatch, getState }
) => {
  const { dragSource = EMPTY_OBJECT, dragTarget = EMPTY_OBJECT } = payload;
  const { taskId: sourceTaskId, listId: sourceListId } = dragSource;
  const {
    taskId: targetTaskId,
    listId: targetListId,
    type: targetType,
  } = dragTarget;
  const { lists } = getState();
  const {
    list: sourceList,
    listIndex: sourceListIndex,
    taskIndex: sourceTaskIndex,
    task: sourceTask,
  } = getTaskDetails(lists, sourceListId, sourceTaskId);
  let {
    list: targetList,
    listIndex: targetListIndex,
    taskIndex: targetTaskIndex,
  } = getTaskDetails(lists, targetListId, targetTaskId);
  if (_isNil(targetTaskId) && targetType === DRAGGABLE_TYPES.LIST) {
    targetTaskIndex = 0;
  }
  const updatedLists = produce(lists, (draft) => {
    draft[sourceListIndex].tasks = removeElementAtIndex(
      sourceList.tasks,
      sourceTaskIndex
    );
    draft[targetListIndex].tasks = addElementAtIndex(
      targetList.tasks,
      sourceTask,
      targetTaskIndex
    );
  });
  dispatch({
    type: ACTION_TYPES.UPDATE_TASK_LISTS,
    payload: {
      lists: updatedLists,
    },
  });
};

const handleTaskDragEnd = (
  { payload = EMPTY_OBJECT },
  { dispatch, getState }
) => {
  const { dragSource = EMPTY_OBJECT, dragTarget = EMPTY_OBJECT } = payload;
  const { listId: sourceListId } = dragSource;
  const { listId: targetListId } = dragTarget;
  if (sourceListId === targetListId) {
    handleTaskDragWithinSameList({ payload }, { dispatch, getState });
    return;
  }
  handleTaskDragBetweenLists({ payload }, { dispatch, getState });
};

const handleListDragEnd = (
  { payload = EMPTY_OBJECT },
  { dispatch, getState }
) => {
  const { lists } = getState();

  const sourceListId = _get(payload, "dragSource.listId");
  const targetListId = _get(payload, "dragTarget.listId");

  const sourceListIndex = _findIndex(lists, (list) => list.id === sourceListId);
  const targetListIndex = _findIndex(lists, (list) => list.id === targetListId);

  const sourceList = lists[sourceListIndex];

  const filteredLists = removeElementAtIndex(lists, sourceListIndex);
  const updatedLists = addElementAtIndex(
    filteredLists,
    sourceList,
    targetListIndex
  );

  dispatch({
    type: ACTION_TYPES.UPDATE_TASK_LISTS,
    payload: {
      lists: updatedLists,
    },
  });
};

const DRAGGABLE_TYPE_VS_DROP_HANDLERS = {
  [DRAGGABLE_TYPES.TASK]: handleTaskDragEnd,
  [DRAGGABLE_TYPES.LIST]: handleListDragEnd,
};

const handleDragEnd = ({ payload }, { dispatch, getState }) => {
  const sourceDragType = _get(payload, "dragSource.type");
  const dropHandler = DRAGGABLE_TYPE_VS_DROP_HANDLERS[sourceDragType];
  if (dropHandler) {
    dropHandler({ payload }, { dispatch, getState });
  }
};

const handleAddNewTaskListButtonClick = (params, { setState }) => {
  setState({
    addingNewTaskList: true,
  });
};

const handlecloseAddNewTaskListForm = (params, { setState }) => {
  setState({
    addingNewTaskList: false,
  });
};

const handleAddNewList = (
  { payload = EMPTY_OBJECT },
  { dispatch, getState }
) => {
  const { title } = payload;
  const { lists } = getState();
  const newEmptyList = createNewEmptyList(title);
  const updatedLists = produce(lists, (draft) => {
    draft.push(newEmptyList);
  });
  dispatch({
    type: ACTION_TYPES.UPDATE_TASK_LISTS,
    payload: {
      lists: updatedLists,
    },
  });
};

const handleAddNewTaskButtonClick = (
  { payload = EMPTY_OBJECT },
  { setState }
) => {
  const { listId } = payload;
  setState({
    addNewTaskDetails: {
      enabled: true,
      listId: listId,
    },
  });
};

const handlecloseAddNewTaskForm = (
  { payload = EMPTY_OBJECT },
  { setState }
) => {
  setState({
    addNewTaskDetails: {
      enabled: false,
      listId: undefined,
    },
  });
};

const handleCloseTaskAndListForms = (paramns, { setState }) => {
  setState({
    addingNewTaskList: false,
    addNewTaskDetails: {
      enabled: false,
      listId: undefined,
    },
  });
};

const handleGoToHomePage = ({ payload = EMPTY_OBJECT }, { getState }) => {
  const { history } = getState();
  history.push(`/`)
}

const ACTION_HANDLERS = {
  [ACTION_TYPES.FETCH_BOARD_DETAILS]: handleFetchTasksList,
  [ACTION_TYPES.ADD_TASK]: handleAddTask,
  [ACTION_TYPES.DRAG_END]: handleDragEnd,
  [ACTION_TYPES.ADD_NEW_TASK_LIST_BUTTON_CLICK]: handleAddNewTaskListButtonClick,
  [ACTION_TYPES.CLOSE_ADD_NEW_TASK_LIST_FORM]: handlecloseAddNewTaskListForm,
  [ACTION_TYPES.ADD_NEW_TASK_LIST]: handleAddNewList,
  [ACTION_TYPES.ADD_NEW_TASK_BUTTON_CLICK]: handleAddNewTaskButtonClick,
  [ACTION_TYPES.CLOSE_ADD_NEW_TASK_FORM]: handlecloseAddNewTaskForm,
  [ACTION_TYPES.CLOSE_LIST_AND_TASK_FORMS]: handleCloseTaskAndListForms,
  [ACTION_TYPES.GO_TO_HOME_PAGE]: handleGoToHomePage,
};

export default ACTION_HANDLERS;
