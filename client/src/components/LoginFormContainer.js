import { connect } from 'react-redux'

import { login } from '../actions'

import LoginForm from './LoginForm'

const LoginFormContainer = connect(
  null,
  dispatch => ({
      onLogin(loginData, cb) {
          dispatch(login(loginData, cb))
      }
  })
)(LoginForm)

export default LoginFormContainer