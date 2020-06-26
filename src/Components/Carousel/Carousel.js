import React from 'react'
import PropTypes from 'prop-types'
import Geolocation from 'react-geolocation'
import Geocode from "react-geocode";
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Label,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Message,
    Loader,
  } from 'semantic-ui-react'
import GetLocation from './GetLocation'



class Carousel extends React.Component{
state= {
  lat : '',
  long : '',
  address: '',
  cityName : '',
  weatherCondition : '',
  weatherDesc : '', 
  icon : '',
  currentTemp : '',
  minTemp : '' , 
  maxTemp : '' ,
  feelLike : '',
  pressure : '',
  humidity : '',
  windSpeed : '',
  windDir : '',
  sunSet : '',
  sunRise : '',
  country : '',
  clouds : '' ,
  error : false,
  msg : '',
  load : true
}

componentDidMount() {
    this.weatherUpdate()
}
  
weatherUpdate = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition( async (position) => {
       
      this.setState({lat : position.coords.latitude , long : position.coords.longitude})
      console.log(this.state.lat + " , "+this.state.long)
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=0eaee39bf9949d4e8875106ff4efeb1f&units=metric`
      this.fetchItem(apiUrl)
      
    }, (e) => {
        // other errors appear here
       this.setState({msg : e ,error : true , load : false})
    });
} else {
    console.log("navigator not supported");
}

}

fetchItem = (apiUrl) => {
  fetch(apiUrl)
  .then(result => result.json())
  .then(result=>
    {
    console.log(result.weather[0].description)
    this.setState({
      cityName : result.name , 
      weatherCondition : result.weather[0].main,
      weatherDesc : result.weather[0].description,
      icon : result.weather[0].icon,
      currentTemp : result.main.temp,
      feelLike : result.main.feels_like,
      minTemp : result.main.temp_min,
      maxTemp : result.main.temp_max,
      pressure : result.main.pressure,
      humidity : result.main.humidity,
      windSpeed : result.wind.speed,
      windDir : result.wind.deg,
      sunRise : result.sys.sunrise,
      sunSet : result.sys.sunset,
      country : result.sys.country,
      clouds : result.clouds.all


      
    })
   

      this.setState({load : false })
    }

    )
    .catch( (error) => {
      this.setState({error : true , load : false})
    })

  }

UTCtoTime = (time) => {
  
  let unix_timestamp = time
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2);
  
  var timeString = formattedTime;
  // var H = +timeString.substr(0, 2);
  // var h = H % 12 || 12;
  // var ampm = (H < 12 || H === 24) ? "AM" : "PM";
  // timeString = h + timeString.substr(2, 3) +" "+ ampm;
  var hourEnd = timeString.indexOf(":");
  var H = +timeString.substr(0, hourEnd);
  var h = H % 12 || 12;
  var ampm = (H < 12 || H === 24) ? " AM" : " PM";
  timeString = h + timeString.substr(hourEnd, 3) + ampm;

  return timeString
  
}

direction = (deg) => {
  var windDirectionMain = ''
  if (deg >= 348.75 && deg <11.25) {
    windDirectionMain ="°N"
} else if (deg >= 11.25 && deg< 33.75) {
    windDirectionMain ="°NNE"
} else if (deg >= 33.75 && deg< 56.25) {
    windDirectionMain ="°NE"
}
else if (deg > 56.25 && deg< 78.75) {
    windDirectionMain ="°ENE"
}
else if (deg > 78.75 && deg< 101.25) {
    windDirectionMain ="°E"
}
else if (deg > 101.25 && deg < 123.75) {
    windDirectionMain ="°ESE"
}
else if (deg > 123.75 && deg< 146.25) {
    windDirectionMain ="°SE"
}
else if (deg > 146.25 && deg < 168.75) {
    windDirectionMain ="°SSE"
}
else if (deg > 168.75 && deg < 191.25) {
    windDirectionMain ="°S"
}
else if (deg > 191.25 && deg < 213.75) {
    windDirectionMain ="°SSW"
}
else if (deg >= 213.75 && deg < 236.25) {
    windDirectionMain ="°SW"
}
else if (deg > 236.25 && deg < 258.75) {
    windDirectionMain ="°WSW"
}
else if (deg > 258.75 && deg  < 281.25) {
    windDirectionMain ="°W"
}
else if (deg > 281.25 && deg < 303.75) {
    windDirectionMain ="°WNW"
}
else if (deg > 303.75 && deg < 326.25) {
    windDirectionMain ="°NW"
}
else if (deg > 326.25 && deg < 348.75) {
    windDirectionMain ="°NNW"
}

return deg+" "+windDirectionMain
}

  render(){
    const getWidth = () => {
      const isSSR = typeof window === 'undefined'
    
      return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }
    const {cityName , weatherCondition , weatherDesc , icon , currentTemp , feelLike , minTemp , maxTemp ,
      pressure , humidity , windSpeed , windDir , sunSet , sunRise , country } = this.state
      console.log(this.state)
  
    return(
   
      <div>
        {this.state.load ? 
       <Segment inverted style={{height : '100px'}}>
         <Loader active />
     </Segment> 
     :
     <div>
     {this.state.error ? 
     <Segment inverted>
    
       <Header as='h4'>Error in Getting Location</Header>
      <Container textAlign='center' centered>
       <Button primary size='huge' style={{fontFamily: 'Fira Sans Extra Condensed'}}>
       Check All New Posts
           <Icon name='right arrow' />
         </Button>
         </Container>
     </Segment>
     :
     <Segment  textAlign='center'  style={{
       backgroundRepeat : 'no-repeat',backgroundPosition:'center',backgroundSize:'cover',
       backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0)
       0%, rgba(0,0,0,0.0)
       5%, rgba(0,0,0,0.10)
       10%, rgba(0,0,0,0.20)
       20%, rgba(0,0,0,0.30)
       30%, rgba(0,0,0,0.40)
       40%, rgba(0,0,0,0.50)
       50%, rgba(0,0,0,0.60)
       60%, rgba(0,0,0,0.70)
       70%, rgba(0,0,0,0.80)
       80%, rgba(0,0,0,0.85)
       100%),url('./images/b${ this.state.load ? 'black' : this.state.icon}.jpg')`,color : 'white',fontFamily: 'Fira Sans Extra Condensed' , marginTop : '-10px' , paddingTop : '60px' }}>
       
     
       <Header inverted as='h1' style={{padding:'30px', fontFamily: 'Viga',  fontSize: this.props.mobile ? '2em' : '3.5em'}}><Icon style={{marginBottom:'23px'}} icon name="marker map alternate" inverted  />{this.state.cityName}, {this.state.country}</Header>
 
