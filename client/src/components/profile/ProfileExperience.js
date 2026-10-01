import React from 'react';
import Moment from 'react-moment';
export default function ProfileExperience({ experience: { company, title, location, from, to, current, description } }) {
  return <div><h3 className="text-dark">{company}</h3>
    <p><Moment format="YYYY/MM/DD">{from}</Moment> - {current || !to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
    <p><strong>Position: </strong>{title}</p>
    {location && <p><strong>Location: </strong>{location}</p>}
    {description && <p><strong>Description: </strong>{description}</p>}
  </div>;
}
