import React from 'react'
import {SideNav, SideNavItem, Row, Input} from 'react-materialize'
import { connect } from 'react-redux'  
import { signOut } from '../../store/actions/authActions'
import { changeStudent } from '../../store/actions/studentActions'
import { NavLink } from 'react-router-dom'

const SideNavMenu = (props) => {
  const { student, auth, profile, signOut, changeStudent } = props;
  console.log("profile:");
  console.log(profile);
  console.log(student.studentID);
  // console.log(profile.students ? profile.students[student.studentID] : "");
  let options = profile.students ? Object.keys(profile.students).map((s) => <option selected={profile.students[s] == student.studentID ? true : false} value={profile.students[s]}>{s}</option>) : []

  function handleChangeStudent(_,value){
    console.log(value)
    changeStudent(value);
  }

  console.log(student.studentID)

  return (
        <SideNav
            trigger={<a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>}
            options={{ closeOnClick: true }}
            >
            <SideNavItem userView
                user={{
                background: 'img/office.jpg',
                image: student.pictureURL ? student.pictureURL : "img/yuna.jpg",
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
    student: state.student,
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