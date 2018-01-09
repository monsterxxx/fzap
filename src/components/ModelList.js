import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import ProdList from './ProdList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deptModelQuery = gql`
  query deptModelQuery($deptId: ID!) {
    allModels {
      _productsMeta (filter: {
        dept: {
          id: $deptId
        }
      }) {
       count
      }
      id
      name
    }
  }
`

class ModelList extends Component {
  render() {
    if (this.props.deptModelQuery && this.props.deptModelQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.deptModelQuery && this.props.deptModelQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const modelsToRender = this.props.deptModelQuery.allModels;

    return (
        <Accordion exclusive={false} styled
          panels={
            // modelsToRender.map((model, index) => ({title: model.name + ' ('+model._productsMeta.count+')', content:  {content: this.props.deptId, key: 'content-' + index }}))
            (modelsToRender.map((model, index) => ({
              title: model.name + ' ('+model._productsMeta.count+')',
              content: {
                content: (<ProdList deptId={this.props.deptId} modelId={model.id} />),
                key: 'content-' + index
              }
            })))
          }
          ></Accordion>

    )
  }
}

export default graphql(deptModelQuery, { name: 'deptModelQuery' }) (ModelList)