import React from 'react'
import {SideNav, SideNavItem, Row, Input} from 'react-materialize'
import { connect } from 'react-redux'  
import { signOut } from '../../store/actions/authActions'
import { changeStudent } from '../../store/actions/studentActions'
import { NavLink } from 'react-router-dom'
import {Menu} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//material ui
const styles = theme => ({
  icon: {
    // backgroundColor: 'white',
  },
});

class SideNavMenu extends React.Component  {
  render(){
    const { student, auth, profile, signOut, changeStudent, menu, classes} = this.props;
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
          trigger={<i style={{"margin-left":"-10px" ,width:"50px"}} className="material-icons waves-effect center-align">menu</i>}
          // trigger={<a href="#">dfdf</a>}
          options={{ closeOnClick: true }}
          >
          {auth.uid ? 
            <div>
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
            <SideNavItem waves href onClick={signOut}>Log Out</SideNavItem>
            </div> :
          <SideNavItem waves href><NavLink to='/signin'>Login</NavLink></SideNavItem>}
      </SideNav>
    )
            }
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

SideNavMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideNavMenu));