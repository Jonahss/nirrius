var
  Marty = require("marty"),
  constants = require("../constants/desktop")

module.exports = Marty.createActionCreators({
  createPane: constants.CREATE_PANE(function (attributes) {
    this.dispatch(attributes)
  }),

  bringPaneToFront: constants.BRING_PANE_TO_FRONT(function (index) {
    this.dispatch(index)
  }),

  closePane: constants.CLOSE_PANE(function (index) {
    this.dispatch(index);
  })
})
