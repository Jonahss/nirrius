var
  _ = require("lodash"),
  Marty = require("marty"),
  constants = require("../constants/desktop")

module.exports = Marty.createStore({
  handlers: {
    createPane: constants.CREATE_PANE,
    bringPaneToFront: constants.BRING_PANE_TO_FRONT,
    closePane: constants.CLOSE_PANE,
    togglePaneMaximization: constants.TOGGLE_PANE_MAXIMIZATION
  },

  getInitialState() {
    return {
      panes: []
    }
  },

  getAllPanes() {
    return this.state.panes
  },

  createPane(attributes) {
    attributes.id = _.uniqueId()
    this.state.panes.push(attributes)
    this.hasChanged()
  },

  bringPaneToFront(index) {
    var
      panes = this.state.panes,
      pane

    // Skip panes that are already at the top.
    if (index === panes.length - 1) return;
    pane = panes[index]

    panes.splice(index, 1)
    panes.push(pane)
    this.hasChanged()
  },

  closePane(index) {
    this.state.panes.splice(index, 1)
    this.hasChanged()
  },

  togglePaneMaximization(index) {
    var pane = this.state.panes[index]
    pane.maximized = !pane.maximized
    this.hasChanged()
  }
})
