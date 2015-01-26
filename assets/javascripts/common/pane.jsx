var
  React = require("react"),
  Draggable = require("react-draggable"),
  theme = require("../resources/theme");

var styleRefs = {
  container: {
    "background-color": "black",
    "display": "inline-block",
    "padding": 10,
    "position": "absolute"
  },

  header: {
    "background-color": theme.teal.light
  },

  body: {
    "background-color": "white"
  }
};

var RootHandler = React.createClass({
  displayName: "pane",

  getDefaultProps: function () {
    return {
      title: "Window",
      position: {
        x: 10,
        y: 10
      }
    };
  },

  getInitialState: function () {
    return {
      title: this.props.title,
      position: this.props.position
    };
  },

  render: function () {
    return <Draggable handle=".drag-handle" start={this.state.position}>
      <div style={styleRefs.container}>
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
