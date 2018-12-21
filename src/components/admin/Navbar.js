import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'  
import PropTypes from 'prop-types';
import { ArrowBack as ArrowBackIcon,
        Delete as DeleteIcon,
        Menu as MenuIcon,
        Mail as MailIcon,
        Inbox as InboxIcon } from '@material-ui/icons';
import { AppBar, 
        CssBaseline, 
        Divider, 
        Drawer, 
        Hidden, 
        IconButton, 
        List, ListItem, 
        ListItemIcon, 
        ListItemText, 
        Toolbar, 
        Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { signOut } from './store/actions/authActions'
import { setSelectMode, deletePost } from './store/actions/postActions'

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    "z-index": 0,
  },
  grow: {
    flexGrow: 1
  },
  arrowBackButton: {
    "zIndex": "1",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    "zIndex": "1",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  colorPrimary: {
    backgroundColor: "#000000",
    color: "#000000",
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
    const { auth, classes, history, signOut, selectMode, setSelectMode, selectedPostsIDs, deletePost} = this.props;
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
      selectMode ? (
        <div className={classes.root}>
          <AppBar position="static" className="orange darken-1">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => {setSelectMode(false)}}
                className={classes.arrowBackButton}
              >
                <ArrowBackIcon className={classes.arrowBackIcon}/>
              </IconButton>
              <span className="number-of-selected-posts">{selectedPostsIDs.size}</span>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => {
                  deletePost(selectedPostsIDs);
                  setSelectMode(false);
                }}
                className={classes.deleteButton}
              >
                <DeleteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      ) :
        <div>
        <AppBar position="static" className="green darken-1" >
          <Toolbar>
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
              <Typography variant="h6" color="inherit" className={(classes.title)} align='center'>
                Admin
              </Typography>
              <div className={classes.grow}></div>
              {/* <Link to='/admin' className="brand-logo center">Admin</Link> */}
              { links }
            </Toolbar>
          </AppBar>
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
    return {
        auth: state.firebase.auth,
        selectMode: state.post.selectMode,
        selectedPostsIDs: state.post.selectedPostsIDs,
        // profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    setSelectMode: (selectMode) => dispatch(setSelectMode(selectMode)),
    deletePost: (selectMode) => dispatch(deletePost(selectMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));