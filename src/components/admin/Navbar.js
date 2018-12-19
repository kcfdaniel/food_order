import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'  
// import SideNavMenu from './SideNavMenu'
// import {IconButton, Hidden, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import {Menu, Mail, Inbox} from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { signOut } from './store/actions/authActions'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Navbar extends React.Component {
  state = {
    sideNavOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ sideNavOpen: !state.sideNavOpen }));
  };

  render(){
    const { auth, classes, history, signOut } = this.props;
    console.log("this.props:");
    console.log(this.props);
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key="posts" onClick={() => {this.handleDrawerToggle(); history.push('/admin/post-list');}}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="posts" />
          </ListItem>
          <ListItem button key="health" onClick={() => {this.handleDrawerToggle(); history.push('/admin/health');}}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="health" />
          </ListItem>
          <ListItem button key="news" onClick={() => {this.handleDrawerToggle(); history.push('/admin/news');}}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="news" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"logout"} onClick={() => {this.handleDrawerToggle(); signOut();}}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="log out" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <nav className="nav-extended wrapper green darken-1">
          <div className="nav-wrapper">
            <div className="container">
              {auth.uid ? 
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                : ""
              }
              <Link to='/admin' className="brand-logo center">Admin</Link>
              { links }
            </div>
          </div>
        </nav>
        <Hidden smUp implementation="css">
          <Drawer open={this.state.sideNavOpen} onClose={this.handleDrawerToggle}>
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        // profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));