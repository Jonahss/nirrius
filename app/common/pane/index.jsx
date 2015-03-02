require("./index.styl")

import React from "react"
import SynchronizeBar from "../synchronize-bar"
import Draggable from "react-draggable"
import classnames from "classnames"

const DRAGGING_CLASS = "dragging"

export default React.createClass({

  getDefaultProps() {
    return {
      applicationTitle: "Spectra",
      maximized: false,
      position: {
        x: 10,
        y: 10
      },
      synchronized: true
    }
  },

  getTitle() {
    let {applicationTitle, contentTitle} = this.props

    if (contentTitle) {
      return `${applicationTitle.toUpperCase()} ☞ ${contentTitle}`
    } else {
      return applicationTitle.toUpperCase()
    }
  },

  getInitialState() {
    return {
      position: this.props.position
    }
  },

  handleDragStart() {
    document.body.classList.add(DRAGGING_CLASS)
    this.props.onFocus()
  },

  handleDragStop() {
    document.body.classList.remove(DRAGGING_CLASS)
  },

  render() {
    let props = this.props

    return <Draggable
      handle="[data-component='pane']:not(.maximized) [data-handle]"
      start={this.state.position}
      onStart={this.handleDragStart}
      onStop={this.handleDragStop}>
      <div
        data-component="pane"
        className={classnames({
          maximized: props.maximized,
          minimized: props.minimized
        })}
        onClick={props.onFocus}>
        <header>
          <div data-handle className="primary-details" onDoubleClick={props.onMaximize}>
            <span data-handle className="title">{this.getTitle()}</span>
          </div>

          <aside className="actions">
            <span onClick={props.onMinimize} className="action">_</span>
            <span onClick={props.onMaximize} className="action">❏</span>
            <span onClick={props.onClose} className="action">×</span>
          </aside>
        </header>

        <section className="body">
          {props.children}
        </section>

        <footer className="connection-status">
          <SynchronizeBar refreshDelay={props.synchronized ? 3000 : 100} />
        </footer>
      </div>
    </Draggable>
  }
})
