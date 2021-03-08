import { handleActions } from "redux-actions";
import produce from "immer";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../../constants";
import ACTION_TYPES from "../constants/taskBoards.actionTypes";

const INITIAL_STATE = {
  boards: EMPTY_ARRAY,
};

const initialiseTaskBoard = produce((state, { payload = EMPTY_OBJECT }) => {
  const { boards = EMPTY_ARRAY } = payload;
  state.boards = boards;
});

const addNewBoard = produce((state, { payload = EMPTY_OBJECT }) => {
  const { board } = payload;
  state.boards.push(board);
});

const saveCurrentBoard = produce((state, { payload }) => {
console.log(payload)
});

const handlers = {
  [ACTION_TYPES.FETCH_BOARDS]: initialiseTaskBoard,
  [ACTION_TYPES.ADD_NEW_BOARD]: addNewBoard,
  [ACTION_TYPES.SAVE_CURRENT_BOARD]: saveCurrentBoard,
};

export default handleActions(handlers, INITIAL_STATE);
