import Icon from '../ui/Icon';
import React from 'react';
import {Link} from 'react-router-dom';

const DashboardAction = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><Icon name="users" /> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><Icon name="link" /> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><Icon name="book" /> Add Education</Link>
      </div>

   )
};

export default DashboardAction;
