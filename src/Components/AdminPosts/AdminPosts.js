import React , {Component} from 'react'
import firebase from '../../firebase'
import _ from 'lodash'
import MyModal from './MyModal'
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
    Modal,
    Loader,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'
  const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class AdminPosts extends Component {
    state = {
        title : '' , 
        desc : '' , 
        image : '' ,
    dataState : firebase.database().ref("posts"),
      valueDate : '',
        array : [] , 
        error : [] ,
         load : true,
         modalOpen: false,
         valueIntoModal: [] , 
         valueDesc : '' , 
         valueImage : '', 
         valueTitle : ''
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



deletePost = (element) => {
  // let ref = firebase.storage().ref("images");
  // ref.listAll().then(dir => {
  //   dir.items.forEach(fileRef => {
  //     var dirRef = firebase.storage().ref(fileRef.fullPath);
  //     dirRef.getDownloadURL().then(function(url) {
    
  //       console.log(`Deleting Url : ${url}`)
  //   if(imageUrl === url)
  //   {
  //       var imgRef = firebase.storage().refFromURL(url);
  //       imgRef.delete()
  //       .then(function() {
  //         // File deleted successfully 
  //       })
  //       .catch(function(error) {
  //         // There has been an error      
  //       })
  //   }
  //     });
  //   });
  // }).catch(error => {
  //   console.log(error);
  // })
  // this.state.dataState.child(title).remove()  
  console.log(element.title +"\n"+ element.imageUrl)
}


    render(){
    return(
   <div  style={{marginRight : '50px' , maxWidth : '900px'}}>
      {this.state.array.length > 0 ? 
        <Item.Group divided>
   
    {this.state.array.map( (element , i) => (
        <Item key={i}>
          <Item.Image src={element.imageUrl} />
    
          <Item.Content>
    <Item.Header as='a'>{element.title}</Item.Header>
            <Item.Meta>
    <span className='cinema'>{element.updatedDate === "" ?  "Post Created: "+element.postDate : "Post Edited : "+ element.updatedDate}</span>
            </Item.Meta>
            <Item.Description>{`${element.desc}`.substring(0,400)} ...</Item.Description>
            <Item.Extra>
              <Button primary floated='right'  onClick={() => {
                  this.setState({ modalOpen: true , valueTitle : element.title , valueDesc : element.desc , valueImage : element.imageUrl , valueDate : element.postDate });
                }}>
                Update Post
                <Icon name='right chevron' />
              </Button>
              <Button color="red" onClick = {() => {
  let ref = firebase.storage().ref("images");
  ref.listAll().then(dir => {
    dir.items.forEach(fileRef => {
      var dirRef = firebase.storage().ref(fileRef.fullPath);
      dirRef.getDownloadURL().then(function(url) {
    
        console.log(`Deleting Url : ${url}`)
    if(element.imageUrl === url)
    {
        var imgRef = firebase.storage().refFromURL(url);
        imgRef.delete()
        .then(function() {
          // File deleted successfully 
        })
        .catch(function(error) {
          // There has been an error      
        })
    }
      });
    });
  }).catch(error => {
    console.log(error);
  })
  this.state.dataState.child(element.title).remove()  
  this.databaseLoad()
              }}>Delete</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
    ))}  
     </Item.Group>
: 
<Segment>
<Loader active />

<Image centered src='/images/loaderImage.png' />
</Segment>
}

{this.state.modalOpen ? 
              <MyModal // The invisible modal itself
                key="modal1"
                modalOpen={this.state.modalOpen}
                handleClose={() => {
                  this.setState({ modalOpen: false })
                  this.databaseLoad()
                }}
                valueTitle={this.state.valueTitle}
                valueDesc={this.state.valueDesc}
                valueImage={this.state.valueImage}
                valueDate = {this.state.valueDate}
              />
              : null }
      </div>
    )    
    }
}

export default AdminPosts