import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Input, Collection, CollectionItem } from 'react-materialize'
import moment from 'moment'
import Slider from "react-slick";
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class LunchMenu extends Component {
  state = {

  }
  handleChangeDay = () => {
    
  }
  handleSelectMeal = (day, choice) => {
    this.setState({
      ...this.state,
      [day]: choice
    }, () => {console.log(this.state)})
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state)
    this.props.history.push('/');
  }
  render() {
    const { auth, menu } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    // allow select month
    // let months = []
    // for (let year in meals){
    //   for (let month in meals[year]){
    //     months.push(new Date(year, month-1))
    //   }
    // }

    // let selectorOptions = months.map((month) => (
    //   <option key={String(month)} value={month}>{moment(month).format("MMM YYYY")}</option>
    // ))

    var settings = {
      dots: true,
      infinite: false,
      vertical: false,
      verticalSwiping: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      customPaging: function(i) {
        return (
          <ul>
            <li className="waves-effect">
              <a>
                {i+1}
              </a>
            </li>
          </ul>
        );
      },
    };

    return (
      <div className="container">
        {/* allow select month */}
        {/* <Input s={12}
          type='select' 
          label={'Select Month'} 
          defaultValue={''}
          onChange={(_,value) => {
            let date = new Date(value)
            let year = date.getFullYear()
            let month = date.getMonth() + 1

            console.log(meals[year][month])
          }}>
              {selectorOptions}
        </Input> */}


        <Slider {...settings}>
          {menu ? menu[Object.keys(menu)[0]].days.map(day => 
            <div>
              <b>{day.day}</b>
              <Collection>
                {day.choices.map(choice => 
                <CollectionItem href active={this.state[day.day] ? this.state[day.day].choice == choice.choice : false}  onClick={() => this.handleSelectMeal(day.day, choice)}>{choice.choice}: {choice.name}</CollectionItem>
              )}
            </Collection>
            </div>
            ) : ""}
      </Slider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.data.menus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // when the projects collections updatesin firestore, it will automatically trigger the firestore reducer
  firestoreConnect([
    { collection: "menus", 
    where: ["month", "==", moment().add(1, 'month').startOf('month').format('YYYY-MM')], 
    },
  ])
)(LunchMenu)