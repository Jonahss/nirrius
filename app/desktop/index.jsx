require("./index.styl")

var
  React = require("react"),
  Router = require("react-router"),
  Marty = require("marty"),
  Pane  = require("../common/pane/index.jsx"),
  desktopStore = require("../stores/desktop"),
  desktopActions = require("../actions/desktop")

var desktopStoreState = Marty.createStateMixin(desktopStore);

module.exports = React.createClass({
  mixins: [Router.State, desktopStoreState],

  componentDidMount() {
    var {username, entryname} = this.getParams()
    if (typeof username !== null) {
      desktopActions.getPaneFromRoute(username, entryname)
    }
  },

  bringPaneToFront(index) {
    desktopActions.bringPaneToFront(index);
  },

  closePane(index, event) {
    // Prevent pane rearrangement.
    event.stopPropagation()
    desktopActions.closePane(index)
  },

  togglePaneMaximization(index) {
    desktopActions.togglePaneMaximization(index)
  },

  renderPanes() {
    var
      _this = this,
      panes = []

    this.state.panes.forEach(function (attributes, i) {
      var body = attributes.body

      if (typeof attributes.body === "string") {
        body = <div dangerouslySetInnerHTML={{__html: attributes.body}} />
      }

      panes.push(<Pane
        {...attributes}
        key={attributes.paneID}
        position={{x: (i + 1) * 20, y: (i + 1) * 20}}
        onResize={_this.togglePaneMaximization.bind(_this, i)}
        onClose={_this.closePane.bind(_this, i)}
        onFocus={_this.bringPaneToFront.bind(_this, i)}>
        {body}
      </Pane>)
    })
    return panes
  },

  render() {
    return <main data-component="desktop">
      {this.renderPanes()}
    </main>;
  }
});
