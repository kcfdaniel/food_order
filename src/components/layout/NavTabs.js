import React from 'react'
//(old) react materialize implementation
// import {Tabs, Tab} from 'react-materialize'

// material ui implementation
import PropTypes from 'prop-types';
import {Tabs, Tab} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {Home, Photo, RestaurantMenu, Person} from '@material-ui/icons';

//material ui
const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
    indicator: {
        backgroundColor: 'black',
    },
});
  
class NavTabs extends React.Component {
    state = {
      value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
        const {history} = this.props;
        switch (value){
            case 0:
                history.push('/');
                return
            case 1:
                history.push('/photos');
                return
            case 2:
                history.push('/lunch_menu');
                return
            case 3:
                history.push('/profile');
                return
            default:
                console.log("default case: value is" + value)
                return
        }
    };

    componentDidMount(){
        this.setActiveTab();
    }

    componentWillReceiveProps(){
        this.setActiveTab();
    }

    setActiveTab(){
        const {history} = this.props;
        console.log(history.location.pathname)
        switch (history.location.pathname){
            case "/":
                this.setState({value: 0})
                break
            case "/photos":
                this.setState({value: 1})
                break
            case "/lunch_menu":
                this.setState({value: 2})
                break
            case "/profile":
                this.setState({value: 3})
                break
            case "/signin":
                // value = 0;
                break
            case "/admin":
                break
            default:
                console.log("default case: history.location.pathname is" + history.location.pathname);
                history.push('/');
                break
        }
    }

    render() {
        const { history, classes } = this.props;
        const { value } = this.state;
        console.log("props:");
        console.log(this.props);
        return (
            //(old) react materialize implementation
            // <Tabs className='tab-demo tabs-transparent' onChange={(index) => {
            //     switch (index.slice(-1)){
            //         case "0":
            //             history.push('/');
            //             return
            //         case "1":
            //             history.push('/photos');
            //             return
            //         case "2":
            //             history.push('/lunch_menu');
            //             return
            //         case "3":
            //             history.push('/profile');
            //             return
            //         default:
            //             console.log("default case: index is" + index)
            //             return
            //     }
            // }}>
            //     <Tab title={<i className="material-icons waves-effect">home</i>} active={history.location.pathname == '/'}/>
            //     <Tab title={<i className="material-icons waves-effect">photo</i>} active={history.location.pathname == '/photos'}/>
            //     <Tab title={<i className="material-icons waves-effect">restaurant_menu</i>} active={history.location.pathname == '/lunch_menu'}/>
            //     <Tab title={<i className="material-icons waves-effect">person</i>} active={history.location.pathname == '/profile'}/>
            // </Tabs>

            // material ui implementation
            <Tabs 
                value={value} 
                onChange={this.handleChange} 
                fullWidth
                scrollable
                scrollButtons="auto"
                classes={{
                    root: classes.root,
                    indicator: classes.indicator,
                }}
            >
                <Tab label={<Home className={classes.icon} />} />
                <Tab label={<Photo className={classes.icon} />} />
                <Tab label={<RestaurantMenu className={classes.icon} />} />
                <Tab label={<Person className={classes.icon} />} />
            </Tabs>
        )
    }
}

//(old) react materialize implementation
// export default NavTabs

//material ui
NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavTabs);
