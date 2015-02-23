import _ from "lodash"
import Immutable from "immutable"
import Marty from "marty"
import constants from "../constants/desktop"

let uniqueID = (() => Math.random().toString(36).substring(7))

export default Marty.createStore({
  handlers: {
    createPane: [constants.CREATE_PANE, constants.GET_PANE_FROM_ROUTE],
    bringPaneToFront: constants.BRING_PANE_TO_FRONT,
    closePane: constants.CLOSE_PANE,
    togglePaneMaximization: constants.TOGGLE_PANE_MAXIMIZATION
  },

  getInitialState() {
    return {
      panes: Immutable.List(),
      systemTime: Date.now()
    }
  },

  createPane(attributes) {
    attributes = _.extend({}, attributes, {
      paneID: uniqueID()
    })

    this.state.panes = this.state.panes.push(attributes)
    this.hasChanged()
  },

  bringPaneToFront(index) {
    let
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
    let pane = this.state.panes.get(index)
    pane.maximized = !pane.maximized

    this.state.panes = this.state.panes.set(index, pane)
    this.hasChanged()
  }
})
