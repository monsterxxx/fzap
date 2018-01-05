import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import ProdItem from './ProdItem'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deptModelProdQuery = gql`
  query deptModelProdQuery($deptId: ID!, $modelId: ID!) {
    allProds (filter: {
      dept: {
        id: $deptId
      }
      model: {
        id: $modelId
      }
    }) {
      id
      fullnumber
    }
  }
`

class ProdList extends Component {
  render() {

      if (this.props.deptModelProdQuery && this.props.deptModelProdQuery.loading) {
        return <div>Загрузка</div>
      }

      if (this.props.deptModelProdQuery && this.props.deptModelProdQuery.error) {

        return <div>Ошибка загрузки ProdList. Сообщите Администратору</div>
      }

    const prodsToRender = this.props.deptModelProdQuery.allProds;

    return (
      // <List items={
      //   prodsToRender.map((prod) => prod.fullnumber)
      // } />
      // <List>
      // <List divided selection>
      <List divided selection size='medium'>
        {prodsToRender.map((prod) => <ProdItem title={prod.fullnumber} key={prod.id}/>)}
      </List>
    )
  }
}

export default graphql(deptModelProdQuery, { name: 'deptModelProdQuery' }) (ProdList)
