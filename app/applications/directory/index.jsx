import React from "react"
import desktopActions from "../../actions/desktop"

export default React.createClass({
  getDefaultProps() {
    return {
      items: []
    }
  },

  openUser(user, event) {
    event.stopPropagation()
    desktopActions.getPaneFromRoute(user.username)
  },

  render() {
    return <section data-component="applications/directory">
      <h1>Users</h1>

      {this.renderItems()}
    </section>
  },

  renderItems() {
    return this.props.items.map((item, i) =>
      <div key={i} className="link item" onClick={this.openUser.bind(this, item)}>
        {item.fullName}
      </div>
    )
  },

  statics: {
    applicationTitle: "Directory"
  }
})
