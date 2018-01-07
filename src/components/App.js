import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Header from './Header'
import Login from './Login'
import Store from './Store'
import CreateProd from './CreateProd'

class App extends Component {
  render() {
    return (
      <Container text>
        <Header />
        <Switch>

          <Route exact path='/' component={Store}/>
          <Route exact path='/create_prod' component={CreateProd}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </Container>
    );
  }
}

export default App
