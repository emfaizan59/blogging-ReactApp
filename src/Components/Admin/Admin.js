import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Header from '../Header/Header'
import './Admin.css'
import Users from '../Users/Users'
import AdminPosts from '../AdminPosts/AdminPosts'
import DesktopHeader from '../DesktopHeader/DesktopHeader'
import MobileHeader from '../MobileHeader/MobileHeader'
import {
  Button,
  Checkbox,
  Grid,

  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import CreatePost from '../CreatePost/CreatePost'
import { Redirect } from 'react-router-dom'

const ResponsiveContainer = ({ children  }) => (
  <div>
    <DesktopHeader page = "admin">{children}</DesktopHeader>
    <MobileHeader  page = "admin">{children}</MobileHeader>
  </div>
)

export default class SidebarExampleTransitions extends Component {
 
 
 
  state = {
      createpost : true ,
      allposts : false ,
      users : false ,
      activeItem: 'createpost',
    }
   


    handleItemClick = (e, { name }) =>{ 
      this.setState({ activeItem: name , createpost : false , allposts : false , users : false ,[name] : true })  
    }

    checkToken = () => {  
    let check = localStorage.getItem("tokenLogin")
    console.log(check)
    if(check !== null && check == 'PClIM0LKS6XdN634yXuXoq8gVQI2')
    {
    console.log("Yes")

      return false
    }  
    else 
      {
    console.log("false")
        
      return true
      }
    }
  render() {
 
    const { activeItem } = this.state
    console.log(this.checkToken())

    if(this.checkToken())
    {
      return <Redirect to="/login" />
    }
    
    return (
    
      <ResponsiveContainer >
    
<div className="main">
  <Sidebar.Pushable style={{minHeight : '100vh'}} >
               
        <Sidebar
    as={Menu}
    direction='left'
    icon='labeled'
    inverted
    vertical
    visible='true'
        style ={{minHeight : 400}}
    width='small'
  >
    <Menu.Item as='a' 
 name='createpost'
 active={activeItem === 'createpost'}
 onClick={this.handleItemClick}
 
    >
      <Icon name='edit outline' />
       Create Post
    </Menu.Item>

    <Menu.Item as='a'  name='allposts'
 active={activeItem === 'allposts'}
 onClick={this.handleItemClick} >
      <Icon name='newspaper outline' />
      All Posts
    </Menu.Item>
    <Menu.Item as='a' name='users'
 active={activeItem === 'users'}
 onClick={this.handleItemClick} >
      <Icon name='user' />
     Users
    </Menu.Item>
  </Sidebar>

      {this.state.createpost ? 
          <Sidebar.Pusher >
            <Segment basic>
              {/* <h2>Application Home</h2>
    
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
               */}

               <CreatePost />
            </Segment>
          </Sidebar.Pusher>
: null }
    
    {this.state.allposts ? 
  
  <Sidebar.Pusher >
  <Segment basic>
    {/* <h2>Application Home</h2>

    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
     */}

      <AdminPosts />
  </Segment>
</Sidebar.Pusher>
: null }
      {this.state.users ? 
  
          <Sidebar.Pusher >
            <Segment basic>
            <Users />
            </Segment>
          </Sidebar.Pusher>
  : null}
  </Sidebar.Pushable>
      </div>
      </ResponsiveContainer>

    )
  }
}