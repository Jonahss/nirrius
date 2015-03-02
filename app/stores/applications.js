import Marty from "marty"

export default Marty.createStore({
  getInitialState() {
    return {
      applications: [
        {
          applicationTitle: "Directory",
          body: require("../common/applications/directory")
        }
      ]
    }
  }
})
