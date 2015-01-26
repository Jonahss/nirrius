var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var RootHandler = React.createClass({
  displayName: "RootHandler",

  render: function () {
    return <main data-handler="root">
      <RouteHandler />
    </main>;
  }
});

module.exports = RootHandler;
