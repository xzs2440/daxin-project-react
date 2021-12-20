import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './views/login/index'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
