import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  

class MobileHeader extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })

    // checkToken = () => {  
    //   let check = localStorage.getItem("tokenLogin")
    //   console.log(check)
    //   if(check == null )
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
    


    render() {
      const { children } = this.props
      const { sidebarOpened } = this.state
      const {page} = this.props
  
     
      return (
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            animation='push'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
               <Link to="/">  <Menu.Item  as='a'>Home</Menu.Item> </Link> 
               <Link to="/allposts">  <Menu.Item as='a'>Posts</Menu.Item> </Link> 
               <Link to="#">  <Menu.Item as='a'>Contact us</Menu.Item> </Link> 
               <Link to ="/login"> <Menu.Item as='a'>Log in</Menu.Item></Link>
               <Link to ="/register"> <Menu.Item as='a'>Sign Up</Menu.Item></Link>
          </Sidebar>
  
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{  padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              {page !== "admin" ?
           <Carousel mobile />
           : null }
            </Segment>
  
            {children}
          </Sidebar.Pusher>
        </Responsive>
      )
    }
  }
  
  MobileHeader.propTypes = {
    children: PropTypes.node,
  }


  export default MobileHeader