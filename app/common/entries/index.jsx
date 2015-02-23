require("./index.styl")

import React from "react"

export default React.createClass({
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
    let
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
