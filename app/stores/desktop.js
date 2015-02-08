var
  _ = require("lodash"),
  Immutable = require("immutable"),
  Marty = require("marty"),
  constants = require("../constants/desktop"),
  uniqueID = function () {
    return Math.random().toString(36).substring(7)
  }

module.exports = Marty.createStore({
  handlers: {
    createPane: [constants.CREATE_PANE, constants.GET_PANE_FROM_ROUTE],
    bringPaneToFront: constants.BRING_PANE_TO_FRONT,
    closePane: constants.CLOSE_PANE,
    togglePaneMaximization: constants.TOGGLE_PANE_MAXIMIZATION
  },

  getInitialState() {
    return {
      panes: Immutable.List()
    }
  },

  createPane(attributes) {
    attributes = _.extend({}, attributes, {
      paneID: uniqueID()
    })
    // debugger
    this.state.panes = this.state.panes.push(attributes)
    this.hasChanged()
  },

  bringPaneToFront(index) {
    var
      panes = this.state.panes,
      pane

    // Skip panes that are already at the top.
    if (index === panes.size - 1) return;
    pane = panes.get(index)

    this.state.panes = panes.delete(index).push(pane)
    this.hasChanged()
  },

  closePane(index) {
    this.state.panes = this.state.panes.delete(index)
    this.hasChanged()
  },

  togglePaneMaximization(index) {
    var pane = this.state.panes.get(index)
    pane.maximized = !pane.maximized

    this.state.panes = this.state.panes.set(index, pane)
    this.hasChanged()
  }
})
