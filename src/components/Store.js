import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Header } from 'semantic-ui-react'

import NavBar from './NavBar'
import DeptList from './DeptList'
import DataLoadErrorMessage from './messages/DataLoadErrorMessage'

import { GC_USER_ID } from '../constants'

const AllDeptsQuery = gql`
  query AllDeptsQuery {
    allDepts {
      id
      name
      type
    }
  }
`

class Store extends Component {
  render() {

    const userId = localStorage.getItem(GC_USER_ID)

    if (!userId) {
      return <Header>Войдите в систему, чтобы продолжить</Header>
    }

    const query = this.props.AllDeptsQuery

    if (query && query.loading) {
     return <div>Загрузка</div>
    }

    if (query && query.error) {
      return <DataLoadErrorMessage dataTitle='DeptList' />
    }

    return (
      <div>
        <NavBar user={this.props.user} />
        <DeptList depts={query.allDepts} />
      </div>
    )
  }

}

export default graphql(AllDeptsQuery, { 'name': 'AllDeptsQuery' }) (Store)
