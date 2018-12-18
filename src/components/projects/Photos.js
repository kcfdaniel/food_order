import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitMealOrder } from '../../store/actions/mealActions'
import { Redirect } from 'react-router-dom'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import moment from 'moment'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import CompletenessSlider from '../layout/CompletenessSlider';
import Slider from '@material-ui/lab/Slider';

class Photos extends Component {
  state = {
    fruitsCompleteness: 50,
    grainsCompleteness: 50,
    proteinCompleteness: 50,
    vegetablesCompleteness: 50
  }

  handleChange = (event, value, key) => {
    console.log(this.state.grainsValue)
    // console.log(this.state.grainsValue)
    this.setState({
      [key]: value 
    });
  };

  render() {
    const { auth, recentMealRecord } = this.props;
    const { fruitsCompleteness, grainsCompleteness, proteinCompleteness, vegetablesCompleteness } = this.state;
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
        <Collapsible accordion popout defaultActiveKey={activeIndex}>
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
              <CompletenessSlider name="fruitsCompleteness" value={fruitsCompleteness} handleChange={(event,value) => this.handleChange(event,value, "fruitsCompleteness")}/>
              <CompletenessSlider name="grainsCompleteness" value={grainsCompleteness} handleChange={(event,value) => this.handleChange(event,value, "grainsCompleteness")}/>
              <CompletenessSlider name="proteinCompleteness" value={proteinCompleteness} handleChange={(event,value) => this.handleChange(event,value, "proteinCompleteness")}/>
              <CompletenessSlider name="vegetablesCompleteness" value={vegetablesCompleteness} handleChange={(event,value) => this.handleChange(event,value, "vegetablesCompleteness")}/>
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
