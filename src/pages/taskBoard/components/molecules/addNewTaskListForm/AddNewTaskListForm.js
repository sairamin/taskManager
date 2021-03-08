import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Lodash
import _noop from "lodash/noop";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

// Components
import { AiOutlineClose } from "react-icons/ai";
import Input from "../../../../../components/atoms/input";
import Button from "../../../../../components/atoms/button";

// Constants
import ACTION_TYPES from "../../../constants/taskBoard.actionTypes";
import { EMPTY_OBJECT } from "../../../../../constants";

// Styles
import styles from "./addNewTaskListForm.module.scss";

const AddNewTaskListForm = ({ onAction }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewList = (title) => {
    if (!_isEmpty(title)) {
      onAction({
        type: ACTION_TYPES.ADD_NEW_TASK_LIST,
        payload: {
          title,
        },
      });
    } else {
      inputRef.current.focus();
    }
  };

  const handleAddListButtonClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const listTitle = _get(inputRef, "current.state.value");
    handleAddNewList(listTitle);
  };

  const handleClose = () => {
    onAction({
      type: ACTION_TYPES.CLOSE_ADD_NEW_TASK_LIST_FORM,
      payload: EMPTY_OBJECT,
    });
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const listTitle = event.target.value;
      handleAddNewList(listTitle);
    }
  };

  return (
    <div className={styles.addNewTaskListForm}>
      <Input
        className={styles.addNewTaskInput}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        placeholder={"Enter list title..."}
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }}
      ></Input>
      <div className={styles.addNewTaskListButtonsContainer}>
        <Button
          className={styles.addNewTaskListButton}
          onClick={handleAddListButtonClick}
        >
          Add List
        </Button>
        <Button className={styles.closeButton} onClick={handleClose}>
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};

AddNewTaskListForm.propTypes = {
  onAction: PropTypes.func,
};

AddNewTaskListForm.defaultProps = {
  onAction: _noop,
};

export default AddNewTaskListForm;
