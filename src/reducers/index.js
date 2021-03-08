import { combineReducers } from "redux";

import taskBoardReducer from "../pages/taskBoard/reducers";
import taskBoardsReducer from "../pages/taskBoards/reducers";

const reducers = {
  currentBoard: taskBoardReducer,
  allBoards: taskBoardsReducer,
};

const rootReducer = combineReducers(reducers);

// const rootReducer = (state = {}, action) => {
//   const currentBoard = state.currentBoard;
//   return {
//     currentBoard: taskBoardReducer(state.currentBoard, action),
//     // merge languageCodes with original action object, now you have access in translations reducer
//     allBoards: taskBoardsReducer(state.allBoards, {...action, currentBoard})
//   };
// };


export { rootReducer };
