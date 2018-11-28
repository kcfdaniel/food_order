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
    title: '',
    content: '',
    selectedMeal: 'A',
  }
  handleChangeDay = () => {
    
  }
  handleSelectMeal = (meal) => {
    this.setState({
      selectedMeal: meal
    })
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
    // console.log(this.state)
  }
  render() {
    const { auth, meals } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    console.log(meals)
    
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
          <div>
            <b>Monday</b>
            <Collection>
              <CollectionItem href active={this.state.selectedMeal == 'A'} onClick={() => this.handleSelectMeal('A')}>A: mealA</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'B'} onClick={() => this.handleSelectMeal('B')}>B: mealB</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'C'} onClick={() => this.handleSelectMeal('C')}>C: mealC</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'D'} onClick={() => this.handleSelectMeal('D')}>D: mealD</CollectionItem>
            </Collection>
          </div>
          <div>
            <b>Tuesday</b>
            <Collection>
              <CollectionItem href active={this.state.selectedMeal == 'A'} onClick={() => this.handleSelectMeal('A')}>A: mealA</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'B'} onClick={() => this.handleSelectMeal('B')}>B: mealB</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'C'} onClick={() => this.handleSelectMeal('C')}>C: mealC</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'D'} onClick={() => this.handleSelectMeal('D')}>D: mealD</CollectionItem>
            </Collection>
          </div>
          <div>
            <b>Wednesday</b>
            <Collection>
              <CollectionItem href active={this.state.selectedMeal == 'A'} onClick={() => this.handleSelectMeal('A')}>A: mealA</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'B'} onClick={() => this.handleSelectMeal('B')}>B: mealB</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'C'} onClick={() => this.handleSelectMeal('C')}>C: mealC</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'D'} onClick={() => this.handleSelectMeal('D')}>D: mealD</CollectionItem>
            </Collection>
          </div>
          <div>
            <b>Thursday</b>
            <Collection>
              <CollectionItem href active={this.state.selectedMeal == 'A'} onClick={() => this.handleSelectMeal('A')}>A: mealA</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'B'} onClick={() => this.handleSelectMeal('B')}>B: mealB</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'C'} onClick={() => this.handleSelectMeal('C')}>C: mealC</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'D'} onClick={() => this.handleSelectMeal('D')}>D: mealD</CollectionItem>
            </Collection>
          </div>
          <div>
            <b>Friday</b>
            <Collection>
              <CollectionItem href active={this.state.selectedMeal == 'A'} onClick={() => this.handleSelectMeal('A')}>A: mealA</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'B'} onClick={() => this.handleSelectMeal('B')}>B: mealB</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'C'} onClick={() => this.handleSelectMeal('C')}>C: mealC</CollectionItem>
              <CollectionItem href active={this.state.selectedMeal == 'D'} onClick={() => this.handleSelectMeal('D')}>D: mealD</CollectionItem>
            </Collection>
          </div>
      </Slider>

        {/* <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    meals: state.firestore.ordered.meals
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
    { collection: 'meals', 
    whereEqualTo: ["restaurantID", 0], 
    where: [
      ["date", ">=", moment().add(1, 'month').startOf('month').format('YYYY-MM-DD')], 
      ["date", "<=", moment().add(1, 'month').endOf('month').format('YYYY-MM-DD')]], 
    orderBy: ['date', 'desc']},
  ])
)(LunchMenu)