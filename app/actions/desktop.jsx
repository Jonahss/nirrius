import {recordsByUsername} from "../resources/users"
import constants from "../constants/desktop"
import Entries from "../applications/entries"
import ErrorPage from "../error-page"
import Marty from "marty"
import React from "react"
import Spectra from "../applications/spectra"

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

  getPaneFromApplication: constants.GET_PANE_FROM_APPLICATION(function (application) {
    let Application = application.body

    return this.dispatch({
      applicationTitle: application.applicationTitle,
      contentTitle: application.contentTitle,
      body: <Application />})
  }),

  getPaneFromRoute: constants.GET_PANE_FROM_ROUTE(function (username, entryID) {
    let user = recordsByUsername[username]

    if (typeof user === "undefined") {
      return this.dispatch({
        applicationTitle: "???",
        contentTitle: "SYNCHRONIZE ERROR",
        synchronized: false,
        body: <ErrorPage />
      })
    }

    let entry = user.entries.filter(e => e.id === entryID)[0]

    if (typeof entry !== "undefined") {
      // Show entry.
      this.dispatch({
        prominent: true,
        contentTitle: entry.contentTitle,
        body: <Spectra body={entry.body} />
      })
    } else {
      // Show entries index.
      this.dispatch({
        contentTitle: user.fullName + "'s Holographs",
        body: <Entries entries={user.entries} username={username} onNavigate={this.getPaneFromRoute}/>
      })
    }
  }),

  setPaneAttributes: constants.SET_PANE_ATTRIBUTES(function (index, attributes) {
    this.dispatch(index, attributes)
  })
})
