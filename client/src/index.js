import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import styles from './styles/main.css'

import App from './App';

import storeFactory from './store/index'
import { fetchTodos } from './actions'

window.React = React;

const store_ = storeFactory();

//Get todos for initial list render
store_.dispatch(fetchTodos())

render(
  <Provider store={store_}>
      <App/>
  </Provider>,
  document.getElementById("react-container")
)
