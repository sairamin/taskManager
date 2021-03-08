import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';

// Lodash
import _map from "lodash/map";
import _get from "lodash/get";
import _noop from "lodash/noop";

// Components
import CreateTaskBoardForm from "./components/createTaskBoardForm";
import Card from "../../components/molecules/card";

// Connectors
import withActionHandlers from "../../connectors/withActionHandlers";

// Event Emitters
import pubSub from '../../utils/PubSub';

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../constants";
import ACTION_HANDLERS from "./taskBoards.actionHandlers";
import ACTION_TYPES from "./constants/taskBoards.actionTypes";
import { INITIAL_STATE } from "./constants/taskBoards.general";
import EVENTS from '../../constants/events.general';

// Styles
import styles from "./taskBoards.module.scss";

function TaskBoards(props) {
  const { boards, onAction } = props;
  useEffect(() => {
    onAction({
      type: ACTION_TYPES.FETCH_BOARDS,
      payload: EMPTY_OBJECT,
    });
  }, [onAction]);

  const handleBoardClick = (boardId) => (event) => {
    onAction({
      type: ACTION_TYPES.OPEN_BOARD,
      payload: {
        boardId: boardId
      }
    })
  }

  return (
    <div className={styles.container}>
      <CreateTaskBoardForm onAction={onAction} key={boards.length} />
      <div className={styles.boardsList}>
        {_map(boards, ({ id, title, ...boardDetails } = EMPTY_OBJECT) => (
          <Card key={id} {...boardDetails} onAction={onAction} id={id} className={styles.board} onClick={handleBoardClick(id)}>
            <div className={styles.boardContent}>{title}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

TaskBoards.propTypes = {
  boards: PropTypes.array,
  onAction: PropTypes.func,
};

TaskBoards.defaultProps = {
  boards: EMPTY_ARRAY,
  onAction: _noop,
};

const mapStateToProps = (state) => {
  return {
    boards: _get(state, "allBoards.boards", EMPTY_ARRAY),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  withActionHandlers(ACTION_HANDLERS, INITIAL_STATE)
)(TaskBoards);
