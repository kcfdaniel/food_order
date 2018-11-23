import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props);
  return (
  <div>
    <ul className="right">
      <li style={{lineHeight: 1, marginTop: 5}}>
        <NavLink to='/' className='btn-small btn-floating pink lighten-1'>
          <img src={"img/yuna.jpg"} />
        </NavLink>
        <br/>
        <small className="col s1">
            {props.profile.students? props.profile.students[0].studentName : ""}
        </small>
      </li>
    </ul>
    <ul className="right hide-on-med-and-down">
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