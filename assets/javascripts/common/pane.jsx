var
  React = require("react"),
  Draggable = require("react-draggable"),
  theme = require("../resources/theme");

var styleRefs = {
  container: {
    backgroundColor: "black",
    display: "inline-block",
    padding: 10,
    position: "absolute"
  },

  header: {
    backgroundColor: theme.teal.light
  },

  body: {
    backgroundColor: "white"
  }
};

var RootHandler = React.createClass({
  displayName: "pane",

  getDefaultProps() {
    return {
      title: "Window",
      position: {
        x: 10,
        y: 10
      }
    };
  },

  getInitialState() {
    return {
      title: this.props.title,
      position: this.props.position
    };
  },

  render() {
    return <Draggable handle=".drag-handle" start={this.state.position} onStart={this.props.onFocus}>
      <div style={styleRefs.container} onClick={this.props.onFocus}>
        <header className="drag-handle" style={styleRefs.header}>
          {this.state.title}
        </header>

        <section style={styleRefs.body}>
          {this.props.children}
        </section>
      </div>
    </Draggable>;
  }
});

module.exports = RootHandler;
