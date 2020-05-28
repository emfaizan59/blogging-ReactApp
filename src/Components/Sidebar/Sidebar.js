
import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

const  SidebarModule = (props) => {
    
  return (
    
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
  
        vertical
        visible={this.state.visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a' >
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>
     
  )
    }

export default SidebarModule