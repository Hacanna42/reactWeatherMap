import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "aea43ba01ac3d1c8de7dff28ed92177c";

export default class App extends React.Component {
  constructor() {
    console.log("App Started");
    super();
  }
  state={
    isLoading: true,
  }

  getWeather = async(latitude, longitude) => {
    const {data} = await axios.get( 
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({isLoading :false, temp: data.main.temp})
    console.log(data);
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: {latitude , longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude ,longitude)
      } catch(error) {
        Alert.alert("Cant find you, so sad");
      }
    };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const{ isLoading, temp} = this.state;
    return isLoading ? <Loading/>: <Weather temp={Math.round(temp)}/>;
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  redView: {
    width: 50,
    height: 100,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  yellowView: {
    width: 50,
    height: 200,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
