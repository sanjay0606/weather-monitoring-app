import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import { Container,Typography,Grid,Button,Dialog,DialogContent,DialogTitle,DialogActions } from '@mui/material';
import { API_KEY,BASE_URL_API } from './Api.js';
import TemperatureSummary from './components/TemperatureSummary.js';


import WeatherCard from './components/Card.js';

const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
const BASE_URL="http://localhost:8080/api/temperature"



function App() {
        const [showSummary, setShowSummary] = useState(false);
        const [summaryData, setSummaryData] = useState(null);

        const fetchTemperatureSummary = async () => {
          try {
              const response = await fetch(`${BASE_URL}/stats`); 
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setSummaryData(data); 
              setShowSummary(true); 
          } catch (error) {
              console.error('Error fetching temperature summary:', error);
          }
      };
      const handleSummaryClick = () => {
        fetchTemperatureSummary(); 
        };
        const handleClose = () => {
          setShowSummary(false);
        };

        const[currentWeather,setcurrentWeather]=useState([]);

        const convertUnixTimestamp = (timestamp) => {
          const date = new Date(timestamp * 1000); 
          return date.toLocaleString(); 
        };

      const fetchweatherData=async()=>{
        try{
          const response= cities.map((city)=>fetch(`${BASE_URL_API}q=${city}&appid=${API_KEY}&units=metric`).then((res)=>res.json())) ;
          const result=await Promise.all(response);
          
          const data = result.map((response) => ({
            city: response.name,
            dateTime:convertUnixTimestamp(response.dt),
            icon:response.weather[0].icon,
            ...response
           
          }));
          console.log(data);
          setcurrentWeather(()=>data);
          data.forEach(async( cityTemp)=>{
            
            const minTemp = parseFloat(cityTemp.main.temp_min); 
            const maxTemp = parseFloat(cityTemp.main.temp_max);
            console.log(minTemp);

            try{
              const storeResponse=await fetch(`${BASE_URL}/store`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 
                  minTemp: minTemp,
                  maxTemp: maxTemp,
                 
                }),

              })
              if (!storeResponse.ok) {
                throw new Error(`Failed to store temperature for ${cityTemp.city}`);
              }
      
              console.log(`Stored temperature data for ${cityTemp.city}+ ${cityTemp.main.temp_min}`);
            }catch (error) {
              console.error('Error storing temperature data:', error);
            }


          })
        
          }
          catch(error){
          console.log("error in fetching the weatherdata");
          }
      }

      useEffect(()=>{
        fetchweatherData();
        const interval = setInterval(fetchweatherData, 5 * 60 * 1000);
        return () => clearInterval(interval);
      },[])
  
 


  return (
    <div className="App">

      <Container style={{ marginTop: "20px" }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Weather Monitoring
            </Typography>
            <Grid container spacing={3}>
              {currentWeather.map((city,index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <WeatherCard name={city.city}
                   temp={city.main.temp}
                    desc={city.weather[0].description} 
                    humidity={city.main.humidity}
                    dateTime={city.dateTime}
                    icon={city.icon}/>
                
                </Grid>
              ))}
            </Grid>
            <Button style={{marginTop:"10px"}}variant="contained" color="primary" onClick={handleSummaryClick}>
            SUMMARY
          </Button>
          <Dialog open={showSummary} onClose={handleClose}>
        <DialogTitle>Temperature Summary</DialogTitle>
        <DialogContent>
          {summaryData ? (
            <TemperatureSummary 
            minTemp={summaryData.minTemp} 
            maxTemp={summaryData.maxTemp} 
            avgTemp={summaryData.avgTemp} 
            />
          ) : (
            <Typography>Loading summary...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button  variant="contained" onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
     
     
    
    </div>
  );
}

export default App;

