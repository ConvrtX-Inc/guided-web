import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './components/Login/login.scss';

//import Home from './components/Home/home';
//import SignIn from './components/SignIn/signin';
import ImageSection from './components/Login/image';
import NewPassword from './components/Login/newpassword';
import PhoneVerification from './components/Login/phoneverification';
import ContinueWithPhone from './components/Login/continuewithphone';
import SignInForm from './components/Login/signin';
import ResetPassword from './components/modules/forgot-password/ResetPassword';
import ConfirmResetPassword from './components/modules/forgot-password/ConfirmPassword';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <div className="App">
            <div className="content">
              <Container className="signin-wrapper">
                  <Row>
                      <Col className="d-flex justify-content-center align-items-center">
                          <ImageSection />
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                          <Route exact path="/" component={SignInForm} />
                          <Route path="/signin" component={SignInForm} />
                          <Route path="/newpassword" component={NewPassword} />
                          <Route path="/phoneverification" component={PhoneVerification} />
                          <Route path="/continuewithphone" component={ContinueWithPhone} />
                          <Route path="/resetpassword" component={ResetPassword} />
                          <Route path="/confirm-resetpassword" component={ConfirmResetPassword} />
                      </Col>
                  </Row>
              </Container>
            </div>
          </div>
      
      </Switch>
    </BrowserRouter>
  );
}
 
export default App;