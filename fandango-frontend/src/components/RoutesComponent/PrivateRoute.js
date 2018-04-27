import {connect} from "react-redux";
import {checkLogin} from '../../api/apicall_for_users';
import React, { Component } from 'react';

import {
    Route,
    Redirect,
} from 'react-router-dom'





class PrivateRoute extends Component{

    constructor(props){
        super(props);
        this.state = null
    }

    async componentDidMount() {
        try {
            const data = await checkLogin({});
            this.setState(data);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const response = this.state;
        if(response === null){
            return <div>Loading...</div>
        }else{
            if(typeof response["data"] === "object"){
                this.props.SetSession(response["data"]);
                return <this.props.componentname {...this.props.dataprops} />
            }else{
                return <Redirect to={{
                    pathname: '/login',
                }}/>;
            }
        }
    }
}

PrivateRoute = connect(
    null,
    dispatch => {
        return {
            SetSession: (session)=>{
                dispatch({
                    type: "LOGIN_USER",
                    "payload": session
                })
            }
        }
    }
)(PrivateRoute);

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props)=>{
        return <PrivateRoute dataprops={props} componentname={Component}/>
    }}/>
};

export default ProtectedRoute