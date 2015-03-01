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
    return <section data-component="entries">
     {this.renderTable()}
    </section>
  },

  renderEntries() {
    return this.props.entries.map((entry, i) =>
      <tr key={i}>
        <td className="entry-number">{i + 1}.</td>
        <td className="entry">
          <span className="link"
            onClick={this.handleNavigate.bind(this, {
              username: this.props.username,
              entryID: entry.id
            })}>
            {entry.contentTitle}
          </span>
        </td>
      </tr>
    )
  },

  renderTable() {
    return <table>
      <thead>
        <th className='entry-number'>№</th>
        <th>Entry</th>
      </thead>

      <tbody>
        {this.renderEntries()}
      </tbody>
    </table>
  }
})
