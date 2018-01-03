import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
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
      number
    }
  }
`

class ProdList extends Component {
  render() {
    if (this.props.deptModelProdQuery && this.props.deptModelProdQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.deptModelProdQuery && this.props.deptModelProdQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const prodsToRender = this.props.deptModelProdQuery.allProds;

    return (
      // <List items={['Apples', 'Pears', 'Oranges']} />
      <List devided items={
        prodsToRender.map((prod) => prod.number)
      } />
    )
  }
}

export default graphql(deptModelProdQuery, { name: 'deptModelProdQuery' }) (ProdList)
