import React from 'react';
import Moment from 'react-moment';
export default function ProfileEducation({ education: { school, degree, fieldofstudy, from, to, current, description } }) {
  return <div><h3 className="text-dark">{school}</h3>
    <p><Moment format="YYYY/MM/DD">{from}</Moment> - {current || !to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
    <p><strong>Degree: </strong>{degree}</p><p><strong>Field of Study: </strong>{fieldofstudy}</p>
    {description && <p><strong>Description: </strong>{description}</p>}
  </div>;
}
