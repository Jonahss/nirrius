require("./index.styl")

var React = require("react")
module.exports = React.createClass({
  getDefaultProps() {
    return {
      entries: []
    }
  },

  handleNavigate(params, event) {
    event.stopPropagation()
    this.props.onNavigate(params.username, params.entryname)
  },

  render() {
    var
      props = this.props,
      entries = props.entries.map((entry, i) =>
      <li
        key={i}
        onClick={this.handleNavigate.bind(this, {
          username: props.username,
          entryname: entry.date
        })}>
        {entry.title}
      </li>
    )

    return <ol data-component="entries">
      {entries}
    </ol>
  }
})
