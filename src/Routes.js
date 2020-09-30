import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './containers/Form'
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/" component={Form} />
                            <Route render={() => 'Page Not Found'} />
                        </Switch>
                    </React.Fragment>
                </Router>
               <ToastContainer />
            </React.Fragment>
        )
    }
}
export default Routes;