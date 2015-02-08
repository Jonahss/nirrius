require("./index.styl")

var
  React = require("react/addons"),
  SynchronizeBar = require("../synchronize-bar"),
  {classSet} = React.addons,
  Draggable = require("react-draggable")

module.exports = React.createClass({
  displayName: "pane",

  getDefaultProps() {
    return {
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
    return <Draggable handle="[data-handle]" start={this.state.position} onStart={this.props.onFocus}>
      <div data-component="pane" className={classSet({maximized: this.props.maximized})} onClick={this.props.onFocus}>
        <header>
          <div data-handle className="primary-details">
            <div data-handle className="title">{this.state.title}</div>
          </div>

          <div className="actions">
            <span onClick={this.props.onMinimize} className="action">▿</span>
            <span onClick={this.props.onResize} className="action">❏</span>
            <span onClick={this.props.onClose} className="action">╳</span>
          </div>
        </header>

        <section className="body">
          {this.props.children}
        </section>

        <footer className="connection-status">
          <SynchronizeBar />
        </footer>
      </div>
    </Draggable>
  }
})
