require("./index.styl")

import React from "react"
import desktopActions from "../actions/desktop"

export default React.createClass({
  getDefaultProps() {
    return {
      items: []
    }
  },

  openApplication(item) {
    desktopActions.getPaneFromApplication(item)
  },

  render() {
    return <section data-component="applications">
      {this.renderItems()}
    </section>
  },

  renderItems() {
    return this.props.items.map((item, i) =>
      <div
        key={i}
        className="item"
        data-application={item.applicationTitle}
        onClick={this.openApplication.bind(this, item)}>
        <div className="icon">
          <span className="icon-letter">
            {item.applicationTitle.substring(0, 1)}
          </span>
        </div>

        <span className="title">
          {item.applicationTitle}
        </span>
      </div>
    )
  }
})
