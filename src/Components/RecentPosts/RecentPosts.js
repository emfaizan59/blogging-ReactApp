import React from 'react'
import {Link} from 'react-router-dom'
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
    Loader,
    Responsive,
    Segment,Item,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'

  


class RecentPosts extends React.Component {
  state = {
    title : '' , 
    desc : '' , 
    image : '',
    array : [], 
    load : true
}
  componentDidMount = () => {
    var data_list = []
    firebase.database().ref("posts").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData !== null)
            {
            data_list.push(childData) 
            }
            
        });   
        this.setState({array : []})
        this.setState({ array : [...data_list]})
        // this.state.array.push({person : `${data_list[0].displayName}` , age : `${data_list[0].age}` , image : `url`, imageName : `${data_list[0].imageName}`  })
        // this.setState({stat : true , load : false})
       this.setState({title : this.state.array[this.state.array.length-1].title ,
         desc : this.state.array[this.state.array.length-1].desc , 
         postDate : this.state.array[this.state.array.length-1].postDate,
         updatedDate : this.state.array[this.state.array.length-1].updatedDate,
         image : this.state.array[this.state.array.length-1].imageUrl })
       this.setState({array : [], load  : false}) 

       

    })
    .catch(error => {
        this.setState({error : error})
    })

    
  }
  render(){
    return (
       
      <Container style={{marginTop : '20px'}}>
        <Divider horizontal> <Header as ="h2">Recent Posts</Header></Divider>
       <Segment style={{ padding: '3em 0em' }} vertical>
       {!this.state.load ? 

        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                {this.state.title}
              </Header>
           <span>{this.state.updatedDate === "" ?  "Post Created: "+this.state.postDate : "Post Edited : "+ this.state.updatedDate}</span>
          
              <p style={{ fontSize: '1.33em' }}>
               {`${this.state.desc.substring(0,300)} ...`}
              </p>
             
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src={this.state.image} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
            <Link to={{pathname : `/${this.state.title}` , desc : `${this.state.desc}`}}><Button size='huge'>Read More</Button> </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      : 
      <Segment>
      <Loader active />
  
      <Image centered src='/images/loaderImage.png' />
    </Segment>
      }
      </Segment>
      </Container>
    )
  }
}

export default RecentPosts