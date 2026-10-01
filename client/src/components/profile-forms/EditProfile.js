import Icon from '../ui/Icon';
import React,{Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile,getCurrentProfile} from '../../actions/profile';
import {Link,useNavigate} from 'react-router-dom';

const EditProfile = ({profile:{profile},createProfile,getCurrentProfile}) => {
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

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);

    useEffect(()=>{
        if(!profile){
            return;
        }

        setFormData({
            company:profile.company || '',
            website:profile.website || '',
            location:profile.location || '',
            status:profile.status || '',
            skills:profile.skills ? profile.skills.join(',') : '',
            githubusername:profile.githubusername || '',
            bio:profile.bio || '',
            twitter:profile.social?.twitter || '',
            facebook:profile.social?.facebook || '',
            linkedin:profile.social?.linkedin || '',
            youtube:profile.social?.youtube || '',
            instagram:profile.social?.instagram || ''
        });
    },[profile]);

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit =async e=>{
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try { await createProfile(formData,navigate,true); } finally { setSubmitting(false); }
    }

    return(
        <Fragment>
            <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <Icon name="users" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="EditProfile-status">Professional status</label>
          <select id="EditProfile-status" name="status" value={status} onChange={e=>setFormData({...formData,status:e.target.value})}>
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
          <label htmlFor="EditProfile-company">Company</label>
          <input id="EditProfile-company" type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="EditProfile-website">Website</label>
          <input id="EditProfile-website" type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="EditProfile-location">Location</label>
          <input id="EditProfile-location" type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="EditProfile-skills">Skills</label>
          <input id="EditProfile-skills" type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="EditProfile-githubusername">GitHub username</label>
          <input id="EditProfile-githubusername"
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
          <label htmlFor="EditProfile-bio">Bio</label>
          <textarea id="EditProfile-bio" placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
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
          <label htmlFor="EditProfile-twitter">Twitter URL</label>
          <input id="EditProfile-twitter" type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="EditProfile-facebook">Facebook URL</label>
          <input id="EditProfile-facebook" type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="EditProfile-youtube">YouTube URL</label>
          <input id="EditProfile-youtube" type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="EditProfile-linkedin">LinkedIn URL</label>
          <input id="EditProfile-linkedin" type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <Icon name="link" />
          <label htmlFor="EditProfile-instagram">Instagram URL</label>
          <input id="EditProfile-instagram" type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
        </div>
        </Fragment>}
        <input type="submit" className="btn btn-primary my-1" disabled={submitting} aria-busy={submitting} value={submitting ? 'Saving...' : 'Save changes'} />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

EditProfile.propTypes={
    createProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired
};

const mapStateToProps=state=>({
    profile:state.profile
});

export default connect(mapStateToProps, { createProfile,getCurrentProfile })(EditProfile);
