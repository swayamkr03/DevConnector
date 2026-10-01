import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItems'


const Profiles = ({getProfiles, profile:{profiles,loading,error}}) => {
  useEffect(() => { getProfiles(); }, [getProfiles]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Profiles</h1>
          <p className="lead">
            Browse and connect with developers!
          </p>
          <div className="profiles">
            {error.msg && <p role="alert">{error.msg}</p>}
            {!profiles.length && !error.msg && <p>No profiles found.</p>}
            {profiles.filter(profile => profile.user).map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}

Profiles.propTypes = {

}

Profiles.propTypes={
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    profile:state.profile
});

export default connect(mapStateToProps,{ getProfiles })(Profiles)
