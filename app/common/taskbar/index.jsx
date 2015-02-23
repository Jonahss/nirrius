require("./index.styl")

import React from "react"
import moment from "moment"
import desktopActions from "../../actions/desktop"
import {requestInterval, clearRequestInterval} from "../../helpers/interval-animation"

const datetimeFormat = "YYYY-MM-DD HH:ss:SSSS"

export default React.createClass({
  bringPaneToFront(index) {
    desktopActions.bringPaneToFront(index)
  },

 componentDidMount() {
    this.interval = requestInterval(this.updateClock, 1000)
  },

  componentWillUnmount() {
    clearRequestInterval(this.interval)
  },

  getDefaultProps() {
    return {
      items: [],
      systemTime: Date.now()
    }
  },

  getInitialState() {
    return {
      systemTime: moment(this.props.systemTime)
    }
  },

  renderClock() {
    return <div className="clock">
      {this.state.systemTime.format(datetimeFormat)}
    </div>
  },

  renderItems() {
    let {items} = this.props

    return items.map((item, i) =>
      <div
        className="task-item"
        key={i}
        onClick={this.bringPaneToFront.bind(this, i)}>
        <span className="inner">{item.contentTitle}</span>
      </div>
    ).reverse()
  },

  render() {
    return <section data-component="taskbar">
      <section className="tasks">
        {this.renderItems()}
      </section>

      <aside className="secondary-information">
        {this.renderClock()}
      </aside>
    </section>
  },

  updateClock() {
    console.debug("updating")
    this.setState({
      systemTime: this.state.systemTime.add(1)
    })
  }
})
