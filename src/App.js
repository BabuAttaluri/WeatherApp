
import './App.css';
// import { Button } from 'react-bootstrap';

import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  var tmp = 273.15;
  var [max, setTemp] = useState(null)
  const [brcolor, setBrColor] = useState(null)
  const [min, setHumidity] = useState(null)
  const [description, setDescription] = useState()
  const [lat, setLatitude] = useState(null)
  const [lon, setLongitude] = useState(null)
  console.log("tmp val:  "+tmp);
  console.log("max val:  "+max);
  const [cityText, setCityText] = useState("")
  async function fetchWeather(){
    try {
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=dad6e19d97ce8db74621294b2419789d`)
      console.log(response)
      response.data.main.temp -= tmp //conversion from kelvin to centi
      setTemp(response.data.main.temp)
      setHumidity(response.data.main.humidity)
      setDescription(response.data.weather[0].main)
      setLatitude(response.data.coord.lat)
      setLongitude(response.data.coord.lon)
      // console.log(response.data.main.temp);
      // console.log(response.data.main.humidity);
    } catch (error) {
      // console.log(error.response.main.message)
      alert("Enter a valid city name")
    }    
  }
  return (
    <div className="tot">
      {brcolor}
    <div className="App">
      <div className="weather-box">
      <h1>Weather App</h1>
      </div>
    </div>
    <div className="wrap-input">
      <div className="input">
      <input className="form-control" 
      value={cityText} 
      onChange={(e)=>{
        setCityText(e.target.value)
      }} type="text" placeholder="Enter city name" required/>
      <button onClick={fetchWeather} style={{ marginTop: "0px" }} className="btn btn-outline-info">Submit</button>
      </div>
    </div>
    
    <div class = "box-wrap">
    <div className="box">      
      <h3>Temperature : {Math.floor(max)}<sup> o</sup>C, {description}</h3> <hr></hr>      
      <h3>Humidity : {min} % </h3> <hr></hr>
      <h3><span>Lat: {lat}<sup>o</sup></span>&emsp; &emsp; &emsp; &emsp;<span>Lon: {lon}<sup>o</sup></span></h3>
    </div>
    
    </div>
    <div className='bottom'>
      <p className='para'> Created by <img width={"20px"} src='https://cdn-icons-png.flaticon.com/512/2916/2916076.png'></img> Babu</p>
    </div>
    </div>
  )
}

export default App;