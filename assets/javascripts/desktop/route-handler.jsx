var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var DesktopHandler = React.createClass({
  displayName: "DesktopHandler",

  render: function () {
    return <div data-handler="desktop">
      <RouteHandler />
    </div>;
  }
});

module.exports = DesktopHandler;
