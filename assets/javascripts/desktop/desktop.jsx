var
  React = require("react"),
  Marty = require("marty"),
  Pane  = require("../common/pane"),
  desktopStore = require("../stores/desktop"),
  desktopActions = require("../actions/desktop");

var desktopStoreState = Marty.createStateMixin(desktopStore);

var Desktop = React.createClass({
  mixins: [desktopStoreState],

  styleRefs: {
    container: {
      "position": "relative"
    }
  },

  componentDidMount() {
    [{title: "first", position: {x: 50, y: 60}},
    {title: "second", position: {x: 50, y: 80}},
    {title: "third", position: {x: 200, y: 200}},
    {title: "fourth", position: {x: 300, y: 300}}].forEach(o => desktopActions.createPane(o));
  },

  bringPaneToFront(index) {
    desktopActions.bringPaneToFront(index);
  },

  renderPanes() {
    var panes = [];
    for (var i = 0; i < this.state.panes.size; i++) {
      var attributes = this.state.panes.get(i);
      panes.push(<Pane {...attributes} key={attributes.id} onFocus={this.bringPaneToFront.bind(this, i)}>
        Hello!
      </Pane>);
    }

    return panes;
  },

  render() {
    return <main style={this.container}>
      {this.renderPanes()}
    </main>;
  }
});

module.exports = Desktop;
