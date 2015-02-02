var
  Immutable = require("immutable"),
  _ = require("lodash"),
  Marty = require("marty"),
  constants = require("../constants/desktop");

module.exports = Marty.createStore({
  handlers: {
    createPane: constants.CREATE_PANE,
    bringPaneToFront: constants.BRING_PANE_TO_FRONT
  },

  getInitialState() {
    return {
      panes: Immutable.List()
    };
  },

  getAllPanes() {
    return this.state.panes;
  },

  createPane(attributes) {
    attributes.id = _.uniqueId();
    this.state.panes = this.state.panes.push(attributes);
    this.hasChanged();
  },

  bringPaneToFront(index) {
    var
      panes = this.state.panes,
      pane;

    // Skip panes that already at the top.
    if (index === panes.size - 1) {
      return;
    }

    pane = panes.get(index);

    console.log("RUNNING", index);
    this.state.panes = panes.delete(index).push(pane);
    this.hasChanged();
  }
});
