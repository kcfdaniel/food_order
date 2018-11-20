import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Input, Collection, CollectionItem } from 'react-materialize'
import moment from 'moment'
import Slider from "react-slick";

class CreateProject extends Component {
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
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    let months = 
      [ new Date(2019, 1),
        new Date(2019, 0),
        new Date(2018, 11),
      ]
    let months_formated = months.map((month) => moment(month).format("MMM YYYY"))
    let selectorOptions = [
      <option key={0} value={months[0]}>{months_formated[0]}</option>,
      <option key={1} value={months[1]}>{months_formated[1]}</option>,
      <option key={2} value={months[2]}>{months_formated[2]}</option>,
    ]

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
        <Input s={12}
          type='select' 
          label={'Select Month'} 
          defaultValue={'1222'}
          onChange={(_,month) => {
            console.log(month)
          }}>
              {selectorOptions}
        </Input>


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

        <form onSubmit={this.handleSubmit} className="white">
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
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)