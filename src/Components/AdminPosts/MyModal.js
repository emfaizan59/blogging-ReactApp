import React from "react";
import { Modal, Header, Button,Grid,Form,Message,Input , Progress, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import _ from "lodash";
import firebase from '../../firebase'
import moment from "moment"
class MyModal extends React.Component {
  confirmClick = (event, data) => {
    console.log("Passed in Prop Value: " + this.props.valueIntoModal);
    this.props.handleClose();
  };

  state = {
    modalOpen: false,
    updateTitle : this.props.valueTitle ,
    image : '',
    imgSrc : '',
    imgSrcPrevious : '',
    title : '',
    desc : '',
    dataState : firebase.database().ref("posts"),
    storage : firebase.storage().ref() , 
    imgDatabase : firebase.database().ref(),
    error : [] ,
    success : '',
  progress : 0, 
  url : ''
  };




  componentDidMount = () => {
 
    this.setState({
        title :this.props.valueTitle,
        desc : this.props.valueDesc , 
        imgSrcPrevious : this.props.valueImage 
    })

 }

  onChange = (e) => {
    // Assuming only image
    var file = e.target.files[0];
    this.setState({image : file})
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
  
     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);

    // console.log(url) // Would see a path?
    // TODO: concat files
  }


  handleChange = (e) => this.setState({ [e.target.name] : e.target.value  })




  handleSubmit = () => {
    console.log(this.state.imgSrcPrevious)
    var prevUrl  = this.state.imgSrcPrevious

    this.setState({error : []})
    // console.log(this.state.updateTitle)

     if( this.state.title != '' && this.state.desc != ''){
       if(this.state.imgSrc !== '')
       {
        let ref = firebase.storage().ref("images");
        ref.listAll().then(dir => {
          dir.items.forEach(fileRef => {
            var dirRef = firebase.storage().ref(fileRef.fullPath);
            dirRef.getDownloadURL().then(function(url) {
          
              console.log(`Deleting Url : ${url}`)
          if(prevUrl === url)
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

        if(!(this.state.title === this.state.updateTitle)){
          this.state.dataState.child(this.state.updateTitle).remove()   
          }
        const uploadTask =  firebase.storage().ref(`images/${this.state.image.name}`).put(this.state.image)

        uploadTask.on('state_changed',
        ( snapshot ) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress : prog})
        }, 
        ( error ) => {
            this.setState({error : error})
            console.log(error)
        }, 
        () => {
           firebase.storage().ref("images").child(this.state.image.name).getDownloadURL().then(
                url => {
                this.setState({url })
        this.setState({ success : "Data Update Successfully"})
        const today = new Date
        const date = moment(today).format("dddd - MMMM D, YYYY");
        console.log(date)
                this.state.dataState.child(this.state.title).set({
                    title : this.state.title , 
                    desc : this.state.desc ,
                    imageUrl : url,
                    updatedDate : date,
                    favourite : false,


                    
                })
            // console.log(this.state.url)
            
            //     this.state.array.push({person : `${this.state.name}` , age : `${this.state.age}` , image : `${this.state.url}`, imageName : `${this.state.image.name}`  })
    
    
      
            })
            .catch(error => {
                this.setState({error : error})
            })
        })

        
       }        
        else {
       
        if(!(this.state.title === this.state.updateTitle)){
        this.state.dataState.child(this.state.updateTitle).remove()}
        const today = new Date
        const date = moment(today).format("dddd - MMMM D, YYYY");
                    
        this.state.dataState.child(this.state.title).set({
            title : this.state.title , 
            desc : this.state.desc ,
            imageUrl : this.state.imgSrcPrevious ,
            updatedDate : date,
            postDate : this.props.valueDate,
            favourite : false,


             
        })
        this.setState({ success : "Data Update Successfully"})

      }

    this.setState({
        files : null,
        url : null 
    })
}
else 
{
     let er = "Fill all the Fields" 
        this.setState({error : er})
}

}




  render() {
    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header>Update Post Content</Modal.Header>
        <Modal.Content image scrolling>
    
          <Modal.Description>
          <Grid style={{marginTop:10}}>
            

            <Grid.Row>
                <Grid.Column width = '8'>
                <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Post Title' name="title" value={this.state.title} onChange={e => this.handleChange(e)} placeholder='Title' />
    
            </Form.Group>
        <Form.TextArea label='Description' name="desc" value={this.state.desc} onChange={ e => this.handleChange(e)} placeholder="Post Description" rows={10} />
        {this.state.error.length > 0 ?
            <Message color ="red">{this.state.error}</Message>
        : null}

               
{this.state.success !='' ?
              
              <Message color="green" >

            
                   {this.state.success}
                

              </Message>
              
               : null }

      </Form>
            
                </Grid.Column >
                <Grid.Column width = '6'>
                    <Image size='medium' centered src={ this.state.imgSrc ||this.state.imgSrcPrevious || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
              
                    <Input fluid  type="file" onChange={ (e) => this.onChange(e)} />
                    {this.state.image !== '' && this.state.progress !== 100 ? 
                  <div>
                      <Progress percent={this.state.progress} indicating />
               {/* <progress className="ui active indicating progress" data-percent="this.state.progress" max="100" /> */}
                <span> {this.state.progress != 0 ? `${this.state.progress}% Upload Completed` : null }</span> 
                </div>          
                : null }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            type="button"
            icon="remove"
            labelPosition="right"
            onClick={this.props.handleClose}
            content="Cancel"
          />
          <Button
            positive
            type="button"
            icon="checkmark"
            labelPosition="right"
            onClick={this.handleSubmit}
            content="Update"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

MyModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  valueIntoModal: PropTypes.string.isRequired
};
MyModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    valueTitle: PropTypes.string.isRequired
  };
  

export default MyModal;
