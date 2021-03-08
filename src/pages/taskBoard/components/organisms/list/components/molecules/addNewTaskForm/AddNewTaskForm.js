import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Lodash
import _noop from "lodash/noop";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

// Components
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../../../../../../../components/atoms/button";

// Constants
import ACTION_TYPES from "../../../../../../constants/taskBoard.actionTypes";
import { EMPTY_OBJECT } from "../../../../../../../../constants";

// Styles
import styles from "./addNewTaskForm.module.scss";

const AddNewTaskForm = ({ onAction, listId }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewTask = (title) => {
    if (!_isEmpty(title)) {
      onAction({
        type: ACTION_TYPES.ADD_TASK,
        payload: {
          title,
          listId,
        },
      });
    } else {
      inputRef.current.focus();
    }
  };

  const handleAddListButtonClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const taskTitle = _get(inputRef, "current.innerText");
    handleAddNewTask(taskTitle);
  };

  const handleClose = () => {
    onAction({
      type: ACTION_TYPES.CLOSE_ADD_NEW_TASK_FORM,
      payload: EMPTY_OBJECT,
    });
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const taskTitle = event.target.innerText;
      handleAddNewTask(taskTitle);
    }
  };

  return (
    <div className={styles.addNewTaskForm}>
      <div
        contentEditable="true"
        className={styles.inputTaskContainer}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        placeholder={"Enter a title for this card..."}
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }}
      ></div>
      <div className={styles.addNewTaskButtonsContainer}>
        <Button
          className={styles.addNewTaskButton}
          onClick={handleAddListButtonClick}
        >
          Add Task
        </Button>
        <Button className={styles.closeButton} onClick={handleClose}>
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};

AddNewTaskForm.propTypes = {
  onAction: PropTypes.func,
};

AddNewTaskForm.defaultProps = {
  onAction: _noop,
};

export default AddNewTaskForm;
