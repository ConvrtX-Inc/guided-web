import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import Home from './components/Home/home';
import SignIn from './components/SignIn/signin';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;