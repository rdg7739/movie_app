import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {LinearGradient} from 'expo';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
    Rain:{
        colors: ["#00C6FB", "#005BEA"],
        title: "Raining",
        subtitle: "For more info look outside",
        icon: 'weather-rainy'
    },
    Clear:{
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny",
        subtitle: "Go out and play",
        icon: 'weather-sunny'
    },
    Thunderstorm:{
        colors: ["#00ECBC", "#007ADF"],
        title: "Thunderstom in the house",
        subtitle: "Actually, outside of the house",
        icon: 'weather-lightning'
    },
    Clouds:{
        colors: ["#D7D2CC", "#304352"],
        title: "Clouds",
        subtitle: "I hate gloomy...",
        icon: 'weather-cloudy'
    },
    Snow:{
        colors: ["#7DE2FC", "#B9B6E5"],
        title: "Snow",
        subtitle: "Do you want to build a snowman?",
        icon: 'weather-snowy'
    },
    Drizzle:{
        colors: ["#89F7FE", "#66A6FF"],
        title: "Drizzle",
        subtitle: "It's like rain but not funny",
        icon: 'weather-hail'
    },
    Haze:{
        colors: ["#89F7FE", "#66A6FF"],
        title: "Haze",
        subtitle: "It's like rain but not funny",
        icon: 'weather-windy'
    },
    Mist:{
        colors: ["#89F7FE", "#66A6FF"],
        title: "Mist",
        subtitle: "It's like you have no glasses",
        icon: 'weather-fog'
    }
}
export default function Weather({weatherName, temp}){
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
            <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
            <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
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