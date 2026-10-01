import Icon from '../ui/Icon';
import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading},deleteAccount}) => {
    useEffect(()=>{
        getCurrentProfile();

    },[getCurrentProfile]);

    return loading && profile===null ? <Spinner /> : <Fragment>
        <span className="eyebrow">YOUR WORKSPACE</span><h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <Icon name="users" /> Welcome {user && user.name}
        </p>
        {profile!==null ? <Fragment>
            <DashboardAction />
            <div className="stats-row"><div className="stat"><strong>{profile.skills.length}</strong><span>Skills</span></div><div className="stat"><strong>{profile.experience.length}</strong><span>Experience entries</span></div><div className="stat"><strong>{profile.education.length}</strong><span>Education entries</span></div></div>
            <Link to={'/profile/' + user?._id} className="btn">View public profile</Link>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="danger-zone"><h2>Delete account</h2><p>Permanently remove your account and profile. This action cannot be undone.</p>
                <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                    <Icon name="users" />
                    Delete My Account
                </button>
            </div>
            </Fragment> : <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>
            }
        </Fragment>
};

Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired
};

const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
