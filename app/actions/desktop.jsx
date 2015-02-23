import React from "react"
import Marty from "marty"
import constants from "../constants/desktop"
import usersData from "../resources/users"
import Entries from "../common/entries"
import ErrorPage from "../error-page"

export default Marty.createActionCreators({
  createPane: constants.CREATE_PANE(function (attributes) {
    this.dispatch(attributes)
  }),

  bringPaneToFront: constants.BRING_PANE_TO_FRONT(function (index) {
    this.dispatch(index)
  }),

  closePane: constants.CLOSE_PANE(function (index) {
    this.dispatch(index)
  }),

  togglePaneMaximization: constants.TOGGLE_PANE_MAXIMIZATION(function (index) {
    this.dispatch(index)
  }),

  getPaneFromRoute: constants.GET_PANE_FROM_ROUTE(function (username, entryID) {
    let user = usersData[username]

    if (typeof user === "undefined") {
      return this.dispatch({
        title: "SYNCHRONIZE ERROR",
        synchronized: false,
        body: <ErrorPage />
      })
    }

    let entry = user.entries.filter(e => e.id === entryID)[0]

    if (typeof entry !== "undefined") {
      // Show entry.
      this.dispatch(entry)
    } else {
      // Show entries index.
      this.dispatch({
        contentTitle: user.fullName + "'s Holographs",
        body: <Entries entries={user.entries} username={username} onNavigate={this.getPaneFromRoute}/>
      })
    }
  })
})
