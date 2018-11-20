import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'  
import {Tabs, Tab, SideNav, SideNavItem} from 'react-materialize'

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
                        <SideNav
                            trigger={<a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>}
                            options={{ closeOnClick: true }}
                            >
                            <SideNavItem userView
                                user={{
                                background: 'img/office.jpg',
                                image: 'img/yuna.jpg',
                                name: 'John Doe',
                                email: 'jdandturk@gmail.com'
                                }}
                            />
                            <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                            <SideNavItem href='#!second'>Second Link</SideNavItem>
                            <SideNavItem divider />
                            <SideNavItem subheader>Subheader</SideNavItem>
                            <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
                        </SideNav>
                    </div>
                </div>
                <div className="nav-content">
                </div>
                <div className="container">
                    <Tabs className='tab-demo tabs-transparent' onChange={(index) => {
                        // console.log(index);
                        switch (index.slice(-1)){
                            case "0":
                                history.push('/');
                                return
                            case "1":
                                history.push('/lunch_menu');
                                return
                            case "2":
                                history.push('/photos');
                                return
                            case "3":
                                history.push('/profile');
                                return
                            default:
                                console.log("default case: index is" + index)
                                return
                        }
                    }}>
                        <Tab title="Home" active={history.location.pathname == '/'}/>
                        <Tab title="Lunch Menu" active={history.location.pathname == '/lunch_menu'}/>
                        <Tab title="Photos" active={history.location.pathname == '/photos'}/>
                        <Tab title="Profile" active={history.location.pathname == '/profile'}/>
                    </Tabs>
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