import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import "../../App.css";

class UserActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      username:'',
      isSubmitCode:false
    };
  }
  componentDidMount=()=>{
    const {match}=this.props;
    this.setState({username:match.params.username});
  }
  onChangeUserCode = (event) => {
    let data = this.state.user;
    let field = event.target.name;
    data[field] = event.target.value;
    this.setState({ data });
  };
   onClickSubmitCode = async (event) => {
    event.preventDefault();
    const { code} = this.state.user;
    try {
        this.setState({isSubmitCode:true});
       const confirmUser= await Auth.confirmSignUp(this.state.username, code);
       console.log(confirmUser);
       if(confirmUser==="SUCCESS")
       {
           this.props.history.push("/signIn");
       }
      } catch (error) {
          console.log('error confirming sign up', error);
      }
  };
  onClickResendCode= async ()=>{
    try {
        this.setState({isSubmitCode:true});
        await Auth.resendSignUp(this.state.username);
        console.log('code resent successfully');
        alert("Code Resend Successfully");
    } catch (err) {
        console.log('error resending code: ', err);
    }
  }
  render() {
    const { code} = this.state.user;
    return (
      <div className="App">
        <h4>Confirmation Code</h4>
        <hr />
        <form onSubmit={this.onClickSubmitCode}>
        <TextField
          name="code"
          id="code"
          className="text-field"
          label="Enter Confirmation Code"
          type="number"
          onChange={this.onChangeUserCode}
          value={code}
        />
        <br />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="loginBtn"
          style={{display:this.state.isSubmitCode?'none':''}}
        >
          Submit
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          onClick={this.onClickResendCode}
          color="primary"
          variant="contained"
          className="loginBtn"
          style={{display:this.state.isSubmitCode?'none':''}}
        >
          Resend Code
        </Button>
        {this.state.isSubmitCode &&<p>Please wait for a while</p>}
        </form>
        <br />
        <Link to="/signUp">Dont have an account</Link><br/>
        <Link to="/signIn">Already a member</Link>
      </div>
    );
  }
}

export default UserActivation;
