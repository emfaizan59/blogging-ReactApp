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
import DesktopHeader from '../DesktopHeader/DesktopHeader'
import MobileHeader from '../MobileHeader/MobileHeader'
import Footer from '../Footer/Footer'
import RecentPosts from '../RecentPosts/RecentPosts'
import FavPosts from '../FavPosts/FavPosts'
import './Home.css'
const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopHeader>{children}</DesktopHeader>
    <MobileHeader>{children}</MobileHeader>
  </div>
)

const HomepageLayout = () => (
  
   <ResponsiveContainer>
    <RecentPosts/>
    <FavPosts />
    <Footer/>
 
  </ResponsiveContainer>


)

export default HomepageLayout