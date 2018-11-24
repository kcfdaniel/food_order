import React from 'react'
import {Tabs, Tab} from 'react-materialize'

const NavTabs = (props) => {
    const { history } = props;
    console.log("props:");
    console.log(props);
    return (
        <Tabs className='tab-demo tabs-transparent' onChange={(index) => {
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
            <Tab title={<i className="material-icons waves-effect">home</i>} active={history.location.pathname == '/'}/>
            <Tab title={<i className="material-icons waves-effect">restaurant_menu</i>} active={history.location.pathname == '/lunch_menu'}/>
            <Tab title={<i className="material-icons waves-effect">photo</i>} active={history.location.pathname == '/photos'}/>
            <Tab title={<i className="material-icons waves-effect">person</i>} active={history.location.pathname == '/profile'}/>
        </Tabs>
    )
}

export default NavTabs