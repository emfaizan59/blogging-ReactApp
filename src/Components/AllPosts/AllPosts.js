import React from 'react'
import { Card, Icon,Divider ,Breadcrumb , Header, Image, Grid, Container,Loader ,Segment, Label } from 'semantic-ui-react'
import Footer from '../Footer/Footer'
import firebase from '../../firebase'
import MobileHeader from '../MobileHeader/MobileHeader'
import {Link} from 'react-router-dom'
import DesktopHeader from '../DesktopHeader/DesktopHeader'
class AllPosts extends React.Component {
 state={
    array : [] , 
    load : true
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

        this.setState({stat : true , load : false})
        console.log(this.state.array); 
       

    })
    .catch(error => {
        this.setState({error : error})
    })

}
 render(){
    const ResponsiveContainer = ({ children  }) => (
        <div>
          <DesktopHeader page = "post">{children}</DesktopHeader>
          <MobileHeader  page = "post">{children}</MobileHeader>
        </div>
      )
     return(
         <ResponsiveContainer>
           <Container style={{ marginTop:'10px'}}>   
<Breadcrumb size='big'>
          <Breadcrumb.Section link><Link to="/">Home</Link></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
    <Breadcrumb.Section active>All Post</Breadcrumb.Section>
</Breadcrumb> 
</Container>
             <Container>
        <Divider horizontal > <Header style={{marginBottom:'20px'}} as ="h2">All Posts</Header></Divider>

 <Container style={{marginTop: '30px'}}>

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

 <Card.Group itemsPerRow={4}>
 {this.state.array.map((element , i) => (

 <Card key={i}>
   <Image style={{height : '200px'}}  src={element.imageUrl || '/images/loaderImage.png'}  ui={false} />
   <Card.Content>
  
     <Card.Header> <Link to={{pathname : `/${element.title}` }}>{element.title}</Link></Card.Header> 
     <Card.Meta>
       <span className='date'>{"Created: " + element.postDate}</span>
     </Card.Meta>
     <Card.Description>
     {`${element.desc}`.substring(0,200)} ...
     </Card.Description>
   </Card.Content>
   <Card.Content extra>
     {/* <a>
       <Icon name='user' />
       22 Friends
     </a> */}
{element.favourite ? 
<Label>
    <Icon name='heart' color='red' />
        Favourite Post
     </Label>
: 
null }
   </Card.Content>
 </Card>

 ))}
 </Card.Group>
 }
 </Container>
 </Container>
 <Footer />
 </ResponsiveContainer>

     )
 }
}

export default AllPosts