import React, { Component } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    createUser(
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }) {
        id
      }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(
      email: {
        email: $email,
        password: $password
      }){
      token
      user {
        id
      }
    }
  }
`

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  render() {

    return (
      <Form>
        <Header as='h2'>{this.state.login ? 'Вход' : 'Регистрация'}
          <Header.Subheader>
            или <a href='javascript:void(0)'
              onClick={() => this.setState({ login: !this.state.login })}
            >
              {this.state.login ? 'регистрация новых пользователей' : 'вход в существующий аккаунт'}
            </a>
          </Header.Subheader>
        </Header>
        {/* {!this.state.login &&
          <Form.Input
            label='Фамилия Имя'
            placeholder='Фамилия Имя'
            type='text'
            required
            value={this.state.name}
            onChange={(e, props) => this.setState({ name: props.value })}
          />
        } */}
        <Form.Input
          label='E-mail'
          placeholder='E-mail'
          type='email'
          required
          value={this.state.email}
          onChange={(e, props) => this.setState({ email: props.value })}
        />
        <Form.Input
          label='Пароль'
          placeholder='Пароль'
          type='password'
          required
          value={this.state.password}
          onChange={(e, props) => this.setState({ password: props.value })}
        />
        <Button onClick={() => this._confirm()}>{this.state.login ? 'Войти' : 'Зарегистрироваться' }</Button>
      </Form>
    )
  }

  _confirm = async () => {
   const { email, password } = this.state
   if (this.state.login) {
     const result = await this.props.signinUserMutation({
       variables: {
         email,
         password
       }
     })
     const id = result.data.signinUser.user.id
     const { token } = result.data.signinUser
     this._saveUserData(id, token)
   } else {
     let result = await this.props.createUserMutation({
       variables: {
         email,
         password
       }
     })
     const { id } = result.data.createUser
     result = await this.props.signinUserMutation({
       variables: {
         email,
         password
       }
     })
     const { token } = result.data.signinUser
     this._saveUserData(id, token)
   }
   this.props.history.push(`/`)
 }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

export default withApollo(compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login))
