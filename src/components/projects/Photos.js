import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitMealOrder } from '../../store/actions/mealActions'
import { Redirect } from 'react-router-dom'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import moment from 'moment'
import Slider from "react-slick";
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Photos extends Component {
  state = {

  }

  render() {
    const { auth, recentMealRecord } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    //real today
    // let today = mealRecord.date == moment().format('YYYY-MM-DD')
    
    //dummy today for ui testing
    let today = "2018-12-04"

    console.log(recentMealRecord)
    console.log(recentMealRecord ? recentMealRecord.findIndex(mealRecord => mealRecord.date == today) : "")
    let activeIndex = recentMealRecord ? recentMealRecord.findIndex(mealRecord => mealRecord.date == today) : ""
    return (
      <div className="container">
        {recentMealRecord ?
        <Collapsible popout defaultActiveKey={activeIndex}>
          {recentMealRecord.map(mealRecord => {
            let isToday = mealRecord.date == today
            return <CollapsibleItem 
                      key={mealRecord.date} 
                      header={
                        <div className="grey-text text-darken-3">
                          {isToday ? "Today: " : ""}
                          <img className='btn-small btn-floating' src={ mealRecord.picURLs[mealRecord.picURLs.length - 1] ? mealRecord.picURLs[mealRecord.picURLs.length - 1] : "img/yuna.jpg"} />
                          {mealRecord.date} : {mealRecord.choice} {mealRecord.name}
                        </div>
                      }
                    >
              <img className='' height="240" width="240" src={ mealRecord.picURLs[mealRecord.picURLs.length - 1] ? mealRecord.picURLs[mealRecord.picURLs.length - 1] : "img/yuna.jpg"} />
            </CollapsibleItem>
          })}
        </Collapsible>
        : ""}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    menu: state.firestore.data.menus,
    student: state.student,
    recentMealRecord: state.meal.recentMealRecord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createProject: (project) => dispatch(createProject(project)),
    submitMealOrder: (orderList) => dispatch(submitMealOrder(orderList)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
