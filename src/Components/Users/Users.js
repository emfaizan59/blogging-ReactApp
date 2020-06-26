import React from 'react'
import { Card, Icon, Image, Button, Grid , Segment , Loader, Message } from 'semantic-ui-react'
import firebase from '../../firebase'
class Users extends React.Component{
  
  state = {
      array : [] ,
        load : true ,
        msg : false
    }
  componentDidMount = () => {
    this.databaseLoad()
}
databaseLoad = () => {
   var data_list = []
   firebase.database().ref("user").once("value").then((snapshot) => {
       snapshot.forEach(function(childSnapshot) {
           var key = childSnapshot.key;
           var childData = childSnapshot.val();
           if(childData !== null)
           {
           data_list.push(childData) 
           }
           
       });   
       data_list = data_list.reverse()
       this.setState({array : []})
       this.setState({ array : [...data_list]})

       this.setState({load : false})
       {this.state.array.length > 0 ? this.setState({msg : false}) : this.setState({msg : true})  }
       console.log(this.state.array); 
      

   })
   .catch(error => {
       this.setState({error : error})
   })

}

deleteUser = (email , password , userId) => {
   
        this.setState({load : true})
        firebase.auth().signInWithEmailAndPassword(email , password)
            .then( () => {
                firebase.database().ref("user").child(`${userId}`).remove()
                this.databaseLoad()

                let user = firebase.auth().currentUser
        user.delete().then(function() {
            
                  
              // User deleted.
                  })
            .catch(function(error) {
                      // An error happened.
                  });
     })

                  
}


  render(){
      return(
 <div  style={{marginRight : '50px' , maxWidth : '900px'}}>
{this.state.load ? 
     <Grid >
     <Grid.Row >
         <Grid.Column width={4}>
<Segment style={{height:'300px'}}>
<Loader active />

<Image  src='/images/loaderImage.png' />
</Segment></Grid.Column>
<Grid.Column width={4}>
<Segment style={{height:'300px'}}>
<Loader active />

<Image  src='/images/loaderImage.png' />
</Segment></Grid.Column>

<Grid.Column width={4}>
<Segment style={{height:'300px'}}>
<Loader active />

<Image  src='/images/loaderImage.png' />
</Segment></Grid.Column>

<Grid.Column width={4}>
<Segment style={{height:'300px'}}>
<Loader active />

<Image  src='/images/loaderImage.png' />
</Segment></Grid.Column>

     </Grid.Row>
 </Grid>

:

    <div>
        {this.state.msg ?
       <Message negative>
       <Message.Header>No User Registered</Message.Header>
     </Message>
        :
       <Card.Group itemsPerRow={4}>

        {this.state.array.map((element , i) => (
            
        <Card color='green'>
        <Image style={{height : '180px'}} src={element.photoURL || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}  ui={false} />
        <Card.Content>
        <Card.Header>{element.displayName}</Card.Header>
          <Card.Meta>
        <span className='date'>{element.email}</span>
          </Card.Meta>
          <Card.Description>

          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* <a>
            <Icon name='user' />
            22 Friends
          </a> */}

          <Button floated="right" circular animated='fade' color="red" onClick={ () => this.deleteUser(element.email , element.password , element.userId) }>
      <Button.Content visible><Icon name="user delete" /></Button.Content>
      <Button.Content hidden>Delete</Button.Content>
    </Button>
        </Card.Content>
      </Card>

))}
</Card.Group>
  }
</div>
  }
 </div>
      )
  }
}
export default Users
