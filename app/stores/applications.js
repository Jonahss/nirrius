import Marty from "marty"

export default Marty.createStore({
  getInitialState() {
    return {
      applications: [
        {
          applicationTitle: "Directory",
          body: require("../applications/directory")
        }
      ]
    }
  }
})
