import React from 'react'
import moment from 'moment'
import { Card, CardTitle } from 'react-materialize'

const ProjectSummary = ({project}) => {
  return (
    <Card header={<CardTitle reveal image={"img/office.jpg"} waves='light'/>}
      title="Card Title"
      reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
      <p><a href="#">This is a link</a></p>
    </Card>

    // <div className="card z-depth-0 project-summary">
    //   <div className="card-content grey-text text-darken-3">
    //     <span className="card-title">{project.title}</span>
    //     <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
    //     <p className="grey-text">{moment(project.createAt.toDate()).calendar()}</p>
    //   </div>
    // </div>
  )
}

export default ProjectSummary