import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TodoListApp from './components/TodoList/TodoListApp'
import storeFactory from './store/index'
import styles from './styles/main.css'

import { fetchTodos } from './actions'

window.React = React;

const store_ = storeFactory();

//Get todos for initial list render
store_.dispatch(fetchTodos())

render(
  <Provider store={store_}>
      <TodoListApp />
  </Provider>,
  document.getElementById("react-container")
)
