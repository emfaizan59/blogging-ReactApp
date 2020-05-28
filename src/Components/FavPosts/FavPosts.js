import React from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import {
    Button,
  
    Divider,
    Grid,
    Header,
    Icon, 
    Item ,
    Label ,
    Container ,
    Image,
    Loader ,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'
  const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class FavPosts extends React.Component {

  state = {
      array : [] , 
      load  : true
  }

  componentDidMount = () => {
    this.databaseLoad()
  }

  databaseLoad = () => {
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
        data_list = data_list.reverse()
        this.setState({array : []})
        this.setState({ array : [...data_list]})
        var newAr = []
        for (let index = 0; index < this.state.array.length; index++) {
          if(this.state.array[index].favourite == true)
          {
              newAr.push(this.state.array[index])
          }
         }
        this.setState({ array : [...newAr] , load : false})
        
    })
    .catch(error => {
      this.setState({error : error})
  })
}


  render(){
   return (
  
      <Container>
        <Divider horizontal > <Header style={{marginBottom:'20px'}} as ="h2">Favourite Posts</Header></Divider>

        {this.state.load ? 
        <Segment>
      <Segment>
      <Loader active />
  
      <Image centered src='/images/loaderImageShort.png' />
    </Segment>
        
      <Segment>
      <Loader active />
  
      <Image centered src='/images/loaderImageShort.png' />
    </Segment>
    </Segment>
        :
        <Container>
        <Item.Group divided>
        {this.state.array.map( (element , i) => (
      
        <Item>
          <Item.Image src={element.imageUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
    
          <Item.Content>
        <Item.Header as='a'>{element.title}</Item.Header>
            <Item.Meta>
        <span className='cinema'>{element.postDate}</span>
            </Item.Meta>
            <Item.Description>   {`${element.desc.substring(0,300)} ...`}</Item.Description>
            <Item.Extra>
             
            <Link to={{pathname : `/${element.title}` , desc : `${element.desc}`}}>
              
            <Button primary floated='right'>
                Read More
                <Icon name='right chevron' />
              </Button>
               </Link>
<Label>
    <Icon name='heart' color='red' />
        Favourite Post
     </Label>

            </Item.Extra>
          </Item.Content>
        </Item>
        )
        )}
    
      </Item.Group>
      </Container>
  }
      </Container>
    )
}
}
export default FavPosts