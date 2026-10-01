import React, {useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login,isAuthenticated}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData,setFormData]=useState({ 
        email: '',
        password: '',
    });

    const {email,password}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try { await login(email,password); } finally { setSubmitting(false); }
    };

    //redirect if logged in
    if(isAuthenticated){
        return <Navigate to="/dashboard" replace />
    }


    return <section className="auth-page"><h1 className="large text-primary">Sign In</h1>
      <p className="lead">Welcome back. Your community is waiting.</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" placeholder="Email Address" id="email" autoComplete="email" name="email" value={email} onChange={onChange} />

        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password" autoComplete="current-password" name="password"
            value={password}    
            onChange={onChange}
            minLength="6"
          />
        </div>
        
        <input type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting} value={submitting ? 'Please wait...' : 'Sign In'} />
      </form>
      <p className  ="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p></section>;
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};
export default connect(mapStateToProps,{login})(Login);
