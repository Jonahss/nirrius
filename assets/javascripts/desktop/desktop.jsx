var
  React = require("react"),
  Pane  = require("../common/pane");

var Desktop = React.createClass({
  displayName: "Desktop",

  styleRefs: {
    container: {
      "position": "relative"
    }
  },

  render: function () {
    return <main style={this.container}>
      HELLO WORLD
      <Pane>
        hello
      </Pane>
    </main>;
  }
});

module.exports = Desktop;
