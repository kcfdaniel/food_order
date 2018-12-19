import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class SignedOutLinks extends Component {
  render() {
    return (
      <ul className="right">
        {/* <li><NavLink to='/signup'>Signup</NavLink></li> */}
        <li><NavLink to='/admin/signin'>Login</NavLink></li>
      </ul>
    )
  }
}

export default SignedOutLinks