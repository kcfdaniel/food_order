import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './components/layout/HomePage'
import Profile from './components/projects/Profile'
import Photos from './components/projects/Photos'
// import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
// import SignUp from './components/auth/SignUp'
import LunchMenu from './components/projects/LunchMenu'
import Admin from './components/admin/Admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Route path='/' component={Navbar} />
          <Switch> 
            <Route exact path='/' component={HomePage} />
            <Route path='/profile' component={Profile} />
            <Route path='/photos' component={Photos} />
            {/* <Route path='/project/:id' component={ProjectDetails} /> */}
            <Route path='/signin' component={SignIn} />
            {/* <Route path='/signup' component={SignUp} /> */}
            <Route path='/lunch_menu' component={LunchMenu} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
