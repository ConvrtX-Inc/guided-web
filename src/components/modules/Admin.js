
import camera from '../../assets/admin/camera.png';
import card from '../../assets/admin/credit-card.png';
import post from '../../assets/admin/post.png';
import users from '../../assets/admin/Union.png';
import grid from '../../assets/admin/grid.png';
import clock from '../../assets/admin/clock.png';
import support from '../../assets/admin/Vector.png';
import file from '../../assets/admin/file-text.png';

import './Admin.scss';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import BecomeGuide from './become-guide/Guide';
import ViewApplication from './become-guide/ViewApplication';
import Dashboard from './dashboard/Dashboard';
import EndUser from './end-user/EndUser';

//Dashboard side bar navigation
const Navigation = () =>{
    return (
        <Navbar className="sidebar">
            <ul className="list-unstyled ms-2">
                <li><NavLink to="/admin/dashboard" activeClassName='active' className="nav-link"><Image src={grid} alt="" /> Dashboard</NavLink></li>
                <li><NavLink to="/admin/guides" activeClassName='active' className="nav-link"><Image src={users} alt="" /> Guides & Outfitters</NavLink></li>
                <li><NavLink to="/admin/post" activeClassName='active' className="nav-link"><Image src={post} alt="" /> Post</NavLink></li>
                <li><NavLink to="/admin/payment" activeClassName='active' className="nav-link"><Image src={card} alt="" /> Pending Payments</NavLink></li>
                <li><NavLink to="/admin/transaction" activeClassName='active' className="nav-link"><Image src={clock} alt="" /> Transaction History</NavLink></li>
                <li><NavLink to="/admin/support" activeClassName='active' className="nav-link"><Image src={support} alt="" /> Support</NavLink></li>
                <li><NavLink to="/admin/end-users" activeClassName='active' className="nav-link"><Image src={users} alt="" /> End Users</NavLink></li>
                <li><NavLink to="/admin/become-guide" activeClassName='active' className="nav-link"><Image src={users} alt="" /> Become a Guide</NavLink></li>
                <li><NavLink to="/admin/badge" activeClassName='active' className="nav-link"><Image src={camera} alt="" /> Badge Management</NavLink></li>
                <li><NavLink to="/admin/guidelines" activeClassName='active' className="nav-link"><Image src={file} alt="" /> Guidelines</NavLink></li>
            </ul>
        </Navbar>
    )
}

//Admin main screen
const Admin = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                
                <Navigation />

                <div id="content" className="m-4">
                    <Switch>
                        <Route path="/admin/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/admin/become-guide">
                            <BecomeGuide />
                        </Route>
                        <Route path="/admin/end-users">
                            <EndUser />
                        </Route>
                        <Route path="/admin/viewapplication">
                            <ViewApplication />
                        </Route>
                    </Switch>
                </div>
            </div> 
        </BrowserRouter>  
    )
}

export default Admin;