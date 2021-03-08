import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { withRouter } from "react-router-dom";

// Lodash
import _map from "lodash/map";
import _get from "lodash/get";
import _noop from "lodash/noop";

// Components
import List from "./components/organisms/list";
import Button from "../../components/atoms/button";
import AddNewTaskListForm from "./components/molecules/addNewTaskListForm";
import Header from "../../components/molecules/header";

// Connectors
import withActionHandlers from "../../connectors/withActionHandlers";

// Event Emitters
import pubSub from "../../utils/PubSub";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../constants";
import ACTION_HANDLERS from "./taskBoard.actionHandlers";
import ACTION_TYPES from "./constants/taskBoard.actionTypes";
import { INITIAL_STATE } from "./constants/taskBoard.general";
import EVENTS from "../../constants/events.general";

// Styles
import styles from "./taskBoard.module.scss";

const AddNewTaskListButton = ({ onClick }) => {
  return (
    <Button className={styles.addNewListButton} onClick={onClick}>
      + Add another list
    </Button>
  );
};

function TaskBoard(props) {
  const { lists, onAction, addingNewTaskList, addNewTaskDetails } = props;
  useEffect(() => {
    const taskBoardid = _get(props, "match.params.id");
    onAction({
      type: ACTION_TYPES.FETCH_BOARD_DETAILS,
      payload: {
        taskBoardid,
      },
    });

    return () => {
      pubSub.publish(EVENTS.STORE_CURRENT_BOARD_TO_STORE, taskBoardid);
    };
  }, [onAction]);

  const handleAddNewTaskListButtonClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onAction({
      type: ACTION_TYPES.ADD_NEW_TASK_LIST_BUTTON_CLICK,
      payload: EMPTY_OBJECT,
    });
  };

  const handleClick = () => {
    onAction({
      type: ACTION_TYPES.CLOSE_LIST_AND_TASK_FORMS,
      payload: EMPTY_OBJECT,
    });
  };

  const handleGoToHome = () => {
    onAction({
      type: ACTION_TYPES.GO_TO_HOME_PAGE,
      payload: EMPTY_OBJECT,
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container} onClick={handleClick}>
        <Header onClick={handleGoToHome}/>
        <div className={styles.boardContent}>
          {_map(lists, ({ id, ...listDetails } = EMPTY_OBJECT) => (
            <List
              key={id}
              {...listDetails}
              className={styles.list}
              onAction={onAction}
              id={id}
              addNewTaskDetails={addNewTaskDetails}
            />
          ))}
          {!addingNewTaskList && (
            <AddNewTaskListButton onClick={handleAddNewTaskListButtonClick} />
          )}
          {addingNewTaskList && (
            <AddNewTaskListForm onAction={onAction} key={lists.length} />
          )}
        </div>
      </div>
    </DndProvider>
  );
}

TaskBoard.propTypes = {
  lists: PropTypes.array,
  onAction: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  addingNewTaskList: PropTypes.bool,
  addNewTaskDetails: PropTypes.object,
};

TaskBoard.defaultProps = {
  lists: EMPTY_ARRAY,
  onAction: _noop,
  addingNewTaskList: false,
  addNewTaskDetails: EMPTY_OBJECT,
};

const mapStateToProps = (state) => {
  return {
    lists: _get(state, "currentBoard.lists", EMPTY_ARRAY),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  withActionHandlers(ACTION_HANDLERS, INITIAL_STATE)
)(TaskBoard);
