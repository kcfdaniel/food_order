import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/projects/Profile'
// import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
// import SignUp from './components/auth/SignUp'
import LunchMenu from './components/projects/LunchMenu'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Route path='/' component={Navbar} />
          <Switch> 
            <Route exact path='/' component={Dashboard} />
            <Route path='/profile' component={Profile} />
            {/* <Route path='/project/:id' component={ProjectDetails} /> */}
            <Route path='/signin' component={SignIn} />
            {/* <Route path='/signup' component={SignUp} /> */}
            <Route path='/lunch_menu' component={LunchMenu} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
