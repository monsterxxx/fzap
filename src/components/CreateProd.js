import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import Select from 'react-select'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'

// const deptOptions = [
//   { key: 'k', text: 'KOMZ', value: 'cjbnj9fft1flc0162bk4freey' },
// ]

const deptOptions = [
  { label: 'Оп', value: 'cjbuuv9ka4s3l0162qzn4zy5x' },
]

// const modelOptions = [
//   { key: 'a', text: 'Втулка ДР30/50', value: 'cjbnpf1yk1mzf0147gerp4m7s' },
//   { key: 'b', text: 'Втулка NVD 48 A2U', value: 'cjbp79sup23lo0162lotj4pc6' },
//   { key: 'c', text: 'Втулка 18/22', value: 'cjbnpj26j1n3i0147wstnf5oy' },
//   { key: 'd', text: 'Крышка Г60', value: 'cjbp7a6p4232o0147t5yeyb6u' },
// ]

// const modelOptions = [
//   { label: 'Втулка ДР30/50', value: 'cjbnpf1yk1mzf0147gerp4m7s' },
//   { label: 'Втулка NVD 48 A2U', value: 'cjbp79sup23lo0162lotj4pc6' },
//   { label: 'Втулка 18/22', value: 'cjbnpj26j1n3i0147wstnf5oy' },
//   { label: 'Крышка Г60', value: 'cjbp7a6p4232o0147t5yeyb6u' },
// ]

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const ALL_MODELS_QUERY = gql`
  query AllModelsQuery {
    allModels {
      id
      name
    }
  }
`

const CREATE_PROD_MUTATION = gql`
  mutation CreateProdMutation($createdById: ID!, $deptId: ID!, $modelId: ID!, $melt: Int!, $meltShift: Int, $number: Int!, $year: Int! ) {
    createProd(
      createdById: $createdById,
      deptId: $deptId,
      modelId: $modelId,
      melt: $melt,
      meltShift: $meltShift,
      number: $number,
      year: $year
    ) {
      id
    }
  }
`

