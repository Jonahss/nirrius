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
    this.props.onNavigate(params.username, params.entryID)
  },

  render() {
    return <ol data-component="entries">
      {this.renderEntries()}
    </ol>
  },

  renderEntries() {
    return this.props.entries.map((entry, i) =>
      <li key={i}>
        <span className="link"
          onClick={this.handleNavigate.bind(this, {
          username: this.props.username,
          entryID: entry.id
        })}>{entry.contentTitle}</span>
      </li>
    )
  }
})
