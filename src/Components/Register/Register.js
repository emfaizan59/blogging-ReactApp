import React from 'react'
import firebase from '../../firebase'
import {Link, Redirect} from 'react-router-dom'
import md5 from 'md5';
import './Register.css'
import {Message , Header , Icon , Grid , Form , Segment , Button} from 'semantic-ui-react'
class Register extends React.Component {
    state= {
        username : '',
        email : '' ,
        password : '' ,
        confirmPassword : '',
        error : [] , 
        success : '',
        loading : false,
        dataSet : firebase.database().ref('user')
    }
    
    handleForm = event => {
      
        this.setState({error : [] , success : '' , loading : true})
        
        if(this.formValid())
        {
            firebase.auth().createUserWithEmailAndPassword(this.state.email , this.state.password)
            .then( createdUser => {
                let user = firebase.auth().currentUser
                console.log(user)
               user.updateProfile({
                   displayName : this.state.username , 
                   photoURL : `https://gravatar.com/avatar/${md5(user.email)}?d=identicon` ,
                
               })
               .then(() => {
                this.state.dataSet.child(user.uid).set({
                    displayName : user.displayName , 
                    photoURL : user.photoURL , 
                    email : user.email,
                    password : this.state.password , 
                    userId : user.uid
                })
            this.setState({username:'', password:'', email:'', confirmPassword:'', loading: false})

               })
               console.log(user)
              
            this.setState({success : "Success" , loading:false})

            })
          .catch(err => {
              let er = err
              console.log(err)
              this.setState({error : this.state.error.concat(er)})
            this.setState({loading:false})

          })
        }
    }

    formValid = () => {
        if(this.state.username ==='' || this.state.email ==='' || this.state.password ==='' || this.state.confirmPassword ==='')
        {
            let err = {message : "Fill All Fields"}
            this.setState({error : this.state.error.concat(err)  , loading:false})
            return false
        }
        else if (this.state.password !== this.state.confirmPassword)
        {
            let err = {message : "Password Must be matched"}
            this.setState({error : this.state.error.concat(err)  , loading:false})
            return false
        }
        else{
            return true
        }
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }
    displayError = error => {
      return  error.map( (err,i)=> (
        <p key={i}>{err.message}</p>
        ))
    }
    render()
    {
        const {username , password , email , error , success , loading, confirmPassword} = this.state
        return(
            <div>
            <Grid  className="mainForm" textAlign="center" verticalAlign="middle" >
                <Grid.Column style={{maxWidth: 500}}   >
                    <Header as="H2">
                        <Icon name="user"  icon color="blue" />
                        Get Yourself Registered !
                    </Header>
                    <Form onSubmit={this.handleForm}>
                        <Segment stacked>
                        <Form.Input icon="user" fluid name="username" iconPosition="left" placeholder='Username' type="text" value={username} onChange={this.handleChange} />
                        <Form.Input icon="mail"  fluid name="email"  iconPosition="left" placeholder='Email' value={email} type="email" onChange={this.handleChange} />
                        <Form.Input icon="lock"  fluid name="password"  iconPosition="left" placeholder='Password' value={password} type="password" onChange={this.handleChange} />
                        <Form.Input icon="repeat"  fluid name="confirmPassword"  iconPosition="left" placeholder='Confirm Password' type="password" onChange={this.handleChange}  value={confirmPassword}  />
                        <Button disabled={loading}  className={loading ? 'loading' : ''} primary large fluid>Register</Button>
                        </Segment>
                    </Form>
                    {error.length > 0 ? <Message color="red">
                        {this.displayError(error)}
                     
                    </Message> : null}
                    {success.length > 0 ? <Message color="green">
                        {success}
                        <Redirect to ="/login" />
                    </Message> : null}
                    <Message >Already a User ? <Link to="/login">Login</Link></Message>
                
                </Grid.Column>
            </Grid>

            </div>
        )
    }
}


export default Register