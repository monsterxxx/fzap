import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class ProdItem extends Component {
  render() {
    return (
      // <List.Item as='a' onClick={(e, data) => {console.log(data);}}>
      //   {/* <List.Content> */}
      //     <List.Content floated='left'>
      //       <List.Icon name='square outline' size='large' verticalAlign='middle'/>
      //
      //     </List.Content>
      //     <List.Content verticalAlign='middle' content={this.props.title}>
      //       {/* <List.Header></List.Header>
      //         <List.Description>
      //         This text will always have a left margin to make sure it sits alongside your icon
      //       </List.Description> */}
      //     </List.Content>
      //
      //   {/* </List.Content> */}
      // </List.Item>
      // <List.Item icon='marker' content='New York, NY' />
      <List.Item>
        <List.Icon name='square outline' verticalAlign='middle' />
        <List.Content>
          {this.props.title}
        </List.Content>
      </List.Item>
    )
  }
}

export default ProdItem
