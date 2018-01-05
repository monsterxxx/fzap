import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
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
      <div>
        <h4 className='mv3'>{this.state.login ? 'Вход' : 'Регистрация'} <span
            className='normal'>или <a
              className='pointer underline normal'
              onClick={() => this.setState({ login: !this.state.login })}
            >
              {this.state.login ? 'регистрация новых пользователей' : 'вход в существующий аккаунт'}
            </a>
          </span>
        </h4>
        <div className='flex flex-column'>
          {!this.state.login &&
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Фамилия Имя'
          />}
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='E-mail'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Пароль'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='pointer mr2 button'
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'Войти' : 'Зарегистрироваться' }
          </div>
        </div>
      </div>
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

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
