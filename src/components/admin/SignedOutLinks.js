import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class SignedOutLinks extends Component {
  render() {
    return (
      <Button color="inherit" component={NavLink} to='/admin/signin'>Login</Button>
    )
  }
}

export default SignedOutLinks