import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";


import TodoListApp from './components/TodoList/TodoListApp'
import LoginFormContainer from './components/LoginFormContainer'

function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">To Do List</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginFormContainer/>
          </Route>
          <PrivateRoute path="/">
            <TodoListApp/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