class CreateProd extends Component {
  // constructor(props){
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  // }
  state = {
    createdById: '',
    deptId: 'cjbuuv9ka4s3l0162qzn4zy5x',
    modelId: 'cjbuv06lu4oq40147jl77mgck',
    modelId1: 'cjbuv06lu4oq40147jl77mgck',
    melt: 1,
    meltShift: 1,
    number: 1,
    year: 17
  }
  // handleChange = (e, { value }) => this.setState({ value })
  // handleChange(e) {
  //   console.log(e.target.value);
  //   this.setState({modelId: e.target.value})
  //   console.log(this.state.modelId);
  // }
  handleChange(e) {
    if (e) {
      this.setState({deptId: e.value})
      console.log(`Selected: ${ e.value}`)
    }
  }
  handleChange1(e) {
    if (e) {
      this.setState({modelId: e.value})
      console.log(`Selected: ${ e.value}`)
    }
  }
  handleChangeInt = (e) => this.setState({ value: parseInt(e.target.value)})
  render() {
    this.state.createdById = localStorage.getItem(GC_USER_ID)
    // console.log('this.props.allModelsQuery')
    // console.log(this.props.allModelsQuery.allModels)
    let modelOptions = [
      { label: 'Вид продукции', value: 'cjbuv06lu4oq40147jl77mgck' }
    ]
    if (this.props.allModelsQuery.allModels) {
      modelOptions = this.props.allModelsQuery.allModels.map(model => {
        return {
          label: model.name,
          value:  model.id
        }
      })
      // console.log(modelOptions)
    }
    return (
      <div>
      {/* <Dropdown placeholder='Select Friend' fluid selection options={modelOptions} onChange={this.handleChange} value={this.state.modelId} /> */}
      {/* <Dropdown placeholder='Select Friend' fluid selection options={modelOptions} onChange={(e) => this.setState({ modelId: e.value }) } value={this.state.modelId}/> */}
      {/* <Select
        clearable={false}
        value={this.state.modelId}
        onChange={this.handleChange.bind(this)}
        options={modelOptions}
      />
      <Select
        clearable={false}
        value={this.state.modelId}
        onChange={this.handleChange.bind(this)}
        options={modelOptions}
      /> */}
      <Form onSubmit={() => this._confirm()}>
        {this.state.modelId}
        {/* <Form.Select label='Участок' options={deptOptions} value={this.state.deptId}/> */}
        {/* <Form.Select label='Вид продукции' options={modelOptions}
          onChange={(e) => this.setState({ modelId: e.target.value })} value={this.state.modelId}/> */}
        {/* <Form.Field label='Вид продукции' control={Select} placeholder='Вид продукции'
          clearable={false}
          value={this.state.modelId}
          onChange={this.handleChange.bind(this)}
          options={modelOptions}
        /> */}
        <Form.Field>
          <label>Участок</label>
          <Select
            autosize={false}
            clearable={false}
            value={this.state.deptId}
            onChange={this.handleChange.bind(this)}
            options={deptOptions}
          />
        </Form.Field>
        <Form.Field>
          <label>Вид продукции</label>
          <Select
            autosize={false}
            clearable={false}
            value={this.state.modelId}
            onChange={this.handleChange1.bind(this)}
            options={modelOptions}
          />
        </Form.Field>

        {/* <Form.Field label='An HTML <select>' control='select'>
          <option value='cjbnpf1yk1mzf0147gerp4m7s'>Втулка ДР30/50</option>
          <option value='cjbp79sup23lo0162lotj4pc6'>Втулка NVD 48 A2U</option>
          <option value='cjbnpj26j1n3i0147wstnf5oy'>Втулка 18/22</option>
          <option value='cjbp7a6p4232o0147t5yeyb6u'>Крышка Г60</option>
        </Form.Field> */}
        <Form.Group widths='equal'>
          <Form.Input label='Плавка' placeholder='Плавка'
            type="number" min="1" max="999"
            onChange={(e) => this.setState({ melt: parseInt(e.target.value) })} value={this.state.melt}/>
          <Form.Input label='Пл. смена (если промаркирована)' placeholder='Пл. смена'
            type="number" min="1" max="3"
            onChange={(e) => this.setState({ meltShift: parseInt(e.target.value) }) } value={this.state.meltShift}/>
          <Form.Input label='Номер' placeholder='Номер'
            type="number" min="1" max="999"
            onChange={(e) => this.setState({ number: parseInt(e.target.value) })} value={this.state.number}/>
          <Form.Input label='Год' placeholder='Год'
            type="number" min="16" max="18"
            onChange={(e) => this.setState({ year: parseInt(e.target.value) })} value={this.state.year}/>
        </Form.Group>
        {/* <Form.TextArea label='Комментарий' placeholder='Вставьте комментарий при необходимости...' /> */}
        <Form.Button>Добавить</Form.Button>
      </Form>
      </div>
    )
  }

  _confirm = () => {
   const { createdById, deptId, modelId, melt, meltShift, number, year } = this.state
   console.log(createdById, deptId, modelId, melt, meltShift, number, year);

 this.props.createProdMutation ({
    variables: {
      createdById,
      deptId,
      modelId,
      melt,
      meltShift,
      number,
      year
    }
  })
  this.props.history.push(`/`)
 }
}

export default compose(
  graphql(ALL_MODELS_QUERY, { name: 'allModelsQuery' }),
  graphql(CREATE_PROD_MUTATION, { name: 'createProdMutation' })
)(CreateProd)

// export default graphql(CREATE_PROD_MUTATION, { name: 'createProdMutation' })(CreateProd)

// export default class CreateProd extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about your favorite DOM element.'
//     };
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({modelId: event.value})
//     console.log(`Selected: ${ event.value}`)
//   }
//   // handleChange = (selectedOption) => {
//   //   this.setState({ selectedOption });
//   //   console.log(`Selected: ${selectedOption.label}`);
//   // }
//
//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.modelId);
//     event.preventDefault();
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Essay:
//           <Select
//             name="form-field-name"
//             value={this.state.modelId}
//             onChange={this.handleChange}
//             options={modelOptions}
//           />
//           {/* <textarea value={this.state.modelId} onChange={this.handleChange} /> */}
//           {/* <Dropdown name="form-field-name" placeholder='Select Friend' fluid selection options={modelOptions} onChange={this.handleChange} value={this.state.modelId}/> */}
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
