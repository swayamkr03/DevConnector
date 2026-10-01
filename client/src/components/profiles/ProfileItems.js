import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItems = ({profile:{
    user:{_id,name,avatar},
    status,
    company,
    location,
    skills
}}) => {
  return (
    <div className="profile bg-light">
        <img src={avatar} alt="" className="round-img"/>
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{company}</p>
        <p>{location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="text-primary">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

ProfileItems.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileItems
