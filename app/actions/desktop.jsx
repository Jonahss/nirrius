import Users from "../resources/users"
import constants from "../constants/desktop"
import Entries from "../applications/entries"
import ErrorPage from "../error-page"
import Marty from "marty"
import React from "react"
import Spectra from "../applications/spectra"
import Directory from "../applications/directory"

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
    return this.dispatch(application)
  }),

  getPaneFromRoute: constants.GET_PANE_FROM_ROUTE(function (username, entryID) {
    let user = Users.recordsByUsername[username]

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
        body: <Entries entries={user.entries} username={username} onNavigate={this.getPaneFromRoute} />
      })
    }
  }),

  loadDefaultApplications: constants.LOAD_DEFAULT_APPLICATIONS(function () {
    this.dispatch([{
      applicationTitle: Directory.applicationTitle,
      body: <Directory items={Users.recordsByList} />
    }])
  }),

  setPaneAttributes: constants.SET_PANE_ATTRIBUTES(function (index, attributes) {
    this.dispatch(index, attributes)
  })
})
