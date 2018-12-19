import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { submitMealOrder } from '../../store/actions/mealActions'
import { Redirect } from 'react-router-dom'
import { Input, Collection, CollectionItem } from 'react-materialize'
import moment from 'moment'
import Slider from "react-slick";
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class LunchMenu extends Component {
  state = {

  }
  componentWillMount(){

  }
  handleChangeDay = () => {

  }
  handleSelectMeal = (day, choice) => {
    let menu = this.props.menu
    if (menu){
      let month = moment(menu[Object.keys(menu)[0]].month, "YYYY-MM")
      let date = month.clone().add(day-1, 'day').format('YYYY-MM-DD');
      console.log(date)
      let studentID = this.props.student.studentID
      this.setState({
        ...this.state,
        [studentID + "_" + date]: {...choice,
                studentID,
                date,
                picURLs: [],
                fruitCompleteness: 50,
                vegetableComepleteness: 50,
                proteinCompleteness: 50,
                grainsCompleteness: 50,
                }
      }, () => {console.log(this.state)})
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.createProject(this.state)
    // this.props.history.push('/');
    this.props.submitMealOrder(this.state)
  }
  render() {
    const { auth, menu, student, nextMonthMealRecord } = this.props;
    const studentID = student.studentID
    const month = menu ? moment(menu[Object.keys(menu)[0]].month, "YYYY-MM") : {}
    const allergies = student.allergies ? Object.keys(student.allergies).reduce((previous, key) => {
      if (student.allergies[key]){
        previous.push(key)
        return previous
      }
      else{
        return previous
      }
    }, []) : [];
    if (!auth.uid) return <Redirect to='/signin' />
    console.log(student)
    console.log(nextMonthMealRecord)
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
      (nextMonthMealRecord == null || nextMonthMealRecord.length === 0 ? 
        <div className="container">
        <Slider {...settings}>
          {menu ? menu[Object.keys(menu)[0]].days.map(day => 
            <div>
              <b>{day.day}</b>
              <Collection>
                {day.choices.map(choice => {
                  const ingredients = choice.ingredients ? Object.keys(choice.ingredients).reduce((previous, key) => {
                    if (choice.ingredients[key]){
                      previous.push(key)
                      return previous
                    }
                    else{
                      return previous
                    }
                  }, []) : [];
                  var enabled = true

                  for (let i = 0; i < allergies.length; i++) { 
                    if (ingredients.includes(allergies[i])){
                      enabled = false
                      console.log("allergic!")
                      break
                    }
                  }
                  console.log(ingredients)
                  let date = month.clone().add(day.day-1, 'day').format('YYYY-MM-DD')
                  console.log(date)
                  return(
                    <CollectionItem href={enabled}
                      active={enabled ? (this.state[studentID + "_" + date] ? this.state[studentID + "_" + date].choice == choice.choice : false ) : false}  
                      onClick={enabled ? (() => this.handleSelectMeal(day.day, choice)) : () => {}}>
                      {choice.choice}: {choice.name}
                    </CollectionItem>
                  )
                }
              )}
            </Collection>
            </div>
            ) : ""}
      </Slider>
      <form onSubmit={this.handleSubmit}>
        <button className="btn pink lighten-1 z-depth-0">Submit</button>
      </form>
      </div> 
        :
        <div className="container">
          <Collection>
            {nextMonthMealRecord.map(mealRecord => (
              <CollectionItem href >
                {mealRecord.date} : {mealRecord.choice} {mealRecord.name}
              </CollectionItem>
            ))}
          </Collection>
        </div> 
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.data.menus,
    student: state.student,
    nextMonthMealRecord: state.meal.nextMonthMealRecord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createProject: (project) => dispatch(createProject(project)),
    submitMealOrder: (orderList) => dispatch(submitMealOrder(orderList)),
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