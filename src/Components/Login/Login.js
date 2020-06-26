import React from 'react'
import firebase from '../../firebase'
import {Message , Header , Icon , Grid , Form , Segment , Button} from 'semantic-ui-react'
import {Link , Redirect} from 'react-router-dom'
class Login extends React.Component {
    state= {
        email : '' ,
        password : '' ,
        error : [] , 
        success : '',
        loading : false ,
        uid : ''
    }
    
    handleForm = event => {
      
        this.setState({error : [] , success : '' , loading : true})
        
        if(this.formValid())
        {
           firebase.auth().signInWithEmailAndPassword(this.state.email , this.state.password)
           .then( signedUser => {
            // console.log(signedUser.user.uid)    
            this.setState({success : "Successfully Login", loading : false , uid : signedUser.user.uid })
            this.setState({ password:'', email:''})

           })
           .catch(err => {
               let er = err
               this.setState({error : this.state.error.concat(er) , loading: false})
           })
        }
    }

    formValid = () => {
        if(this.state.username ==='' || this.state.password ==='')
        {
            let err = {message : "Fill All Fields"}
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
                        <Icon name="user"  icon color="green" />
                        Log yourself in !
                    </Header>
                    <Form onSubmit={this.handleForm}>
                        <Segment stacked>
                        <Form.Input icon="mail"  fluid name="email"  iconPosition="left" placeholder='Email' value={email} type="email" onChange={this.handleChange} />
                        <Form.Input icon="lock"  fluid name="password"  iconPosition="left" placeholder='Password' value={password} type="password" onChange={this.handleChange} />
                        <Button disabled={loading}  className={loading ? 'loading' : ''} color="green" large fluid>Login</Button>
                        </Segment>
                    </Form>
                    {error.length > 0 ? <Message color="red">
                        {this.displayError(error)}
                     
                    </Message> : null}
                    {success.length > 0 ? <Message color="green">
                        {success}

                        {localStorage.setItem("tokenLogin" , this.state.uid )}
                        {this.state.email === 'admin@newsblog.com' ? <Redirect to ="/admin" /> : <Redirect to ="/" />}
                        
                    </Message> : null}
                    <Message >Not a User ? <Link  to="/register">Register</Link> or Join <Link  to="/">Guest Session</Link></Message>
                
                </Grid.Column>
            </Grid>

            </div>
        )
    }
}


export default Login