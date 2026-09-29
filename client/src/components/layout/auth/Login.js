import React, {Fragment, useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../actions/auth';

const Login = ({login,isAuthenticated}) => {
    const [formData,setFormData]=useState({ 
        email: '',
        password: '',
    });

    const {email,password}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        login(email,password);
    };

    //redirect if logged in
    if(isAuthenticated){
        return <Navigate to="/" replace />
    }


    return <Fragment><h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />

        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}    
            onChange={onChange}
            minLength="6"
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className  ="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p></Fragment>;
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};
export default connect(mapStateToProps,{login})(Login);
