import { handleActions } from "redux-actions";
import produce from "immer";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../../constants";
import ACTION_TYPES from "../constants/taskBoard.actionTypes";

const INITIAL_STATE = {
  lists: EMPTY_ARRAY,
  id: undefined,
};

const initialiseTaskBoard = produce((state, { payload = EMPTY_OBJECT }) => {
  const { id = Date.now(), lists = EMPTY_ARRAY } = payload;
  state.lists = lists;
  state.id = id;
});

const updateTaskLists = produce((state, { payload = EMPTY_OBJECT }) => {
  const { lists } = payload;
  state.lists = lists;
});

const handlers = {
  [ACTION_TYPES.FETCH_BOARD_DETAILS]: initialiseTaskBoard,
  [ACTION_TYPES.UPDATE_TASK_LISTS]: updateTaskLists,
};

export default handleActions(handlers, INITIAL_STATE);
