import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import { Menu, Icon, Message, Modal } from 'semantic-ui-react'

import CreateProdModal from './CreateProdModal'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class NavBar extends Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      // <Menu fixed='top' inverted className='addclass'>
      <div>
        <Menu size='large' inverted >
          {/* <Container text> */}
          <Menu.Item header>KOMZ</Menu.Item>
          {this.props.user &&
            <Menu.Menu>
              <Menu.Item icon name='home' as={ NavLink } exact to='/' color='grey'>
                <Icon name='home' />
              </Menu.Item>
              <Menu.Item icon name='createProd' as={ NavLink } exact to='/create_prod' color='grey'>
                <Icon name='plus' />
              </Menu.Item>
              <Menu.Item icon link name='create' color='grey'>
                <CreateProdModal />

              </Menu.Item>
            </Menu.Menu>
          }
          <Menu.Menu position='right'>
            {this.props.user ?
              <Menu.Item name='Выход' onClick={() => {
                localStorage.removeItem(GC_USER_ID)
                localStorage.removeItem(GC_AUTH_TOKEN)
                this.props.history.push(`/`)
              }} />
              :
              <Menu.Item name='Вход' as={ NavLink } exact to='/login' color='grey' />
            }
          </Menu.Menu>
          {/* </Container> */}
        </Menu>
        {!this.props.user &&
          <Message warning>Войдите в систему, чтобы продолжить</Message>
        }
      </div>


    )
  }

}

export default withRouter(NavBar)
