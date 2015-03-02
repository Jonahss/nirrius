"use strict"

import React from "react"
import Desktop from "./desktop"
import DesktopHandler from "./desktop/route-handler"
import ErrorPage from "./error-page"
import UsersHandler from "./users/route-handler"
import {Route, NotFoundRoute, DefaultRoute} from "react-router"

let routes = <Route name="root" path="/" handler={DesktopHandler}>
  <DefaultRoute name="default-desktop" handler={Desktop} />

  <Route name="users" path="/~:username/?:entryname?" handler={UsersHandler}>
    <DefaultRoute name="user-desktop" handler={Desktop} />
  </Route>

  <NotFoundRoute name="not-found" handler={ErrorPage} />
</Route>

export default routes
