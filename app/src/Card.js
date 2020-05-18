import React from 'react';
import './Card.css';
var moment = require('moment');

class Card extends React.Component {
  // Props: day, key(index)

  render() {
    let newDate = new Date();
    const weekday = this.props.day.dt * 1000
    newDate.setTime(weekday)

    return (
      <div className="col-auto">
        <div className="card bg-light">
          <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
          <p className="text-muted">{moment(newDate).format('MMMM Do')}</p>

          <h2>{Math.round(this.props.day.main.temp)} °F</h2>

          <p className="text-muted">Feels Like: {Math.round(this.props.day.main.feels_like)} °F</p>

          <img class="mx-auto d-block" src={'http://openweathermap.org/img/wn/' + this.props.day.weather[0].icon + '@2x.png'} height="75" width="75"/>

          <div className="card-body">
            <p className="card-text">{this.props.day.weather[0].main}: {this.props.day.weather[0].description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card