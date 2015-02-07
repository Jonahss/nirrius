require("./index.styl")

var
  React = require("react"),
  ErrorPage = require("./root/error-page"),
  Desktop = require("./desktop"),
  DesktopHandler = require("./desktop/route-handler"),
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
