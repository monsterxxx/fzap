import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import _ from 'lodash'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_PRODS_QUERY = gql`
  query AllProdsQuery {
    allProds {
      id
      createdBy {
        id
      }
      dept {
        id
        name
      }
      model {
        id
        name
      }
      melt
      meltShift
      number
      year
    }
  }
`

let newAr = [
      {
        "number": 1,
        "model": {
          "id": "cjbp79sup23lo0162lotj4pc6",
          "name": "Втулка NVD 48 A2U"
        },
        "year": 17,
        "dept": {
          "id": "cjbnj9fft1flc0162bk4freey",
          "name": "КОМЗ"
        },
        "id": "cjbq9u6yyog5f0191kl5k31ul",
        "meltShift": 1,
        "createdBy": {
          "id": "cjbnrsivxqrgl0114jm1fdltv"
        },
        "melt": 1
      },
      {
        "number": 2,
        "model": {
          "id": "cjbp79sup23lo0162lotj4pc6",
          "name": "Втулка NVD 48 A2U"
        },
        "year": 17,
        "dept": {
          "id": "cjbnj9fft1flc0162bk4freey",
          "name": "КОМЗ"
        },
        "id": "cjbq9wgc4ocx60143o3eyxl4y",
        "meltShift": 2,
        "createdBy": {
          "id": "cjbnrsivxqrgl0114jm1fdltv"
        },
        "melt": 1
      },
      {
        "number": 1,
        "model": {
          "id": "cjbp7a6p4232o0147t5yeyb6u",
          "name": "Крышка Г60"
        },
        "year": 17,
        "dept": {
          "id": "cjbnj9fft1flc0162bk4freey",
          "name": "КОМЗ"
        },
        "id": "cjbqaa8kwonzb0180iczmmu43",
        "meltShift": 1,
        "createdBy": {
          "id": "cjbnrsivxqrgl0114jm1fdltv"
        },
        "melt": 2
      },
      {
        "number": 2,
        "model": {
          "id": "cjbp7a6p4232o0147t5yeyb6u",
          "name": "Крышка Г60"
        },
        "year": 17,
        "dept": {
          "id": "cjbnj9fft1flc0162bk4freey",
          "name": "КОМЗ"
        },
        "id": "cjbqaanxsdyyt0102vabiyfya",
        "meltShift": 2,
        "createdBy": {
          "id": "cjbnrsivxqrgl0114jm1fdltv"
        },
        "melt": 2
      }
    ]

// console.log(_.groupBy([6.1, 4.2, 6.3], Math.floor))

let groupObj = _.groupBy(newAr, 'model.id')
let groupObj1 = _.keyBy(newAr,' model')

// console.log(groupObj)
// console.log(groupObj1)
// console.log(groupObj.keys)
// console.log([ ...groupObj.keys() ])

class Dept extends Component {

  render() {
    if (this.props.allProdsQuery && this.props.allProdsQuery.loading) {
     return <div>Загрузка</div>
    }

    if (this.props.allProdsQuery && this.props.allProdsQuery.error) {
      return <div>Ошибка. Сообщите Администратору</div>
    }

    const prodsToRender = this.props.allProdsQuery.allProds

    // console.log(prodsToRender)


    return (
      <div>
        <div><span className="b">► КОМЗ</span> ({this.props.dept.name})</div>
      </div>
      // <div>
      //   <div><span className="b">► {this.props.dept.name}</span> ({this.props.dept.type})</div>
      // </div>
    )
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
    // ►◄▲▼
  }

}

export default graphql(ALL_PRODS_QUERY, { name: 'allProdsQuery' }) (Dept)
