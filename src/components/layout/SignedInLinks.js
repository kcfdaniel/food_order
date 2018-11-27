import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props);
  const { profile, nav } = props;

  return (
  <div>
    <ul className="right">
      <li style={{lineHeight: 1, marginTop: 5}}>
        <NavLink to='/' className="center">
          <img className='right-align btn-small btn-floating pink lighten-1' src={"img/yuna.jpg"} />
          <br/>
          <small className="truncate">
              {
                profile.students ? 
                (nav.studentID ? (profile.students.find(obj => obj.studentID == nav.studentID).studentName) : profile.students[0].studentName) : 
                ""
              }
          </small>
        </NavLink>
      </li>
    </ul>
    <ul className="right hide-on-med-and-down">
      <li><a onClick={props.signOut}>Log Out</a></li>
    </ul>
  </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
      profile: state.firebase.profile, 
      nav: state.nav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)