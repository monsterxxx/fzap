import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import NavBar from './NavBar'
import DeptList from './DeptList'
import DataLoadErrorMessage from './messages/DataLoadErrorMessage'

const allDeptsQuery = gql`
  query allDeptsQuery {
    allDepts {
      id
      name
      type
      _prodsMeta {
       count
      }
      deptModels {
        model {
          id
          name
        }
        _prodsMeta {
         count
        }
        prods {
          id
          fullnumber
        }
      }
    }
  }
`

class Store extends Component {
  // componentDidMount () {
  //   console.log('componentDidMount > ')
  // }
  // componentWillReceiveProps (nextProps) {
  //   console.log('props > '+ this.props.user)
  //   console.log('nextProps > '+ nextProps.user)
  // }
  render() {

    const userId = this.props.user

    const query = this.props.allDeptsQuery

    return (
      <div>
        <NavBar user={this.props.user} />
        { !userId ? (null) :
          query &&
          query.loading ? <div>Загрузка</div> :
          query.error ? <DataLoadErrorMessage dataTitle='DeptList' /> :
          <DeptList depts={query.allDepts} />
        }
      </div>
    )
  }

}

export default graphql( allDeptsQuery, { 'name': 'allDeptsQuery' } ) (Store)
