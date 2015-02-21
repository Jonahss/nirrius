"use strict"

require("./index.styl")

let
  React = require("react"),
  ErrorPage = require("./error-page"),
  Desktop = require("./desktop"),
  DesktopHandler = require("./desktop/route-handler"),
  UsersHandler = require("./users/route-handler"),
  Router = require("react-router"),
  {Route, NotFoundRoute, DefaultRoute} = Router

let routes = <Route name="root" path="/" handler={DesktopHandler}>
  <DefaultRoute name="default-desktop" handler={Desktop} />

  <Route name="users" path="/~:username/?:entryname?" handler={UsersHandler}>
    <DefaultRoute name="user-desktop" handler={Desktop} />
  </Route>

  <NotFoundRoute name="not-found" handler={ErrorPage} />
</Route>

document.addEventListener("DOMContentLoaded", () =>
  Router.run(routes, Router.HistoryLocation, (Handler) =>
    React.render(<Handler />, document.body)
  )
)
