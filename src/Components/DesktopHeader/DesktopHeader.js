import PropTypes from 'prop-types'
import React, { Component } from 'react'
import firebase from '../../firebase'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'


import {Link , Redirect} from 'react-router-dom'
import Carousel from '../Carousel/Carousel'
let check = null

const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  
  
class DesktopHeader extends Component {
    state = {displayName : ''}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    // checkToken = () => {  
    //   let check = localStorage.getItem("tokenLogin")
    //   console.log(check)
    //   if(check == null)
    //   {
    //   console.log("Null")
  
    //     return true
    //   }  
    //   else 
    //     {
    //   console.log("Carry")
        
    //     return false
    //     }
    //   }
    
      logOut = () => {
        localStorage.removeItem("tokenLogin")
    
      }
componentDidMount = () => {
  check = localStorage.getItem("tokenLogin")
  if(check !== null){
  this.getUserData(check)}
}
      getUserData = (uid) => {
      // console.log(  firebase.database().ref("user").child(check) )
      firebase.database().ref("user/"+uid).on('value', (snapshot) => {
        const userObj = snapshot.val();
       console.log(userObj.displayName)
       this.setState({displayName : userObj.displayName})
      });
    }

    render() {
      const { children } = this.props
      const { page } = this.props
      const { fixed } = this.state

    
      return (
        <Responsive  getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment 
              inverted
              textAlign='center'
              style={{  padding: '0.4em 0em', height : '60px' }}
              vertical

            >
              <Menu  style={{fontFamily: 'Fira Sans Extra Condensed'}}
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container >
               <Link to="/">  <Menu.Item  as='a'>Home</Menu.Item> </Link> 
               <Link to="/allposts">  <Menu.Item as='a'>Posts</Menu.Item> </Link> 
               <Link to="#">  <Menu.Item as='a'>Contact us</Menu.Item> </Link> 
               {/* <Link to="/">  <Menu.Item as='a'></Menu.Item> </Link>  */}
                
                  <Menu.Item style={{marginTop : '-10px'}}  position='right'>
                  {page !== "admin" ? 
                  <div>
                    {check ==null ? 
                    <div style={{display : 'flex'}}>
                      <h5 style={{marginTop : '7px' , marginRight:'10px'}}>Guest Session</h5>
                     <Link to ="/login">
                    <Button as='a' inverted={!fixed} style={{fontFamily: 'Fira Sans Extra Condensed'}} >
                      Log in
                    </Button>
                    </Link>
                    <Link to="/register">
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} style={{fontFamily: 'Fira Sans Extra Condensed'}}>
                      Sign Up
                    </Button>
                    </Link>
                      </div>
                    :
                    <div style={{display : 'flex'}}>
                      <h5 style={{marginTop : '7px' , marginRight:'10px'}}>Welcome {this.state.displayName}</h5>
                    <Link to="/login">
                    <Button as='a' onClick={ this.logOut} inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} style={{fontFamily: 'Fira Sans Extra Condensed'}}>
                      Logout
                    </Button>
                    </Link>
                    </div>
                    }

                    </div>
                    
                    : 
                    
                    <h2>Admin Portal</h2> }
                  </Menu.Item>
                </Container>
              </Menu>
            
            </Segment>
            {page !== "admin" && page !=='post' ?
            <Carousel />
            : null }
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }
  
  DesktopHeader.propTypes = {
    children: PropTypes.node,
  }

  export default DesktopHeader