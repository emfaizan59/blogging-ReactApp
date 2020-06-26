import React, { Component } from 'react'
import { Form , Grid, Header, Image , Input, Button, Message,Progress } from 'semantic-ui-react'
import firebase from '../../firebase'
import moment from "moment";
class CreatePost extends Component {
    state = {
        image : '',
        imgSrc : '',
        title : '',
        desc : '',
        dataState : firebase.database().ref("posts"),
        storage : firebase.storage().ref() , 
        imgDatabase : firebase.database().ref(),
        error : [] ,
        success : '',
      progress : 0, 
      date : '' , 
      currentDate : ''
    }
  
     handleChange = (e) => this.setState({ [e.target.name] : e.target.value  })
  
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

      handleSubmit = () => {
        

      this.setState({error : []})
      if( this.state.title != '' && this.state.desc != '' && this.state.imgSrc != ''){
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
              this.setState({url , success : "Data Upload Successfully"})
              const today = this.setState({date : new Date})
              const date = moment(today).format("dddd - MMMM D, YYYY");
              console.log(date)
              this.state.dataState.child(this.state.title).set({
                  title : this.state.title , 
                  desc : this.state.desc ,
                    favourite : false,
                    imageUrl : url ,
                  postDate : date , 
                  updatedDate : '',
            
              })
          console.log(this.state.url)
          
          //     this.state.array.push({person : `${this.state.name}` , age : `${this.state.age}` , image : `${this.state.url}`, imageName : `${this.state.image.name}`  })

              this.setState({title : '' , desc : '' , imgSrc : '' , image : '' , error : []})
    
          })
          .catch(error => {
              this.setState({error : error})
          })
      })


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
      const { value } = this.state
      return (

        <Grid style={{marginTop:10}}>
                <Header as="h2">Create a Post</Header>

            <Grid.Row>
                <Grid.Column width = '6'>
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

        <Form.Button primary onClick={this.handleSubmit}>Submit</Form.Button>
      </Form>
            
                </Grid.Column >
                <Grid.Column width = '6'>
                    <Image size='medium' centered src={ this.state.imgSrc || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
              
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

      
    )
  }
}

export default CreatePost
  