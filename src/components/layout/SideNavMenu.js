import React from 'react'
import {SideNav, SideNavItem, Row, Input} from 'react-materialize'
import { connect } from 'react-redux'  
import { signOut } from '../../store/actions/authActions'
import { changeStudent } from '../../store/actions/navActions'
import { NavLink } from 'react-router-dom'

const SideNavMenu = (props) => {
  const { nav, auth, profile, signOut, changeStudent } = props;
  console.log("profile:");
  console.log(profile);
  console.log(nav.studentID);
  let options = profile.students ? profile.students.map((student) => <option selected={nav.studentID == student.studentID ? true : false} value={student.studentID}>{student.studentName}</option>) : []

  function handleChangeStudent(_,value){
    console.log(value)
    changeStudent(value);
  }

  console.log(nav.studentID)

  return (
        <SideNav
            trigger={<a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>}
            options={{ closeOnClick: true }}
            >
            <SideNavItem userView
                user={{
                background: 'img/office.jpg',
                image: 'img/yuna.jpg',
                name: 
                  options ? 
                  <Input s={12} style={{lineHeight: 1}} type='select' defaultValue="1" onChange={handleChangeStudent}>{options}</Input>
                  :"",
                email: profile.email
                }}

                href="/"
            />
            <SideNavItem icon="cloud">first link with icon</SideNavItem>
            <SideNavItem href='#!second'>Second Link</SideNavItem>
            <SideNavItem divider />
            <SideNavItem subheader>Subheader</SideNavItem>
            {auth.uid ? 
                <SideNavItem waves href onClick={signOut}>Log Out</SideNavItem> :
                <SideNavItem waves href><NavLink to='/signin'>Login</NavLink></SideNavItem>}
        </SideNav>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    nav: state.nav,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut()),
      changeStudent: (value) => dispatch(changeStudent(value)),      
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SideNavMenu)