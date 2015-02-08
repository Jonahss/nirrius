var
  React = require("react"),
  Marty = require("marty"),
  constants = require("../constants/desktop"),
  usersData = require("../resources/users"),
  Entries = require("../common/entries"),
  ErrorPage = require("../error-page")

module.exports = Marty.createActionCreators({
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

  getPaneFromRoute: constants.GET_PANE_FROM_ROUTE(function (username, entryname) {
    var user = usersData[username]

    if (typeof user === "undefined") {
      return this.dispatch({
        title: "SYNCHRONIZE ERROR",
        synchronized: false,
        body: <ErrorPage />
      })
    }

    var entry = user.entries.filter(e => e.date === entryname)[0]

    // debugger
    if (typeof entry !== "undefined") {
      // Show entry.
      this.dispatch(entry)
    } else {
      // Show entries index.
      this.dispatch({
        title: user.fullName + "'s Holographs",
        body: <Entries entries={user.entries} username={username} onNavigate={this.getPaneFromRoute}/>
      })
    }
  })
})
