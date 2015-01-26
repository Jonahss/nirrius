var React = require("react");

var styleRefs = {
  "container": {
    "display": "block",
    "background-color": "black",
    "color": "white",
    "height": "100%"
  }
};

var RootHandler = React.createClass({
  displayName: "error-page",


  render: function () {
    return <div style={styleRefs.container}>
      ERROR!
    </div>;
  }
});

module.exports = RootHandler;
