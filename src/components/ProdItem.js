import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class ProdItem extends Component {
  state = {
    checked: false
  }

  render() {
    const {checked} = this.state

    this.handleClick = (e, d) => {
      console.log(d)
      this.setState({checked: !checked})
    }

    return (
      <List.Item onClick={this.handleClick} active={checked}>
        <List.Icon name={checked ? 'checkmark box' : 'square outline'} />
        <List.Content>
          {this.props.title}
        </List.Content>
      </List.Item>
    )
  }
}

export default ProdItem