      {/* <div style={{ display : 'flex' , margin : 'auto' , width:'50%'}}> */}
 
       {/* </div> */}
         {/* <Header
           as='h1'
           style={{fontFamily: 'Fira Sans Extra Condensed'}}
           content={this.state.cityName}
           inverted
           style={{
             fontSize: this.props.mobile ? '2em' : '4em',
             fontWeight: 'normal',
             marginBottom: 0, 
           fontFamily: 'Fira Sans Extra Condensed',
             marginTop: this.props.mobile ? '1.5em' : '3em',
           }}
         />
         <Header
           as='h2'
           content={this.state.weatherCondition}
           inverted
           style={{
             fontSize: this.props.mobile ? '1.5em' : '1.7em',
             fontWeight: 'normal',
             marginTop: this.props.mobile ? '0.5em' : '1.5em',
             fontFamily: 'Fira Sans Extra Condensed'
           }}
         />
         <Button primary size='huge' style={{fontFamily: 'Fira Sans Extra Condensed'}}>
           Get Started
           <Icon name='right arrow' />
         </Button> */}
       
               
       <Item centered textAlign='center' style={{marginTop:'50px' , marginBottom : '20px',fontSize: this.props.mobile ? '1em' : '2em'}} >
   <div  style={{ display : 'flex' , margin : 'auto' , width : '45%'}}>
       <Image size={this.props.mobile ? 'tiny' : 'small'} src={`/images/s${this.state.icon}.png`} style={{padding:'0px 20px 10px 30px' }}/>        
     <div style={{textAlign : 'left' , fontFamily : 'Boogaloo'}}>
       <Header as="h1" inverted style={{fontSize: this.props.mobile ? '1em' : '1.2em' , fontFamily : 'Boogaloo'}} >{this.state.currentTemp+"°C   Possibly "+this.state.weatherDesc }</Header>      
       <Label inverted basic style={{fontSize: this.props.mobile ? '0.4em' : '0.5em'}} >
       {`Feel : ${this.state.feelLike}°C`}
     </Label>    
     <Label inverted basic style={{fontSize: this.props.mobile ? '0.4em' : '0.5em'}} >
     {`Low: ${this.state.minTemp}°C`}
     </Label>    
     <Label inverted basic style={{fontSize: this.props.mobile ? '0.4em' : '0.5em'}}>
     {`High: ${this.state.maxTemp}°C`}
     </Label>    
      
       </div>
       </div>
       </Item>
       <Container textAlign='center' style={{padding : '20px' ,  fontSize: this.props.mobile ? '0.55em' : '1em',}}>
         <Grid centered columns='equal'  >
          <Grid.Column>
        <p style={{fontSize : '1.5em',fontFamily: ''}}><strong>Wind: </strong> {this.state.windSpeed}m/s</p>
          </Grid.Column>
          <Grid.Column>
          <p style={{fontSize : '1.5em'}}><strong>humidity: </strong> {this.state.humidity}%</p>
         
            </Grid.Column>
          <Grid.Column>
          <p style={{fontSize : '1.5em'}}><strong>Cloudiness: </strong>{this.state.clouds}%</p>
            
            </Grid.Column>
          <Grid.Column width={3}>
        <p style={{fontSize : '1.5em'}}><strong>Sunrise: </strong>{this.UTCtoTime(this.state.sunRise)}</p>
            
            </Grid.Column>
          <Grid.Column width={3}>
        <p style={{fontSize : '1.5em'}}><strong>Sunset: </strong>{this.UTCtoTime(this.state.sunSet)}</p>
            
            </Grid.Column>
          <Grid.Column width={3}>
          <p style={{fontSize : '1.5em'}}><strong>Pressure: </strong>{this.state.pressure} hpa</p>
            
            </Grid.Column>
         </Grid>
       </Container>
         <Link to="/allposts">
       <Button primary size='huge' style={{fontFamily: 'Fira Sans Extra Condensed'}}>
         Check All New Posts
           <Icon name='right arrow' />
         </Button>
         </Link>
       </Segment>
     
  }
   </div>
      }
      </div>

     
      
     )
  }
}

  Carousel.propTypes = {
    mobile: PropTypes.bool,
  }
  export default Carousel