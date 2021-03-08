import React, { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDrag, useDrop } from "react-dnd";

// Lodash
import _noop from "lodash/noop";

// Components
import List from "./List";

// Constants
import DRAGGABLE_TYPES from "../../../../../constants/draggableTypes";
import ACTION_TYPES from "../../../constants/taskBoard.actionTypes";

// Styles
import styles from "./list.module.scss";

function ListContainer({ id, className, onAction, tasks, ...restprops }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    item: { type: DRAGGABLE_TYPES.LIST, listId: id },
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
    accept: [DRAGGABLE_TYPES.LIST, DRAGGABLE_TYPES.TASK],
    hover: () => {},
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      return {
        type: DRAGGABLE_TYPES.LIST,
        listId: id,
      };
    },
    collect: (monitor) => ({}),
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cx(styles.listContainer, className, {
        [styles.dragging]: isDragging,
      })}
    >
      <List {...restprops} id={id} onAction={onAction} tasks={tasks}></List>
    </div>
  );
}

ListContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
  onAction: PropTypes.func,
};

ListContainer.defaultProps = {
  className: undefined,
  onAction: _noop,
};

export default ListContainer;
