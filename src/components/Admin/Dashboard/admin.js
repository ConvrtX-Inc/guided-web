
import grid from '../../../assets/admin/grid.png';
import clock from '../../../assets/admin/clock.png';
import support from '../../../assets/admin/Vector.png';
import file from '../../../assets/admin/file-text.png';
import users from '../../../assets/admin/Union.png';
import card from '../../../assets/admin/credit-card.png';
import post from '../../../assets/admin/post.png';
import camera from '../../../assets/admin/camera.png';

import './admin.scss';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';

import Dashboard from './dashboard';
import BecomeGuide from '../BecomeGuide/guide';

const Navigation = () =>{
    return (
        <Navbar className="sidebar">
            <ul className="list-unstyled">
                <li><NavLink to="/dashboard" activeClassName='active' className="nav-link"><Image src={grid} alt="" /> Dashboard</NavLink></li>
                <li><NavLink to="/guides" activeClassName='active' className="nav-link"><Image src={users} alt="" /> Guides & Outfitters</NavLink></li>
                <li><NavLink to="/post" activeClassName='active' className="nav-link"><Image src={post} alt="" /> Post</NavLink></li>
                <li><NavLink to="/payment" activeClassName='active' className="nav-link"><Image src={card} alt="" /> Pending Payments</NavLink></li>
                <li><NavLink to="/transaction" activeClassName='active' className="nav-link"><Image src={clock} alt="" /> Transaction History</NavLink></li>
                <li><NavLink to="/support" activeClassName='active' className="nav-link"><Image src={support} alt="" /> Support</NavLink></li>
                <li><NavLink to="/users" activeClassName='active' className="nav-link"><Image src={users} alt="" /> End Users</NavLink></li>
                <li><NavLink to="/become-guide" activeClassName='active' className="nav-link"><Image src={users} alt="" /> Become a Guide</NavLink></li>
                <li><NavLink to="/badge" activeClassName='active' className="nav-link"><Image src={camera} alt="" /> Badge Management</NavLink></li>
                <li><NavLink to="/guidelines" activeClassName='active' className="nav-link"><Image src={file} alt="" /> Guidelines</NavLink></li>
            </ul>
        </Navbar>
    )
}

const Admin = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                
                <Navigation />

                <div id="content" className="m-4">
                    <Switch>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/become-guide" component={BecomeGuide} />
                    </Switch>
                </div>
            </div> 
        </BrowserRouter>  
    )
}

export default Admin;