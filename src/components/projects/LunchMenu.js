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
    let date = moment().add(1, 'month').startOf('month').add(day-1, 'day').format('YYYY-MM-DD');
    let studentDocID = this.props.student.studentID
    this.setState({
      ...this.state,
      [studentDocID + "_" + date]: {...choice,
              studentDocID,
              date,
              picURL: "",
              fruitCompleteness: 50,
              vegetableComepleteness: 50,
              proteinCompleteness: 50,
              grainsCompleteness: 50,
              }
    }, () => {console.log(this.state)})
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.createProject(this.state)
    this.props.history.push('/');
    this.props.submitMealOrder(this.state)
  }
  render() {
    const { auth, menu, student, nextMonthMealRecord } = this.props;
    const studentDocID = student.studentID
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
      (nextMonthMealRecord == null || Object.keys(nextMonthMealRecord).length === 0 ? 
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
                  return(
                    <CollectionItem href={enabled}
                      active={enabled ? (this.state[studentDocID + "_" + moment().add(1, 'month').startOf('month').add(day.day-1, 'day').format('YYYY-MM-DD')] ? this.state[studentDocID + "_" + moment().add(1, 'month').startOf('month').add(day.day-1, 'day').format('YYYY-MM-DD')].choice == choice.choice : false ) : false}  
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
            {Object.keys(nextMonthMealRecord).map(key => (
              <CollectionItem href >
                {nextMonthMealRecord[key].date} : {nextMonthMealRecord[key].choice} {nextMonthMealRecord[key].name}
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
  firestoreConnect(props => [
    { collection: "menus", 
    where: ["month", "==", moment().add(1, 'month').startOf('month').format('YYYY-MM')], 
    },
    { collection: "mealRecords",
  where: [["date", ">=", moment().add(1, 'month').startOf('month').format('YYYY-MM-DD')],
          ["date", "<=", moment().add(1, 'month').endOf('month').format('YYYY-MM-DD')],
          ["studentDocID", "==", props.student.studentID]]
  }])
)(LunchMenu)