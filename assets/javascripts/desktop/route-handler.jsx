var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var DesktopHandler = React.createClass({
  displayName: "DesktopHandler",

  render: function () {
    return <main data-handler="desktop">
      <RouteHandler />
    </main>;
  }
});

module.exports = DesktopHandler;
