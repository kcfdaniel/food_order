import React, {Component} from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Slider from "react-slick";
import { Row, Input } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { updateStudent } from '../../store/actions/studentActions'

class Profile extends Component {
  state = {

  }
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.nicknameInput.focus();
  }

  componentWillReceiveProps(props){
    let student = props.profile.students ? props.profile.students[props.student.studentID] : {};
    if (!student.pictureURL){
      this.setState({
        ...student,
        pictureURL: props.profile_pic_urls[0]
      },()=>{
        this.pictureSlider.slickGoTo(0);
      });
    }
    else{
      this.setState({
        ...student,
      },()=>{
        this.pictureSlider.slickGoTo(props.profile_pic_urls.indexOf(student.pictureURL));
      });
    }
  }

  handleChange = (e) => {
    if (e.target.name != "allergies"){
      this.setState({
        [e.target.id]: e.target.value
      })
    }
    else{
      //if allergies are changed
      const allergies = this.state.allergies;
      allergies[e.target.id] = e.target.checked
      this.setState({
        allergies
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form")
    this.props.updateStudent(this.state);
    //
  }
  render() {
    const { profile, student, auth, profile_pic_urls } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    var settings = {
      dots: false,
      infinite: true,
      vertical: false,
      verticalSwiping: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      initialSlide: 0,
      // centerPadding: 0,
      slidesToShow: 1,
      variableWidth: true,
      minWidth: 350,
      customPaging: function(i) {
        return (
          <ul>
            <li className="waves-effect">
              <a>
                {i}
              </a>
            </li>
          </ul>
        );
      },
      afterChange: (index) => {
        this.setState({
          pictureURL: profile_pic_urls[index]
        })
      }
    };
    console.log("window.innerWidth: " + window.innerWidth);
    console.log("studentID: " + student.studentID);
    console.log(this.state);
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h3 className="grey-text text-darken-3 center">About Me</h3>
          <p className="grey-text text-darken-3">Student Full Name: {profile.students ? profile.students[student.studentID].fullname : ""}</p>
          <p className="grey-text text-darken-3">Student ID: {profile.students ? profile.students[student.studentID].studentID : ""}</p>
          <div className="input-field">
            <label htmlFor="nickname">Nickname</label>
            <input type="text" id="nickname" onChange={this.handleChange} value={this.state.nickname} ref={(input) => { this.nicknameInput = input; }} />
          </div>
          <h5 className="grey-text text-darken-3">Profile Picture</h5>
          <div className="row">
            <div className="col m2">
            </div>
            <div className="col s12 m8">
              <Slider {...settings} ref={(slider) => { this.pictureSlider = slider; }}>
                {profile_pic_urls ? profile_pic_urls.map(url => 
                  (<div className="profile_pic_slide" key={url}><img style={{margin: "10px",maxWidth: window.innerWidth - 210, maxHeight: window.innerWidth - 210 }} src={url} alt="Image" height="240" width="240"/></div>)): ""}
              </Slider>
            </div>
            <div className="col s2 m2">
            </div>
          </div>
          <h5 className="grey-text text-darken-3">Allergies</h5>
          <Row>
            <Input id="beef" onChange={this.handleChange} name='allergies' type='checkbox' value='beef' label='beef' className='filled-in' checked={this.state.allergies ? this.state.allergies.beef : false} />
            <Input id="nuts" onChange={this.handleChange} name='allergies' type='checkbox' value='nuts' label='nuts' className='filled-in' checked={this.state.allergies ? this.state.allergies.nuts : false}/>
            <Input id="egg" onChange={this.handleChange} name='allergies' type='checkbox' value='egg' label='egg' className='filled-in' checked={this.state.allergies ? this.state.allergies.egg : false}/>
          </Row>
          <div className="input-field">
            {/* <label htmlFor="content">Project Content</label> */}
            {/* <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea> */}
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let profile_pics_doc = state.firestore.data.profile_pics
  let profile_pic_urls = profile_pics_doc ? profile_pics_doc[0]["profile_pic_urls"]: []
  return {
    profile: state.firebase.profile,
    student: state.student,
    auth: state.firebase.auth,
    profile_pic_urls
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student))
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // when the projects collections updatesin firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    { collection: 'profile_pics' },
  ])
)(Profile)

// export default Profile