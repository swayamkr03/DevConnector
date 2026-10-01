import Icon from '../ui/Icon';
import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {Link,useNavigate} from 'react-router-dom';

const CreateProfile = ({createProfile}) => {
    const navigate=useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const[formData,setFormData]=useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    });

    const {company,website,location,status,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram}=formData;

    const [dispalySocialInputs,toggleSocialInputs]=useState(false);

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit =async e=>{
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try { await createProfile(formData,navigate); } finally { setSubmitting(false); }
    }

    return(
        <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <Icon name="users" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="CreateProfile-status">Professional status</label>
          <select id="CreateProfile-status" name="status" value={status} onChange={e=>setFormData({...formData,status:e.target.value})}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-company">Company</label>
          <input id="CreateProfile-company" type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-website">Website</label>
          <input id="CreateProfile-website" type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-location">Location</label>
          <input id="CreateProfile-location" type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-skills">Skills</label>
          <input id="CreateProfile-skills" type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-githubusername">GitHub username</label>
          <input id="CreateProfile-githubusername"
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="CreateProfile-bio">Bio</label>
          <textarea id="CreateProfile-bio" placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={()=>toggleSocialInputs(!dispalySocialInputs)}>
            {dispalySocialInputs ? 'Hide Social Network Links' : 'Add Social Network Links'}
          </button>
          <span>Optional</span>
        </div>

        {dispalySocialInputs && <Fragment>
        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="CreateProfile-twitter">Twitter URL</label>
          <input id="CreateProfile-twitter" type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="CreateProfile-facebook">Facebook URL</label>
          <input id="CreateProfile-facebook" type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="CreateProfile-youtube">YouTube URL</label>
          <input id="CreateProfile-youtube" type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="CreateProfile-linkedin">LinkedIn URL</label>
          <input id="CreateProfile-linkedin" type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="CreateProfile-instagram">Instagram URL</label>
          <input id="CreateProfile-instagram" type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
        </div>
        </Fragment>}
        <input type="submit" className="btn btn-primary my-1" disabled={submitting} aria-busy={submitting} value={submitting ? 'Saving...' : 'Save changes'} />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

CreateProfile.propTypes={
    createProfile:PropTypes.func.isRequired
};

export default connect(null, { createProfile })(CreateProfile);
