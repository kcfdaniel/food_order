import React, { Component } from 'react'
import { MoreVert as MoreIcon, } from '@material-ui/icons';
import { IconButton,
          MenuItem,
          Menu, } from '@material-ui/core';
import { selectAllGeneralPosts, setSelectMode } from './store/actions/postActions'
import { connect } from 'react-redux'

class SignedInLinks extends Component {
  state = {
    moreAnchorEl: null,
  };

  handleMenuClose = () => {
    this.setState({ moreAnchorEl: null });
  };

  handleMenuOpen = event => {
    this.setState({ moreAnchorEl: event.currentTarget });
  };

  render() {
    const { moreAnchorEl } = this.state;
    const isMenuOpen = Boolean(moreAnchorEl);
    const { history, selectAllGeneralPosts, setSelectMode } = this.props;

    //trigger re-render when user navigate to posts, because change in history.location.pathname can't be detected, thus won't automatically trigger render()
    history.listen( location =>  {
      if(location.pathname == "/admin/general"){
        this.setState(this.state); 
      }
    });
    let links = ""
    let renderMenu = ""
    if(history.location.pathname == "/admin/general"){
      links = (<IconButton aria-haspopup="true" onClick={this.handleMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
              )
      
      renderMenu = (
        <Menu
          anchorEl={moreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={() => {selectAllGeneralPosts(); this.handleMenuClose(); setSelectMode(true);}}>
            <p>Select All</p>
          </MenuItem>
        </Menu>
      );
    }
    return (
      <div>
        {links}
        {renderMenu}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectAllGeneralPosts: () => dispatch(selectAllGeneralPosts()),
    setSelectMode: (selectMode) => dispatch(setSelectMode(selectMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);