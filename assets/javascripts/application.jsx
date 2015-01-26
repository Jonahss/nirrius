var
  React = require("react"),
  RootHandler = require("./root/route-handler"),
  DesktopHandler = require("./desktop/route-handler"),
  Desktop = require("./desktop/desktop"),

  Router = require("react-router"),
  Routes = Router.Routes,
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  DefaultRoute = Router.DefaultRoute;

var routes = <Route name="root" path="/" handler={RootHandler}>
  <DefaultRoute name="desktop" handler={Desktop} />
</Route>;

document.addEventListener("DOMContentLoaded", function () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    return React.render(<Handler />, document.body);
  });
});
