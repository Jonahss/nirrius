require("./index.styl")

import React from "react"
import Router from "react-router"
import Marty from "marty"
import desktopStore from "../stores/desktop"
import desktopActions from "../actions/desktop"
import Pane from "../common/pane/index.jsx"
import Taskbar from "../common/taskbar/index.jsx"

let desktopStoreState = Marty.createStateMixin(desktopStore)

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
    if (typeof username !== null) {
      desktopActions.getPaneFromRoute(username, entryname)
    }
  },

  closePane(index, event) {
    // Prevent pane rearrangement.
    event.stopPropagation()
    desktopActions.closePane(index)
  },

  getTaskbarItems() {
    let panes = this.state.panes.toArray()

    return panes.map(function (pane, index) {
      let {applicationTitle, contentTitle} = pane

      return {applicationTitle, contentTitle, index}
    })
  },

  render() {
    return <main data-component='desktop'>
      <div className="scanlines"></div>
      {this.renderPanes()}
      <Taskbar items={this.getTaskbarItems()} systemTime={this.state.systemTime} />
    </main>
  },

  renderPanes() {
    let
      panes = this.state.panes.toArray()

    return panes.map(function (attributes, i) {
      let body = attributes.body

      if (typeof attributes.body === "string") {
        // Convert HTML string.
        body = <div dangerouslySetInnerHTML={{__html: attributes.body}} />
      }

      return <Pane
        {...attributes}
        key={attributes.paneID}
        position={calculatePanePosition(i)} // Cascade panes.
        onResize={this.togglePaneMaximization.bind(this, i)}
        onClose={this.closePane.bind(this, i)}
        onFocus={this.bringPaneToFront.bind(this, i)}>
        {body}
      </Pane>
    }.bind(this))
  },

  togglePaneMaximization(index) {
    desktopActions.togglePaneMaximization(index)
  }

})
