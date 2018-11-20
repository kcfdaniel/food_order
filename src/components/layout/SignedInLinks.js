import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props);
  return (
  <div>
    <ul className="right">
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>
        <img src={"img/yuna.jpg"} />
        {/* {props.profile.initials} */}
      </NavLink>
      {props.profile.firstName}
      </li>
    </ul>
    <ul className="right hide-on-med-and-down">
      <li><NavLink to='/create'>New Project</NavLink></li>
      <li><a onClick={props.signOut}>Log Out</a></li>
    </ul>
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)