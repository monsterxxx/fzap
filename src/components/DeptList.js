import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import ModelList from './ModelList'

class DeptList extends Component {
  render() {

    const eachDept = this.props.depts.map((dept, index) => ({
      title: dept.name,
      content: {
        key: dept.id,
        content: (<h4>Hi there!</h4>)
        // content: (<ModelList deptId={dept.id}/>),
      }
    }))

    return (
      <Accordion exclusive={false} fluid
        panels={
          // (deptsToRender.map((dept, index) => ({title: dept.name, content: { content: (<ModelList deptId={dept.id}/>), key: dept.id }})))
          (eachDept)
        }
      />
    )
  }

}

export default DeptList
