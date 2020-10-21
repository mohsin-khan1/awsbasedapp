import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errMsg: ''
    }
  }
  componentDidMount = async () => {
    debugger
    const data = await axios.get('/getJsonData');
    console.log(data);
    if (data && data.data && data.data.data && data.data.data.length > 0) {
      this.setState({ data: data.data.data });
    }
    else {
      this.setState({ errMsg: data.data.message })
    }
  }
  render() {
    const { data, errMsg } = this.state;
    return (
      <div>
        <Link to='/signIn' className="logOutLink">Log Out</Link>
        <h5>Data list</h5>
        {
          data && data.length > 0 ?
            data.map((item, index) => {
              return (
                <p>
                  Name : {" " + item.name}<br />
                  Status: {" " + item.status}<br />
                  SignUp-Data:{" " + item.signup_date}<br />
                  Favorite_Disney_Character: {" " + item.favorite_disney_character}
                </p>
              );
            })
            :
            errMsg &&
            <p>
              status:"Error" <br/>
              message: {errMsg}
            </p>
        }
      </div>
    );
  }
}
export default AppData;
