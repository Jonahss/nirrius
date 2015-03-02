import _ from "lodash"
import Immutable from "immutable"
import Marty from "marty"
import constants from "../constants/desktop"

let uniqueID = (() => Math.random().toString(36).substring(7))

export default Marty.createStore({
  bringPaneToFront(index) {
    let
      panes = this.state.panes,
      pane = panes.get(index)

    pane.minimized = false

    this.state.panes = panes.set(index, pane)
    this.hasChanged()

    // Skip panes that are already at the top.
    if (index === panes.size - 1) return

    this.state.panes = panes.delete(index).push(pane)
    this.hasChanged()
  },

  closePane(index) {
    this.state.panes = this.state.panes.delete(index)
    this.hasChanged()
  },

  createPane(attributes) {
    attributes = _.extend({}, attributes, {
      paneID: uniqueID(),
      creationOrder: this.state.panesCreated
    })

    this.state.panes = this.state.panes.push(attributes)
    this.state.panesCreated++
    this.hasChanged()
  },

  getInitialState() {
    return {
      panes: Immutable.List(),
      panesCreated: 0,
      systemTime: Date.now()
    }
  },

  handlers: {
    createPane: [
      constants.CREATE_PANE,
      constants.GET_PANE_FROM_ROUTE,
      constants.GET_PANE_FROM_APPLICATION
    ],
    bringPaneToFront: constants.BRING_PANE_TO_FRONT,
    closePane: constants.CLOSE_PANE,
    setPaneAttributes: constants.SET_PANE_ATTRIBUTES
  },

  setPaneAttributes(index, attributes) {
    let pane = this.state.panes.get(index)
    _.extend(pane, attributes)

    this.state.panes = this.state.panes.set(index, pane)
    this.hasChanged()

    // Minimized panes shouldn't have focus.
    if (pane.minimized && this.state.panes.size > 1) {
      this.bringPaneToFront(index - 1)
    }
  }
})
