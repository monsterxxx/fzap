import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`

class LinkList extends Component {

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const linksToRender = this.props.allLinksQuery.allLinks

    return (
      <div>
        {linksToRender.map(link => (
          <Link key={link.id} link={link}/>
        ))}
      </div>
    )
  }

}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)
