require("./index.styl")

var
  React = require("react"),
  labels = {
    0:  "◷",
    1:  "◴",
    2:  "◴",
    3:  "◷",
    4:  "◶",
    5:  "◵",
    6:  "◶",
    7:  "◵",
    8:  "◷",
    9:  "◷"
  }

module.exports = React.createClass({
  getDefaultProps() {
    return {
      refreshDelay: 3000
    }
  },

  getInitialState() {
    return {
      strength: 1
    }
  },

  componentDidMount() {
    this.interval = setInterval(this.refresh, this.props.refreshDelay)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  refresh() {
    var resynch = Math.random() > (this.state.strength * 0.1)

    if (resynch) {
      this.setState({
        strength: Math.ceil(Math.random() * 10) - 1
      })
    }
  },

  render() {
    return <div data-component="synchronize-bar" data-strength={this.state.strength}>
      <div className="label">{labels[this.state.strength]}</div>
      <div className="bar"></div>
    </div>
  }
})
