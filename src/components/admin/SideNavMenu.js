import React, { Component } from 'react'
import { signOut } from './store/actions/authActions'
import { connect } from 'react-redux'  


class SideNavMenu extends Component {
  signOut = () => {

  }
  render() {

    return (
      <SideNav
        trigger={<i style={{"margin-left":"-10px" ,width:"50px"}} className="material-icons waves-effect center-align">menu</i>}
        options={{ closeOnClick: true }}
        >
        <SideNavItem subheader>Sections</SideNavItem>
        <SideNavItem href="/#/admin/posts" icon='subject'>Posts</SideNavItem>
        <SideNavItem divider />
        <SideNavItem subheader>Account</SideNavItem>
        <SideNavItem waves href onClick={signOut}>Log Out</SideNavItem>
      </SideNav>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavMenu);
