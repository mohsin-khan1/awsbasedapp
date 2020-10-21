import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import "../../App.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoginClicked:false
    };
  }
  
  onChangeRegister = (event) => {
    let data = this.state.user;
    let field = event.target.name;
    data[field] = event.target.value;
    this.setState({ data });
  };
   onClickLogin = async (event) => {
    event.preventDefault();
    this.setState({isLoginClicked:true});
    const { username, password } = this.state.user;
    
    try {
      const user = await Auth.signIn(username.toString(), password.toString());
      console.log(user);
      if(user !=null){
        if(user.signInUserSession.accessToken.jwtToken){
          this.props.history.push("/data");
        }
      }
      
  } catch (error) {
      console.log('error signing in', error);
      if(error.message==="Incorrect username or password.")
      {
        alert(error.message);
        this.setState({isLoginClicked:false});
      }
      else{
      this.props.history.push(`confirmUser/${username}`);
      }
  }
  };
  render() {
    const { email, password } = this.state.user;
    return (
      <div className="App">
        <h4>Login</h4>
        <hr />
        <form onSubmit={this.onClickLogin}>
        <TextField
          name="username"
          id="username"
          label="User Name"
          type="text"
          className="text-field"
          onChange={this.onChangeRegister}
          value={email}
        />
        <br />
        <TextField
          name="password"
          id="password"
          type="password"
          label="Password"
          className="text-field"
          onChange={this.onChangeRegister}
          value={password}
        />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="loginBtn"
          style={{display:this.state.isLoginClicked?'none':''}}
        >
          Login
        </Button>
        {this.state.isLoginClicked &&<p>Please wait for a while</p>}
        </form>
        <br />
        <Link to="/signUp">Dont have an account</Link>
      </div>
    );
  }
}

export default SignIn;
