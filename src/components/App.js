import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Header from './Header'
import Login from './Login'
import DeptList from './DeptList'
import CreateProd from './CreateProd'

class App extends Component {
  render() {
    return (
      <Container text>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/' component={DeptList}/>
            <Route exact path='/create_prod' component={CreateProd}/>
          </Switch>
        </div>
      </Container>
    );
  }
}

export default App
