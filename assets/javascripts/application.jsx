var
  React = require("react"),
  ErrorPage = require("./root/error-page"),
  DesktopHandler = require("./desktop/route-handler"),
  Desktop = require("./desktop/desktop"),
  Router = require("react-router"),
  {Route, NotFoundRoute, DefaultRoute} = Router;

var routes = <Route name="root" path="/" handler={DesktopHandler}>
  <DefaultRoute name="desktop" handler={Desktop} />
  <NotFoundRoute name="not-found" handler={ErrorPage} />
</Route>;

document.addEventListener("DOMContentLoaded", function () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    return React.render(<Handler />, document.body);
  });
});
