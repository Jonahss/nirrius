import React from "react"

export default React.createClass({
  getDefaultProps() {
    return {
      body: ""
    }
  },

  render() {
    return <section
      data-component="applications/spectra"
      dangerouslySetInnerHTML={{
        __html: this.props.body
      }}
      data-selectable
    />
  }
})
