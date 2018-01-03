import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Login from './Login'
import LinkList from './LinkList'
import DeptList from './DeptList'
import CreateLink from './CreateLink'
import CreateProd from './CreateProd'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/' component={DeptList}/>
            <Route exact path='/create' component={CreateLink}/>
            <Route exact path='/create_prod' component={CreateProd}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App