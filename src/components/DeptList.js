import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import Dept from './Dept'
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

const level1Panels = [
  { title: 'Level 1A', content: 'Level 1A Contents' },
  { title: 'Level 1B', content: 'Level 1B Contents' },
]

const Level1Content = (
  <div>
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

const level2Panels = [
  { title: 'Level 2A', content: 'Level 2A Contents' },
  { title: 'Level 2B', content: 'Level 2B Contents' },
]

const Level2Content = (
  <div>
    Welcome to level 2
    <Accordion.Accordion panels={level2Panels} />
  </div>
)

const rootPanels = [
  { title: 'Level 1', content: { content: Level1Content, key: 'content-1' } },
  { title: 'Level 2', content: { content: Level2Content, key: 'content-2' } },
]

// const AccordionExampleNested = () => (
//   <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
// )
//
// export default AccordionExampleNested

class DeptList extends Component {

  render() {
    if (this.props.allDeptsQuery && this.props.allDeptsQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.allDeptsQuery && this.props.allDeptsQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const deptsToRender = this.props.allDeptsQuery.allDepts
    // console.log(deptsToRender)
    let newAr = deptsToRender.map((dept, index) => ({title: dept.name, content: { content: (<Dept />), key: 'content-' + index }}))
    // console.log(newAr)

    return (
      <div>
        {/* <Accordion defaultActiveIndex={0} panels={newAr} styled /> */}
        <Accordion exclusive={false} styled
          panels={
            // (deptsToRender.map((dept, index) => ({title: dept.name, content: { content: (<Dept dept={dept}/>), key: 'content-' + index }})))
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
