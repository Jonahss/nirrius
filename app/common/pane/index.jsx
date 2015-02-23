require("./index.styl")

import React from "react/addons"
import SynchronizeBar from "../synchronize-bar"
import Draggable from "react-draggable"

let {classSet} = React.addons

export default React.createClass({

  getDefaultProps() {
    return {
      synchronized: true,
      applicationTitle: "Spectra",
      maximized: false,
      position: {
        x: 10,
        y: 10
      }
    }
  },

  getTitle() {
    let {applicationTitle, contentTitle} = this.props

    if (contentTitle) {
      return `${applicationTitle.toUpperCase()} ☞ ${contentTitle}`
    } else {
      return applicationTitle
    }
  },

  getInitialState() {
    return {
      title: this.props.title,
      position: this.props.position
    }
  },

  render() {
    return <Draggable
      handle="[data-component='pane']:not(.maximized) [data-handle]"
      start={this.state.position}
      onStart={this.props.onFocus}>
      <div
        data-component="pane"
        className={classSet({maximized: this.props.maximized})}
        onClick={this.props.onFocus}>
        <header>
          <div data-handle className="primary-details">
            <span data-handle className="title">{this.getTitle()}</span>
          </div>

          <aside className="actions">
            <span onClick={this.props.onMinimize} className="action">▿</span>
            <span onClick={this.props.onResize} className="action">❏</span>
            <span onClick={this.props.onClose} className="action">╳</span>
          </aside>
        </header>

        <section data-selectable className="body">
          {this.props.children}
        </section>

        <footer className="connection-status">
          <SynchronizeBar refreshDelay={this.props.synchronized ? 3000 : 100} />
        </footer>
      </div>
    </Draggable>
  }
})
