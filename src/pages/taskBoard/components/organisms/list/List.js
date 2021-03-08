import React, { Component } from "react";
import PropTypes from "prop-types";

// Lodash
import _map from "lodash/map";
import _noop from "lodash/noop";

// Components
import Card from "../../../../../components/molecules/card";
import Heading from "../../../../../components/atoms/heading";
import Task from "../../molecules/task";
import AddNewTaskForm from "./components/molecules/addNewTaskForm";
import Button from "../../../../../components/atoms/button";
import ListOptions from "./components/molecules/listOptions";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../../../../constants";
import ACTION_TYPES from "../../../constants/taskBoard.actionTypes";

// Styles
import styles from "./list.module.scss";

const AddNewTaskButton = ({ onClick }) => {
  return (
    <Button className={styles.addNewTaskButton} onClick={onClick}>
      + Add another task
    </Button>
  );
};

class List extends Component {
  handleAddNewTaskButtonClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onAction, id } = this.props;
    onAction({
      type: ACTION_TYPES.ADD_NEW_TASK_BUTTON_CLICK,
      payload: {
        listId: id,
      },
    });
  };

  renderTitle() {
    const { title } = this.props;
    return (
      <div className={styles.listTitle}>
        <Heading>{title}</Heading>
      </div>
    );
  }

  renderTask = ({ id, title } = EMPTY_OBJECT) => {
    const { id: listId, onAction } = this.props;
    return (
      <Task
        key={id}
        title={title}
        className={styles.task}
        id={id}
        listId={listId}
        onAction={onAction}
      />
    );
  };

  renderTasks() {
    const { tasks } = this.props;
    return (
      <div className={styles.tasksContainer}>
        {_map(tasks, this.renderTask)}
      </div>
    );
  }

  renderFooter() {
    const { tasks, onAction, id, addNewTaskDetails } = this.props;
    const { enabled, listId } = addNewTaskDetails;
    return (
      <div className={styles.footer}>
        {enabled && listId === id && (
          <AddNewTaskForm onAction={onAction} key={tasks.length} listId={id} />
        )}
        {(!enabled || !(listId === id)) && (
          <AddNewTaskButton onClick={this.handleAddNewTaskButtonClick} />
        )}
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.container}>
        {/* {this.renderTitle()}
        {this.renderTasks()}
        {this.renderFooter()} */}
        <Card title={title} extra={<ListOptions />}>
          {this.renderTasks()}
          {this.renderFooter()}
        </Card>
      </div>
    );
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  onAction: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  addNewTaskDetails: PropTypes.object,
};

List.defaultProps = {
  tasks: EMPTY_ARRAY,
  onAction: _noop,
  addNewTaskDetails: EMPTY_OBJECT,
};

export default List;
