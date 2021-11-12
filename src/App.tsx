import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Home from './components/Home/home';
//import SignIn from './components/SignIn/signin';
import ImageSection from './components/Login/image';
import NewPassword from './components/Login/newpassword';
import PhoneVerification from './components/Login/phoneverification';
import ContinueWithPhone from './components/Login/continuewithphone';
import SignInForm from './components/Login/signin';

import './components/Login/login.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            {
            /*<Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signin" component={SignIn} />
            </Switch>*/
            }
            <Container className="signin-wrapper">
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <ImageSection />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                      <Switch>
                        <Route exact path="/" component={SignInForm} />
                        <Route path="/signin" component={SignInForm} />
                        <Route path="/newpassword" component={NewPassword} />
                        <Route path="/phoneverification" component={PhoneVerification} />
                        <Route path="/continuewithphone" component={ContinueWithPhone} />
                      </Switch>
                    </Col>
                </Row>
            </Container>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;