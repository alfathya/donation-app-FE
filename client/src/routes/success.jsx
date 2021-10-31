import React from "react";
import { Redirect, Route } from "react-router-dom";
import Thanks from "../components/thanks";

const Success = () =>{
    const donated = localStorage.getItem('donate');
    return(
        donated ? <Route exact path='/thanks' component={Thanks}/> : <Redirect to="/" />
    )
}

export default Success