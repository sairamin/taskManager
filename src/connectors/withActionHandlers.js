import React, { PureComponent } from "react";
import { connect } from "react-redux";

// Lodash
import _noop from "lodash/noop";

// Constants
import { EMPTY_OBJECT } from "../constants";

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  dispatch,
});

export default function (actionHandlers, initialState = EMPTY_OBJECT) {
  return function withActionHandlerWrapper(ComposedComponent) {
    class withActionHandlers extends PureComponent {
      state = initialState;

      componentWillUnmount() {
        this.unMounted = true;
      }

      setParentState = (...args) => {
        if (this.unMounted) return;
        this.setState(...args);
      };

      getWithActionHandlerState = () => ({ ...this.props, ...this.state });

      onAction = (params) => {
        if (this.unMounted) return null;
        const { dispatch } = this.props;
        const { type } = params;
        const funcToExec = actionHandlers[type] || _noop;
        return funcToExec(params, {
          getState: this.getWithActionHandlerState,
          setState: this.setParentState,
          dispatch,
        });
      };

      render() {
        const { props, state } = this;
        return (
          <ComposedComponent {...props} {...state} onAction={this.onAction} />
        );
      }
    }
    return connect(null, mapDispatchToProps)(withActionHandlers);
  };
}
