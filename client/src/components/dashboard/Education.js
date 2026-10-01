import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profile'



const Education = ({education,deleteEducation}) => {
    const educations=education.map(edu=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                {edu.current || !edu.to?' Now':<Moment format="YYYY/MM/DD">{edu.to}</Moment>}
            </td>
            <td><button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button></td>
        </tr>
    ));
  return (
    <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <div className="table-wrap" role="region" aria-label="Education credentials" tabIndex="0"><table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th className="hide-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educations.length ? educations : <tr><td colSpan="4">No education added yet.</td></tr>}
          </tbody>
        </table></div>
      </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(Education)
