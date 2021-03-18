import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/main.css"
import CatsIndex from "./CatsIndex"
import CatShow from "./CatShow"
import NewCatForm from "./NewCatForm"

const App = (props) => {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CatsIndex} />
          <Route exact path="/cats" component={CatsIndex} />
          <Route exact path="/cats/new" component={NewCatForm} />
          <Route exact path="/cats/:id" component={CatShow} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default hot(App)
