import C from "./constants.js";
import { v4 } from "uuid";
import fetch from "isomorphic-fetch";

const handleRequestError = (despatch) => (error) => {
  console.log("An error occured.", error);
};

const getAuthTokenHeader = () => {
  let headers = new Headers();
  headers.append("Authorization", "bearer " + localStorage.getItem("token"));
  return headers;
};

export const addTodoPreFetch = (title) => ({
  type: C.ADD_TODO,
  id: v4(),
  title,
});

export const addTodo = (title) => {
  return (dispatch) => {
    //Perform expected result of the POST API request
    dispatch(addTodoPreFetch(title));

    const headers = getAuthTokenHeader();
    headers.append("Content-Type", "application/json");
    //API call to POST a new todo with {title}
    return fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers
    })
      .then((response) => response, handleRequestError(dispatch))
      .then((response) => dispatch(fetchTodos()));
  };
};

export const removeTodoPreFetch = (id) => ({
  type: C.REMOVE_TODO,
  id: id,
});

export const removeTodo = (id) => {
  return (dispatch) => {
    //Perform expected result of the DELETE API request
    dispatch(removeTodoPreFetch(id));

    //API call to delete todo {id}
    return fetch("/api/todos/" + id, {
      method: "DELETE",
      headers: getAuthTokenHeader()
    }).then((response) => dispatch(fetchTodos()), handleRequestError(dispatch));
  };
};

export const editTodoPreFetch = (id, title) => ({
  type: C.EDIT_TODO,
  id: id,
  title: title,
});

export const editTodo = (id, title) => {
  return (dispatch) => {
    //Perform expected result of the PUT API request
    dispatch(editTodoPreFetch(id, title));
    const headers = getAuthTokenHeader();
    headers.append("Content-Type", "application/json");
    //API call to edit todo {id}, with new title: {title}
    return fetch("/api/todos/" + id, {
      method: "PUT",
      body: JSON.stringify({ title: title, id: id }),
      headers
    }).then((response) => dispatch(fetchTodos()), handleRequestError(dispatch));
  };
};

//A thunk which will fetch+set the state of the todo list from the backend db
export const fetchTodos = () => {
  return (dispatch) => {
    return fetch("/api/todos", {
      method: "GET",
      headers: getAuthTokenHeader(),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data)=> dispatch(setTodos(data)))
      .catch(() => {
          handleRequestError(dispatch);
          dispatch(setTodos([]));
      });
  };
};

export const setTodos = (todos) => ({
  type: C.SET_TODOS,
  todos: todos,
});

export const login = (loginData, cb) => {
  return (dispatch) => {
    let headers = new Headers();
    headers.append(
      "Authorization",
      `Basic ${btoa(loginData.login + ":" + loginData.password)}`
    );
    return fetch("/auth/login", {
      method: "POST",
      headers,
    })
      .then((response) => response.json(), handleRequestError(dispatch))
      .then((json) => {
        localStorage.setItem("token", json.token);
        dispatch(fetchTodos());
        cb();
      });
  };
};

export const setLogin = (user) => ({
  type: C.SET_USER,
  user: user,
});
