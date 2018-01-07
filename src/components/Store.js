import React, { Component } from 'react'
import DeptList from './DeptList'
import { Header } from 'semantic-ui-react'
import DataLoadErrorMessage from './messages/DataLoadErrorMessage'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { GC_USER_ID } from '../constants'

const AllDeptsQuery = gql`
  query AllDeptsQuery {
    allDepts {
      idn
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
      <DeptList depts={query.allDepts} />
    )
  }

}

export default graphql(AllDeptsQuery, { 'name': 'AllDeptsQuery' }) (Store)

// const ALL_DEPTS_QUERY = gql`
//   query AllDeptsQuery {
//     allDepts {
//       id
//       name
//       type
//     }
//   }
// `
// class Store extends Component {
//   render() {
//
//     const userId = localStorage.getItem(GC_USER_ID)
//
//     if (!userId) {
//       return <Header>Войдите в систему, чтобы продолжить</Header>
//     }
//
//     const query = this.props.AllDeptsQuery
//
//     if (query && query.loading) {
//      return <div>Загрузка</div>
//     }
//
//     if (query && query.error) {
//       return <DataLoadErrorMessage dataTitle='DeptList' />
//     }
//
//     const eachDept = query.allDepts.map((dept, index) => ({
//       title: dept.name,
//       content: {
//         key: dept.id,
//         content: (<h4>Hi there!</h4>)
//         // content: (<ModelList deptId={dept.id}/>),
//       }
//     }))
//
//     return (
//       <DeptList depts={query.allDepts} />
//     )
//   }
//
// }
//
// export default graphql(ALL_DEPTS_QUERY, { name: 'allDeptsQuery' }) (Store)
