import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Lodash
import _noop from "lodash/noop";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

// Components
import Input from "../../../../components/atoms/input";
import Button from "../../../../components/atoms/button";

// Constants
import ACTION_TYPES from "../../constants/taskBoards.actionTypes";

// Styles
import styles from "./createTaskBoardForm.module.scss";

const CreateTaskBoardForm = ({ onAction }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewBoard = (title) => {
    if (!_isEmpty(title)) {
      onAction({
        type: ACTION_TYPES.ADD_NEW_BOARD,
        payload: {
          title,
        },
      });
    }
    inputRef.current.focus();
  };

  const handleAddBoardButtonClick = (event) => {
    const boardTitle = _get(inputRef, "current.state.value");
    handleAddNewBoard(boardTitle);
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const boardTitle = event.target.value;
      handleAddNewBoard(boardTitle);
    }
  };

  return (
    <div className={styles.addNewTaskForm}>
      <Input
        className={styles.inputBoardTitle}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        placeholder={"Enter the title for new board..."}
      ></Input>
      <Button
        className={styles.addNewTaskButton}
        onClick={handleAddBoardButtonClick}
      >
        Create Board
      </Button>
    </div>
  );
};

CreateTaskBoardForm.propTypes = {
  onAction: PropTypes.func,
};

CreateTaskBoardForm.defaultProps = {
  onAction: _noop,
};

export default CreateTaskBoardForm;
