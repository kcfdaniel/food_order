import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props);
  const { profile, student } = props;
  console.log(student);
  // console.log(profile.students ? profile.students[student.studentID].pictureURL : "");
  return (
  <div>
    <ul className="right">
      <li style={{lineHeight: 1, marginTop: 5}}>
        <NavLink to='/' className="center">
          <img className='right-align btn-small btn-floating pink lighten-1' src={ student.pictureURL? student.pictureURL : "img/yuna.jpg"} />
          <br/>
          <small className="truncate">
              {
                student != {} ? 
                  (student.nickname != "" ? 
                  student.nickname
                      : student.fullname
                  ) 
                  : ""
              }
              {/* {
                profile.students ? 
                  (student.studentID ? 
                    (profile.students[student.studentID].nickname != "" ? 
                      profile.students[student.studentID].nickname
                       : profile.students[student.studentID].fullname
                    ) :(profile.students[Object.keys(profile.students)[0]].nickname != "" ? 
                      profile.students[Object.keys(profile.students)[0]].nickname
                      : profile.students[Object.keys(profile.students)[0]].fullname
                    )
                  ) : ""
              } */}
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
      student: state.student
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)