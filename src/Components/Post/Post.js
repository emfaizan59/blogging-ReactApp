import React from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import {Image , Grid ,Card,Label,Breadcrumb , Segment ,Button ,Icon , Loader, Container , Header} from 'semantic-ui-react'
import Footer from '../Footer/Footer'
import DesktopHeader from '../DesktopHeader/DesktopHeader'
import MobileHeader from '../MobileHeader/MobileHeader'
import RecentPost from '../RecentPosts/RecentPosts'
var favCheck = false
class Post extends React.Component {

    state = {
        title : '' ,
        desc : '' , 
        image : '',
        postDate : '',
        updatedDate : '',
        dataState : firebase.database().ref("posts"),
        fav : false
    }
    componentDidMount = () => {
        
    //   this.setState({title : `${this.props.match.params.postTitle}` })  
    //   console.log(this.state.title)
    var title = this.props.match.params.postTitle
        console.log(title)
    firebase.database().ref("posts").once("value").then((snapshot) => {
     
   
            var childData = snapshot.child(`${title}`).val();
            this.setState({title :snapshot.child(`${title}/title`).val() }) 
            this.setState({desc :snapshot.child(`${title}/desc`).val() })
            this.setState({image :  snapshot.child(`${title}/imageUrl`).val()})
            this.setState({postDate : snapshot.child(`${title}/postDate`).val()})
            this.setState({updatedDate : snapshot.child(`${title}/updatedDate`).val()})
            // this.setState({favourite : snapshot.child(`${title}/favourite`).val()})
            favCheck =  snapshot.child(`${title}/favourite`).val()
            this.setState({fav : favCheck})
          })

    }

    favouriteCheck = () => {
console.log("Before "+favCheck)
      favCheck = !favCheck
console.log("After "+favCheck)

      this.state.dataState.child(this.state.title).set({
        title : this.state.title , 
        desc : this.state.desc ,
        imageUrl : this.state.image ,
        postDate : this.state.postDate , 
        updatedDate : this.state.updatedDate ,
        favourite : favCheck
    })
    this.setState({fav : favCheck})

    }

render(){
    const ResponsiveContainer = ({ children  }) => (
        <div>
          <DesktopHeader page = "post">{children}</DesktopHeader>
          <MobileHeader  page = "post">{children}</MobileHeader>
        </div>
      )
    return (
        <div>
  <ResponsiveContainer >
<Container style={{width:'90%', marginTop:'10px'}}>   
<Breadcrumb size='big'>
          <Breadcrumb.Section link><Link to="/">Home</Link></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
    <Breadcrumb.Section active>{this.state.title || 'Post'}</Breadcrumb.Section>
</Breadcrumb> 
</Container>
    {this.state.title ? 
  <Card raised centered style={{width: '90%' , padding : '20px'}} color='red' >
  <Container style={{marginTop : 20}} >
    <Grid columns='equal' padded='horizontally'>
     
        <Grid.Column >
          
    <Label as='a' image>
      <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        {"Posted by Admin - Dated: "+ this.state.postDate}
    </Label>
        </Grid.Column>
        <Grid.Column width='6' >
    <Header style={{ fontSize: '2.3em' }} textAlign = 'center' as="h1">{this.state.title}</Header>

        </Grid.Column>
        <Grid.Column textAlign='right' floated='right'>
       {this.state.fav ? 
        <Button onClick={this.favouriteCheck} style={{ marginBottom : '10px'}} floated='right '>Remove Favourite</Button>
        
 :
        <Button animated='fade' color='red' onClick={this.favouriteCheck} style={{ textAlign: 'center' , marginBottom : '10px'}} floated='right '>
         <Button.Content visible>Add Favourite</Button.Content>
        <Button.Content hidden>
        <Icon name='heart' />
      </Button.Content>
    </Button>
}
     </Grid.Column>

    </Grid>
    {/* <span>{this.state.postDate}</span> */}


 <Container style={{height:400 , background :`url(${this.state.image})` , backgroundPosition : 'center' }}></Container>
  {/* <Image src={this.state.image} fluid style={{height : 400}} /> */}
  <p style={{ fontSize: '1.4em', marginTop:'10px' }}>
            {this.state.desc}
              </p>
  </Container>
  </Card>
  : 
  <Segment>
  <Loader active />

  <Image centered src='/images/loaderImage.png' />
</Segment>
  }
      <Footer />
  </ResponsiveContainer>

        </div>
    )
    }
}

export default Post