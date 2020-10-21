import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
  Auth: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_UINIv9Elu',
      userPoolWebClientId: '5g9emojn4u507l3qg00coruvki',
      mandatorySignIn: false,
      authenticationFlowType: 'USER_PASSWORD_AUTH',

  }
});
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  
  onChangeRegister = (event) => {
    
    let data = this.state.user;
    let field = event.target.name;
    data[field] = event.target.value;
    this.setState({ data });
  };
   onClickRegister =  (event) => {
    event.preventDefault();
    const { name, email, password } = this.state.user;
    let username=name;
    let phone_number="123456";
    try {
      const  user  =  Auth.signUp({
          "username":username.toString(),
          "password":password.toString(),
          "attributes": {
            "email":email.toString(),
          }
      });
      this.props.history.push(`confirmUser/${name}`);
  } catch (error) {
      console.log('error signing up:', error);
  }
  };
  render() {
    const { name, email, password } = this.state.user;
    return (
      <div className="App">
        <h4>SignUp</h4>
        <hr />
        <form onSubmit={this.onClickRegister}>
          <TextField
            name="name"
            id="loginEmail"
            label="Username"
            type="text"
            value={name}
            placeholder="username only alpha numeric without spaces"
            className="text-field"
            onChange={this.onChangeRegister}
          />
          <br />
          <TextField
            name="email"
            id="loginEmail"
            label="Email"
            type="text"
            placeholder="example@mail.com"
            value={email}
            className="text-field"
            onChange={this.onChangeRegister}
          />
          <br />
          <TextField
            name="password"
            id="password"
            type="password"
            label="Password"
            value={password}
            className="text-field"
            placeholder="one upper case, one special character and numbers"
            onChange={this.onChangeRegister}
          />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="loginBtn"
          >
            Register
          </Button>
        </form>
        <br />
        <Link to="/signIn" >Already have an account</Link>
      </div>
    );
  }
}

export default SignUp;
