import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Header extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <Menu inverted>
        <Menu.Item header>KOMZ</Menu.Item>
        {userId &&
          <Menu.Menu>
            <Menu.Item icon name='home' as={ NavLink } exact to='/' color='grey'>
              <Icon name='home' />
            </Menu.Item>
            <Menu.Item icon name='createProd' as={ NavLink } exact to='/create_prod' color='grey'>
              <Icon name='plus' />
            </Menu.Item>
          </Menu.Menu>
        }
        <Menu.Menu position='right'>
          {userId ?
            <Menu.Item name='Выход' onClick={() => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              this.props.history.push(`/`)
            }} />
            :
            <Menu.Item name='Вход' as={ NavLink } exact to='/login' color='grey' />
          }
        </Menu.Menu>
      </Menu>
    )
  }

}

export default withRouter(Header)
