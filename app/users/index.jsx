require("./index.styl")

var React = require("react")

module.exports = React.createClass({
  render() {
    return <div data-component="error-page">
      <header>ERROR!</header>
    </div>
  }
})
