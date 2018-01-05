import React, { Component } from 'react'
import { Accordion, List, Header } from 'semantic-ui-react'
import ModelList from './ModelList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'

const ALL_DEPTS_QUERY = gql`
  query AllDeptsQuery {
    allDepts {
      id
      name
      type
    }
  }
`
class DeptList extends Component {
  render() {

    const userId = localStorage.getItem(GC_USER_ID)

    if (!userId) {
      return <Header>Войдите в систему, чтобы продолжить</Header>
    }

    if (this.props.allDeptsQuery && this.props.allDeptsQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.allDeptsQuery && this.props.allDeptsQuery.error) {
      return <div>Ошибка загрузки DeptList. Сообщите Администратору</div>
    }

    const deptsToRender = this.props.allDeptsQuery.allDepts

    return (
      <div>
        <List divided selection relaxed={false}>
          <List.Item icon='marker' content='New York, NY' />
          <List.Item icon='marker' content='New York, NY' />
          <List.Item icon='marker' content='New York, NY' />
        </List>
        <Accordion exclusive={false} fluid
          panels={
            (deptsToRender.map((dept, index) => ({title: dept.name, content: { content: (<ModelList deptId={dept.id}/>), key: dept.id }})))
          }
        />
        {/* {deptsToRender.map(dept => (
          <Dept key={dept.id} dept={dept}/>
        ))} */}
      </div>
    )
  }

}

export default graphql(ALL_DEPTS_QUERY, { name: 'allDeptsQuery' }) (DeptList)
