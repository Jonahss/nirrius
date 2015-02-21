require("./index.styl")

let
  React = require("react"),
  Router = require("react-router"),
  Marty = require("marty"),
  Pane  = require("../common/pane/index.jsx"),
  desktopStore = require("../stores/desktop"),
  desktopActions = require("../actions/desktop"),
  desktopStoreState = Marty.createStateMixin(desktopStore);

module.exports = React.createClass({
  mixins: [Router.State, desktopStoreState],

  componentDidMount() {
    let {username, entryname} = this.getParams()
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
    let panes = []

    this.state.panes.forEach(function (attributes, i) {
      let body = attributes.body

      if (typeof attributes.body === "string") {
        body = <div dangerouslySetInnerHTML={{__html: attributes.body}} />
      }

      panes.push(<Pane
        {...attributes}
        key={attributes.paneID}
        position={{x: (i + 1) * 20, y: (i + 1) * 25}}
        onResize={this.togglePaneMaximization.bind(this, i)}
        onClose={this.closePane.bind(this, i)}
        onFocus={this.bringPaneToFront.bind(this, i)}>
        {body}
      </Pane>)
    }.bind(this))
    return panes
  },

  render() {
    return <main data-component='desktop'>
      <div className="scanlines"></div>
      {this.renderPanes()}
    </main>;
  }
});
