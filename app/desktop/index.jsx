require("./index.styl")

import React from "react"
import Router from "react-router"
import Marty from "marty"
import _ from "lodash"
import desktopStore from "../stores/desktop"
import applicationsStore from "../stores/applications"
import desktopActions from "../actions/desktop"
import Pane from "../common/pane/index.jsx"
import Taskbar from "../common/taskbar/index.jsx"
import Applications from "../applications/index.jsx"

let desktopStoreState = Marty.createStateMixin({
  getState() {
    return {
      panes: desktopStore.state.panes,
      applications: applicationsStore.state.applications
    }
  },
  listenTo: [
    applicationsStore,
    desktopStore
  ]
})

const paneOffset = {x: 20, y: 25}

window.screen.availHeight

function calculatePanePosition (n) {
  let {availWidth, availHeight} = window.screen

  return {
    x: Math.min((n + 1) * paneOffset.x, availWidth - 700),
    y: Math.min((n + 1) * paneOffset.y, availHeight - 600)
  }
}

export default React.createClass({
  mixins: [Router.State, desktopStoreState],

  bringPaneToFront(index) {
    desktopActions.bringPaneToFront(index)
  },

  componentDidMount() {
    let {username, entryname} = this.getParams()
    if (username) {
      return desktopActions.getPaneFromRoute(username, entryname)
    }
  },

  closePane(index, event) {
    // Prevent pane rearrangement.
    event.stopPropagation()
    desktopActions.closePane(index)
  },

  getTaskbarItems() {
    let panes = this.state.panes.toArray()

    return panes.map(function (pane, storeIndex) {
      return _.extend({
        storeIndex,
        focused: storeIndex === panes.length - 1
      }, pane)
    })
  },

  minimizePane(index, event) {
    event.stopPropagation()

    desktopActions.setPaneAttributes(index, {
      minimized: true
    })
  },

  render() {
    return <main data-component="desktop">
      <div className="scanlines"></div>

      <Applications items={this.state.applications} />

      {this.renderPanes()}
      <Taskbar items={this.getTaskbarItems()} systemTime={this.state.systemTime} />
    </main>
  },

  renderPanes() {
    let
      panes = this.state.panes.toArray()

    return panes.map(function (attributes, i) {
      let body = attributes.body

      return <Pane
        {...attributes}
        key={attributes.paneID}
        onClose={this.closePane.bind(this, i)}
        onMaximize={this.togglePaneMaximization.bind(this, i, attributes)}
        onMinimize={this.minimizePane.bind(this, i)}
        onFocus={this.bringPaneToFront.bind(this, i)}
        position={calculatePanePosition(i)} />
    }.bind(this))
  },

  togglePaneMaximization(index, attributes, event) {
    event.stopPropagation()

    desktopActions.setPaneAttributes(index, {
      maximized: !attributes.maximized
    })
  }

})
