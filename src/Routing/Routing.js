import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignIn from '../Components/LoginDomain/Login';
import SignUp from '../Components/LoginDomain/SignUp';
import AppData from '../Components/Data';
import UserActivation from "../Components/LoginDomain/UserActivation";

class Routing extends Component{
    render(){
        return(
            <Router>
                <Route exact path='/' component={SignIn} />
                <Route exact path='/signIn' component={SignIn} />
                <Route path='/signUp' component={SignUp} />
                <Route exact path = {'/data'} component={AppData} />
                <Route exact path = {`/confirmUser/:username`} component={UserActivation} />
            </Router>
        );
    }
}

export default Routing;