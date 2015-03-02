import React from "react"

import {recordsByList} from "../../resources/users"

export default React.createClass({
  render() {
    return <section data-component="applications/directory">
      {this.renderItems()}
    </section>
  },

  renderItems() {
    return recordsByList.map((item, i) =>
      <div key={i} className="item">
        {item.fullName}
      </div>
    )
  }
})
