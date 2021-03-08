import React, { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDrag, useDrop } from "react-dnd";
import moment from "moment";

// Lodash
import _noop from "lodash/noop";

// Components
import Comment from "../../../../../components/molecules/comment";
import Avatar from "../../../../../components/molecules/avatar";
import Tooltip from "../../../../../components/molecules/tooltip";

// Constants
import DRAGGABLE_TYPES from "../../../../../constants/draggableTypes";
import ACTION_TYPES from "../../../constants/taskBoard.actionTypes";

// Styles
import styles from "./task.module.scss";

function Task({ title, className, id, listId, onAction }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    item: { type: DRAGGABLE_TYPES.TASK, taskId: id, listId },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        onAction({
          type: ACTION_TYPES.DRAG_END,
          payload: {
            dragSource: item,
            dragTarget: dropResult,
          },
        });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: DRAGGABLE_TYPES.TASK,
    hover: () => {},
    drop: () => ({
      type: DRAGGABLE_TYPES.TASK,
      taskId: id,
      listId,
    }),
    collect: (monitor) => ({}),
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cx(styles.container, className, {
        [styles.dragging]: isDragging,
      })}
    >
      <Comment
        author={<a href="/">Sai Chaitanya</a>}
        avatar={
          <Avatar
            src={"https://picsum.photos/200"}
            alt="Han Solo"
            className={styles.avatar}
          />
        }
        content={<p>{title}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

Task.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onAction: PropTypes.func,
};

Task.defaultProps = {
  title: "",
  description: "",
  onAction: _noop,
};

export default Task;
