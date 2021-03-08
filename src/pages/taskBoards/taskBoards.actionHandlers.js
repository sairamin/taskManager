// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../constants";
import ACTION_TYPES from "./constants/taskBoards.actionTypes";

const handleFetchBoards = (params, { dispatch }) => {
  // dispatch({
  //   type: ACTION_TYPES.FETCH_BOARDS,
  //   payload: {
  //     boards: EMPTY_ARRAY,
  //   },
  // });
};

const handleAddNewBoard = ({ payload = EMPTY_OBJECT }, { dispatch }) => {
  const { title } = payload;
  const newBoard = {
    id: Date.now(),
    title,
    tasks: EMPTY_ARRAY,
  };
  dispatch({
    type: ACTION_TYPES.ADD_NEW_BOARD,
    payload: {
      board: newBoard,
    },
  });
};

const handleNavigatetoBoard = ({ payload = EMPTY_OBJECT }, { getState }) => {
  const { boardId } = payload;
  const { history } = getState();
  history.push(`taskBoard/${boardId}`)
}

const handleSaveCurrentBoard = ({ payload = EMPTY_OBJECT }, { dispatch }) => {
  const { taskBoardId } = payload;
  dispatch({
    type: ACTION_TYPES.SAVE_CURRENT_BOARD,
    payload: {
      taskBoardId,
    },
  });
}

const ACTION_HANDLERS = {
  [ACTION_TYPES.FETCH_BOARDS]: handleFetchBoards,
  [ACTION_TYPES.ADD_NEW_BOARD]: handleAddNewBoard,
  [ACTION_TYPES.OPEN_BOARD]: handleNavigatetoBoard,
  [ACTION_TYPES.SAVE_CURRENT_BOARD]: handleSaveCurrentBoard,
};

export default ACTION_HANDLERS;
