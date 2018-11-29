import React, {Component} from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {storage} from '../../config/fbConfig';
import Slider from "react-slick";
import { Row, Input } from 'react-materialize'

class Profile extends Component {
  state = {
    profile_pic: ""
  }
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form")
    //
  }
  render() {
    const { profile_pic_urls } = this.props;

    var settings = {
      dots: true,
      infinite: true,
      vertical: false,
      verticalSwiping: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
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
        console.log(index)
        this.setState({
          profile_pic: index
        })
      }
    };
    console.log(window.innerWidth);
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h3 className="grey-text text-darken-3 center">About Me</h3>
          <div className="input-field">
            <label htmlFor="nickname">Nickname</label>
            <input type="text" id="nickname" onChange={this.handleChange}/>
          </div>
          <h5 className="grey-text text-darken-3">Profile Picture</h5>
          <div class="row">
            <div className="col m2">
            </div>
            <div className="col s12 m8">
              <Slider {...settings}>
                {profile_pic_urls ? profile_pic_urls.map(url => 
                  (<div className="profile_pic_slide"><img style={{margin: "10px",maxWidth: window.innerWidth - 200, maxHeight: window.innerWidth - 200 }} src={url} alt="Image" height="240" width="240"/></div>)): ""}
              </Slider>
            </div>
            <div className="col s2 m2">
            </div>
          </div>
          <h5 className="grey-text text-darken-3">Allergies</h5>
          <Row>
            <Input name='group1' type='checkbox' value='beef' label='beef' className='filled-in' checked />
            <Input name='group1' type='checkbox' value='nuts' label='nuts' className='filled-in' />
            <Input name='group1' type='checkbox' value='egg' label='egg' className='filled-in' />
          </Row>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
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
    profile_pic_urls
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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