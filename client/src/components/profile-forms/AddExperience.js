import Icon from '../ui/Icon';
import React,{Fragment,useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'
import {Link,useNavigate} from 'react-router-dom'

const AddExperience = props => {
    const navigate=useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [formData,setFormData]=useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled,toggleDisabled]=useState(false);
    const {title,company,location,from,to,current,description}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
  return (
    <Fragment>
        <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <Icon name="branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={async e=>{
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try { await props.addExperience(formData,navigate); } finally { setSubmitting(false); }
      } }>
        <div className="form-group">
          <label htmlFor="AddExperience-title">Job title</label>
          <input id="AddExperience-title" type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddExperience-company">Company</label>
          <input id="AddExperience-company" type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddExperience-location">Location</label>
          <input id="AddExperience-location" type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div className="form-group">

          <label htmlFor="AddExperience-from">From date</label>
          <input id="AddExperience-from" type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" aria-label="Currently here" name="current" checked={current} onChange={e=>{
            setFormData({...formData,current:e.target.checked});
            toggleDisabled(!toDateDisabled);
          }} /> Current Job</p>
        </div>
        <div className="form-group">

          <label htmlFor="AddExperience-to">To date</label>
          <input id="AddExperience-to" type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled} />
        </div>
        <div className="form-group">
          <label htmlFor="AddExperience-description">Description</label>
          <textarea id="AddExperience-description"
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" disabled={submitting} aria-busy={submitting} value={submitting ? 'Saving...' : 'Save changes'} />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>

    </Fragment>
  )
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)
