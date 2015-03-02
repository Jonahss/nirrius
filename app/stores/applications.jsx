import Directory from "../applications/directory"
import Marty from "marty"
import React from "react"
import Users from "../resources/users"

export default Marty.createStore({
  getInitialState() {
    return {
      applications: [
        {
          applicationTitle: Directory.applicationTitle,
          body: <Directory items={Users.recordsByList} />
        }
      ]
    }
  }
})
