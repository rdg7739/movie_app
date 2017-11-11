import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {LinearGradient} from 'expo';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
    "rain":{
        colors: ["#00C6FB", "#005BEA"],
        icon: 'weather-pouring'
    },
    "clear-day":{
        colors: ["#FEF253", "#FF7300"],
        icon: 'white-balance-sunny'
    },
    "clear-night":{
        colors: ["#002f87", "#001030"],
        icon: 'weather-night'
    },
    "thunderstorm":{
        colors: ["#00ECBC", "#007ADF"],
        icon: 'weather-lightning-rainy'
    },
    "cloudy":{
        colors: ["#D7D2CC", "#304352"],
        icon: 'weather-cloudy'
    },
    "partly-cloudy-day":{
        colors: ["#D7D2CC", "#304352"],
        icon: 'weather-partlycloudy'
    },
    "partly-cloudy-night":{
        colors: ["#D7D2CC", "#304352"],
        icon: 'weather-partlycloudy'
    },
    "snow":{
        colors: ["#7DE2FC", "#B9B6E5"],
        icon: 'weather-snowy'
    },
    "sleet":{ //도깨비눈
        colors: ["#7DE2FC", "#B9B6E5"],
        icon: 'weather-snowy-rainy'
    },
    "hail":{
        colors: ["#89F7FE", "#66A6FF"],
        icon: 'weather-hail'
    },
    "wind":{
        colors: ["#89F7FE", "#66A6FF"],
        icon: 'weather-windy'
    },
    "fog":{
        colors: ["#89F7FE", "#66A6FF"],
        icon: 'weather-fog'
    },
    "tornado":{
        colors: ["#89F7FE", "#66A6FF"],
        icon: 'weather-lightning'
    }
}

export default function Weather({weatherName, title, temp, minSummary}){
    return (
    <LinearGradient 
    colors = {weatherCases[weatherName].colors}
    style={styles.container}
    >
        <StatusBar hidden={true}/>
        <View style={styles.upper}>
            <MaterialCommunityIcons color="white" size={144} name={weatherCases[weatherName].icon} />
            <Text style={styles.temp}>{temp}˚</Text>
        </View>
        <View style={styles.lower}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{minSummary}</Text>
        </View>
    </LinearGradient>)
}
Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weatherName: PropTypes.string.isRequired
}


const styles = StyleSheet.create( {
    container: {
        flex: 1
    },
    upper:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    temp:{
        fontSize: 48,
        backgroundColor: "transparent",
        color: "white",
        marginTop: 10
    },
    lower:{
        flex:1,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingLeft: 25
    },
    title: {
        fontSize: 38,
        backgroundColor: "transparent",
        color: "white",
        marginBottom: 10,
        fontWeight: "300"
    },
    subtitle: {
        fontSize: 24,
        backgroundColor: "transparent",
        color: "white",
        marginBottom: 24
    }
})