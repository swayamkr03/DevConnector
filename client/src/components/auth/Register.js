import React, {useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert,register,isAuthenticated}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData,setFormData]=useState({ 
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name,email,password,password2}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        if(password!==password2){
            setAlert('Passwords do not match', 'danger');
        }else{
            if (submitting) return;
            setSubmitting(true);
            try { await register({name,email,password}); } finally { setSubmitting(false); }
        }
    };

    if(isAuthenticated){
        return <Navigate to="/dashboard" replace />
    }

    return <section className="auth-page"><h1 className="large text-primary">Sign Up</h1>
      <p className="lead">A place for your developer story.</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" id="name" autoComplete="name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" placeholder="Email Address" id="email" autoComplete="email" name="email" value={email} onChange={onChange} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password" autoComplete="new-password" name="password"
            value={password}    
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="password2" autoComplete="new-password" name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting} value={submitting ? 'Please wait...' : 'Register'} />
      </form>
      <p className  ="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p></section>;
};

Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})


export default connect(mapStateToProps,{setAlert,register})(Register);
