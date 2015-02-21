require("./index.styl")

let
  React = require("react/addons"),
  SynchronizeBar = require("../synchronize-bar"),
  {classSet} = React.addons,
  Draggable = require("react-draggable")

module.exports = React.createClass({

  getDefaultProps() {
    return {
      synchronized: true,
      title: "Window",
      maximized: false,
      position: {
        x: 10,
        y: 10
      }
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
            <span data-handle className="title">{this.state.title}</span>
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
