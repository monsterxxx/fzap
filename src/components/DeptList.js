import React, { Component } from 'react'

import _ from 'lodash'

import { Accordion, Icon, Button, Segment, Header, Menu } from 'semantic-ui-react'
import ModelList from './ModelList'

class DeptList extends Component {

  state = { activeIndex: [] }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]

    this.setState({ activeIndex: newIndex })
  }

  render() {

    const eachDept = this.props.depts.map((dept, index) => ({
      title: dept.name,
      content: {
        key: dept.id,
        content: (<h4>Hi there!</h4>)
        // content: (<ModelList deptId={dept.id}/>),
      }
    }))

    const { activeIndex } = this.state

    const depts = this.props.depts.map((dept, i) => (
      <Segment key={dept.id}>
        <Accordion.Title
          active={_.includes(activeIndex, i)}
          index={i}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' size='large' />
          <Header size='large' as='span'>{dept.name}</Header>
          {/* <Button icon='plus' size='small' floated='right' /> */}
        </Accordion.Title>
        <Accordion.Content active={_.includes(activeIndex, i)}>
          {dept.id}
        </Accordion.Content>
      </Segment>
    ))

    return (

      <Accordion fluid>
        {depts}
      </Accordion>
      // {/* <Accordion exclusive={false} fluid
      //   panels={
      //     // (deptsToRender.map((dept, index) => ({title: dept.name, content: { content: (<ModelList deptId={dept.id}/>), key: dept.id }})))
      //     (eachDept)
      //   }
      // /> */}
      // {/* <Accordion>
      //     <Accordion.Title className="test2">
      //        <Icon name='dropdown' />
      //        <label className="label-color"> super</label>
      //     </Accordion.Title>
      //     <Accordion.Content>
      //
      //     </Accordion.Content>
      // </Accordion> */}
    )
  }

}

export default DeptList
