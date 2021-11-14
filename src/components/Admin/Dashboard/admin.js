import './admin.scss';

import { BrowserRouter, BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Dashboard from './dashboard';
import Navigation from './navigation';

const Admin = () => {
    return (
        <BrowserRouter>
        <div className="wrapper">
            
            <Navigation />

            <div id="content" className="m-4">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </div> 
        </BrowserRouter>  
    )
}

export default Admin;