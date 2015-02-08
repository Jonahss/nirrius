require("./index.styl")

var
  React = require("react"),
  Marty = require("marty"),
  Pane  = require("../common/pane/index.jsx"),
  desktopStore = require("../stores/desktop"),
  desktopActions = require("../actions/desktop")

var desktopStoreState = Marty.createStateMixin(desktopStore);

var Desktop = React.createClass({
  mixins: [desktopStoreState],

  componentDidMount() {
    [{title: "first", position: {x: 50, y: 60}},
    {title: "second", position: {x: 50, y: 80}},
    {title: "third", position: {x: 200, y: 200}},
    {title: "foo", position: {x: 80, y: 50}},
    {title: "bar", position: {x: 100, y: 200}},
    {title: "fourth", position: {x: 300, y: 300}}].forEach(o => desktopActions.createPane(o));
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
    var self = this

    return this.state.panes.map(function (attributes, i) {
      return <Pane
        {...attributes}
        key={attributes.id}
        onResize={self.togglePaneMaximization.bind(self, i)}
        onClose={self.closePane.bind(self, i)}
        onFocus={self.bringPaneToFront.bind(self, i)}>
        Hello!
      </Pane>
    })
  },

  render() {
    return <main data-component="desktop">
      {this.renderPanes()}
    </main>;
  }
});

module.exports = Desktop;
