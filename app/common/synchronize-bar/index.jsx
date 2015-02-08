require("./index.styl")

var
  React = require("react"),
  labels = {
    1:  "◷",
    2:  "◴",
    3:  "◴",
    4:  "◷",
    5:  "◶",
    6:  "◵",
    7:  "◶",
    8:  "◵",
    9:  "◷",
    10: "◷"
  }

module.exports = React.createClass({
  getDefaultProps() {
    return {
      refreshDelay: 3000
    }
  },

  componentDidMount() {
    this.interval = setInterval(this.refresh, this.props.refreshDelay)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  refresh() {
    this.forceUpdate()
  },

  render() {
    var strength = Math.ceil(Math.random() * 10)

    return <div data-component="synchronize-bar" data-strength={strength}>
      <div className="label">{labels[strength]}</div>
      <div className="bar"></div>
    </div>
  }
})
