import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import TaskBoards from '../../pages/taskBoards';
import TaskBoard from '../../pages/taskBoard';

const Routes = () => {
  return (
    <Switch>
      <Route path="/taskBoard/:id" exact component={TaskBoard} />
      <Route path="/" exact component={TaskBoards} />
    </Switch>
  );
};

export default Routes;