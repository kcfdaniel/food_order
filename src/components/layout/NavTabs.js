import React from 'react'
//react materialize implementation
import {Tabs, Tab} from 'react-materialize'

// material ui implementation
// import {Tabs, Tab} from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
});
  
class NavTabs extends React.Component {
    state = {
      value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { history } = this.props;
        const { value } = this.state;
        console.log("props:");
        console.log(this.props);
        return (
            //react materialize implementation
            <Tabs className='tab-demo tabs-transparent' onChange={(index) => {
                switch (index.slice(-1)){
                    case "0":
                        history.push('/');
                        return
                    case "1":
                        history.push('/photos');
                        return
                    case "2":
                        history.push('/lunch_menu');
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
                <Tab title={<i className="material-icons waves-effect">photo</i>} active={history.location.pathname == '/photos'}/>
                <Tab title={<i className="material-icons waves-effect">restaurant_menu</i>} active={history.location.pathname == '/lunch_menu'}/>
                <Tab title={<i className="material-icons waves-effect">person</i>} active={history.location.pathname == '/profile'}/>
            </Tabs>

            // material ui implementation
            // <Tabs value={value} onChange={this.handleChange} fullWidth>
            //     <Tab label="Item One" />
            //     <Tab label="Item Two" />
            //     <Tab label="Item Three" />
            // </Tabs>
        )
    }
}

//react materialize
export default NavTabs

//material ui
// export default withStyles(styles)(NavTabs);
