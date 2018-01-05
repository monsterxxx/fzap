import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Header extends Component {

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div className='flex pa1 justify-between nowrap green'>
        <div className='flex flex-fixed white'>
          <div className='fw7 mr1'>KOMZ.net</div>
          <Link to='/' className='ml3 no-underline white'>Запасы</Link>
          <Link to='/' className='ml3 no-underline white'>Перемещения</Link>
          {userId &&
          <div className='flex'>
            <Link to='/create_prod' className='ml3 no-underline white'>Добавить втулку</Link>
          </div>
          }
        </div>
        <div className='flex flex-fixed'>
          {userId ?
            <div className='ml3 mr3 pointer white' onClick={() => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              this.props.history.push(`/new/1`)
            }}>{userId} Выход</div>
            :
            <Link to='/login' className='ml3 mr3 no-underline white'>Вход</Link>
          }
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
