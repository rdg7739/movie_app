import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './Weather';


const API_KEY = "0c0e487fb06ad513eced1bee0a685378";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
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
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+API_KEY;
    fetch(url)
    .then(response => response.json())
    .then(json=>{
      this.setState({
        isLoaded: true,
        temperature: json.main.temp,
        name: json.weather[0].main
      });
    });
  }

  // Clear
  // Thunderstorm
  // Clouds
  // Snow
  // Drizzle
  // Haze
  // Mist
  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? (
        <Weather weatherName="Thunderstorm" temp={Math.ceil(temperature - 273.15)}/>
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
