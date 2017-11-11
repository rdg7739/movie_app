import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './Weather';


//const API_KEY = "1cea5c7ae03a70263d1904f0124e71dc";
const API_KEY = "0123456789abcdef9876543210fedcba";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
    title: null,
    minSummary: null
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=> {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error =>{
        this.setState({
          error: "Something went wrong, Couldn't get your position: " + error
        });
      }
    );
  }


  _getWeather=(lat, lon)=>{
    const url = 'https://api.darksky.net/forecast/'+API_KEY+'/'+lat+','+lon;
    fetch(url)
    .then(response => response.json())
    .then(json=>{
      this.setState({
        isLoaded: true,
        temperature: json.currently.temperature,
        name: json.currently.icon,
        title: json.currently.summary,
        minSummary: json.minutely.summary
      });
    });
  }

  // "rain"
  // "clear-day"
  // "clear-night"
  // "thunderstorm"
  // "cloudy"
  // "partly-cloudy-day"
  // "partly-cloudy-night"
  // "snow"
  // "sleet"
  // "hail"
  // "wind"
  // "fog"
  // "tornado"
  render() {
    const {isLoaded, error, temperature, name, title, minSummary} = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? (
         <Weather weatherName="clear-day" title={title} temp={11} minSummary="11"/>
        // <Weather weatherName={name} title={title} temp={temperature} minSummary={minSummary}/>
      ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Getting Current Weather</Text>
          {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText:{
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading:{
    backgroundColor: "#FDF6AA",
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText:{
    fontSize: 30,
    marginBottom: 24
  }
});
