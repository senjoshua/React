import React from 'react';
import Card from './Card';
import {APIkey} from './apiKeys';

var zipcodes = require('zipcodes');

var zipCode = '07645'
var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode +  ",us&units=imperial&APPID=" + APIkey
var location = 'Montvale, NJ'

class WeekContainer extends React.Component {
  state = {
    days: []
  }

  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
   }
 
   handleClick(){
    console.log("value of input field : " + this.state.zip);
    var zipcode = this.state.zip


    
    if (zipcode.length === 5 && /^[0-9]+$/.test(zipcode)){
        var loc = zipcodes.lookup(zipcode);

        location = loc.city + ", " + loc.state;

        weatherURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode +  ",us&units=imperial&APPID=" + APIkey
        console.log(weatherURL)
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
        //   console.log("Data List Loaded", data.list)
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({days: dailyData})
        })

        this.forceUpdate();
    }
    else{
        alert("Invalid Zip Code!")
    }
   }
 
   handleChange(event){
     this.setState({
        zip: event.target.value,
      });
 
   }

   componentDidMount = () => {
    // console.log(weatherURL)
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
    //   console.log("Data List Loaded", data.list)
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({days: dailyData})
    })
  }

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }

  render() {
    return (
        <div className="container">
        <h1 className="display-1 jumbotron">5 Day Forecast</h1>
        
        <h5 className="display-5 text-muted">{location}</h5>
        
        <div class="input-group col-3 mx-auto">
            <input type="text" class="form-control" placeholder="Zip Code" id='zipcode' onChange={this.handleChange}/>
            <div class="input-group-append">
              <button class="btn" id='search-button' onClick={this.handleClick}>Search</button>
            </div>
        </div>

        <div className="row justify-content-center">

          {this.formatCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer