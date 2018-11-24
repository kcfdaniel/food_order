import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import SideNavMenu from './SideNavMenu'
import NavTabs from './NavTabs'
import { connect } from 'react-redux'  

const Navbar = (props) => {
    const { auth, profile, history } = props;
    console.log("props:");
    console.log(props);
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;
    return (
        <div>
            <nav className="nav-extended wrapper green darken-1">
                <div className="nav-wrapper">
                    <div className="container">
                        <Link to='/' className="brand-logo center">Nutrition</Link>
                        { links }
                        <SideNavMenu />
                    </div>
                </div>
                <div className="nav-content">
                </div>
                <div className="container">
                    <NavTabs history={history} />
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)