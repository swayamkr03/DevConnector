import Icon from '../ui/Icon';
import React,{Fragment,useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEducation} from '../../actions/profile'
import {Link,useNavigate} from 'react-router-dom'

const AddEducation = props => {
    const navigate=useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled,toggleDisabled]=useState(false);
    const {school,degree,fieldofstudy,from,to,current,description}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
  return (
    <Fragment>
        <h1 className="large text-primary">
       Add An Education
      </h1>
      <p className="lead">
        <Icon name="branch" /> Add your studies, qualifications, and learning experience
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={async e=>{
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try { await props.addEducation(formData,navigate); } finally { setSubmitting(false); }
      } }>
        <div className="form-group">
          <label htmlFor="AddEducation-school">School</label>
          <input id="AddEducation-school" type="text" placeholder="* School" name="school" value={school} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddEducation-degree">Degree</label>
          <input id="AddEducation-degree" type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddEducation-fieldofstudy">Field of study</label>
          <input id="AddEducation-fieldofstudy" type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy   } onChange={onChange} />
        </div>
        <div className="form-group">

          <label htmlFor="AddEducation-from">From date</label>
          <input id="AddEducation-from" type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" aria-label="Currently here" name="current" checked={current} onChange={e=>{
            setFormData({...formData,current:e.target.checked});
            toggleDisabled(!toDateDisabled);
          }} /> Current School</p>
        </div>
        <div className="form-group">

          <label htmlFor="AddEducation-to">To date</label>
          <input id="AddEducation-to" type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled} />
        </div>
        <div className="form-group">
          <label htmlFor="AddEducation-description">Description</label>
          <textarea id="AddEducation-description"
            name="description"
            cols="30"
            rows="5"
            placeholder="Describe your studies"
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

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation)
