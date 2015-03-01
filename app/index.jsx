"use strict"

require("./index.styl")

import React from "react"
import ErrorPage from "./error-page"
import Desktop from "./desktop"
import DesktopHandler from "./desktop/route-handler"
import UsersHandler from "./users/route-handler"
import Router from "react-router"

let link   = document.createElement("link")
link.type  = "image/x-icon"
link.rel   = "shortcut icon"
link.sizes = "16x16"
link.href  = require("../assets/images/floppy.png")
document.querySelector("head").appendChild(link)

let
  {Route, NotFoundRoute, DefaultRoute} = Router,
  routes

routes = <Route name="root" path="/" handler={DesktopHandler}>
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
