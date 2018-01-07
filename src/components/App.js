import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import NavBar from './NavBar'
import Login from './Login'
import Store from './Store'
import CreateProd from './CreateProd'

import { GC_USER_ID } from '../constants'

class App extends Component {
  render() {

    const userId = localStorage.getItem(GC_USER_ID)

    // const user = {
    //   id: userId
    // }

    return (
      <Container text>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path='/' render={(props) => ( <Store user={userId} /> )} />
          <Route exact path='/create_prod' component={CreateProd}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </Container>
    )
  }
}

export default App
