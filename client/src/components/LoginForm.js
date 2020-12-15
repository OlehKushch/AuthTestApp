import { withRouter } from 'react-router-dom'

// class LoginForm extends Component {
//   render() {
//     let password = "";
//     let login = "";

//     const onSubmit = (e) => {
//       e.preventDefault();
//       this.props.onLogin({ login: login.value, password: password.value }, () =>
//         this.props.history.push("/")
//       );
//     };

//     return (
//       <form onSubmit={onSubmit}>
//         <div>
//           <label htmlFor="login">Login: </label>
//           <input id="login" ref={(input) => (login = input)}></input>
//         </div>
//         <div>
//           <label htmlFor="password">Password: </label>
//           <input id="password" ref={(input) => (password = input)}></input>
//         </div>
//         <button>Login</button>
//       </form>
//     );
//   }
// }

const LoginForm = withRouter((props) => {
  let password = "";
  let login = "";

  const onSubmit = (e) => {
    e.preventDefault();
    props.onLogin({ login: login.value, password: password.value }, () =>
      props.history.push("/")
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="login">Login: </label>
        <input id="login" ref={(input) => (login = input)}></input>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" ref={(input) => (password = input)}></input>
      </div>
      <button>Login</button>
    </form>
  );
});

export default LoginForm;
