import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import ModelList from './ModelList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

    if (this.props.allDeptsQuery && this.props.allDeptsQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.allDeptsQuery && this.props.allDeptsQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const deptsToRender = this.props.allDeptsQuery.allDepts

    return (
      <div>
        <Accordion exclusive={false} styled
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
