import React from 'react';
import logo from './logo.svg';
import './App.css';
import {firebase} from "./firebase"
import {Button} from 'semantic-ui-react' 
import {BrowserRouter , Route , Switch , Link } from 'react-router-dom'
import Register from './Components/Register/Register';
import Home from "./Components/Home/Home"
import Login from './Components/Login/Login'
import Admin from './Components/Admin/Admin';
import AllPosts from './Components/AllPosts/AllPosts'
import Post from './Components/Post/Post';
import NotFound from './Components/NotFound/NotFound'
function App() {
  return (
   
    <BrowserRouter>
      <Switch>
        <Route component={Home}  path="/" exact />
        <Route component={Register}  path="/register" exact strict />
        <Route component={Login}  path="/login"  exact strict/>
        <Route component={Admin}  path="/admin"  exact strict/>

        <Route component={AllPosts} exact path="/allposts"  />
        <Route component={Post} path="/:postTitle"  exact/>


      </Switch>

    </BrowserRouter>

  );
}

export default App;
