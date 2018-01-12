import React, { Component } from 'react'
import _ from 'lodash'

import { Accordion, Icon, Segment, Header } from 'semantic-ui-react'
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

    const { activeIndex } = this.state

    const depts = this.props.depts.map((dept, i) => (
      <Segment key={dept.id}>
        <Accordion.Title
          active={_.includes(activeIndex, i)}
          index={i}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' size='large' />
          <Header size='large' as='span'>{dept.name}<span className='fs1-25rem'>{' ('+dept._prodsMeta.count+')'}</span></Header>
          {/* <Button icon='plus' size='small' floated='right' /> */}
        </Accordion.Title>
        <Accordion.Content active={_.includes(activeIndex, i)}>
          <ModelList deptModels={dept.deptModels}/>
        </Accordion.Content>
      </Segment>
    ))

    return (
      <Accordion fluid>
        {depts}
      </Accordion>
    )
  }

}

export default DeptList
