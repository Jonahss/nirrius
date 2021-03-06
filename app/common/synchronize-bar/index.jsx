require("./index.styl")

import React from "react"
import {requestInterval, clearRequestInterval} from "../../helpers/interval-animation"

let labels = {
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

export default React.createClass({
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
    this.interval = requestInterval(this.refresh, this.props.refreshDelay)
  },

  componentWillUnmount() {
    clearRequestInterval(this.interval)
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
      <span className="label">{labels[this.state.strength]}</span>
      <span className="bar"></span>
    </div>
  }
})
