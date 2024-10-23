import react from "react";
import { useState,useEffect } from "react";
import { Card, CardContent, Typography,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,Alert } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';


function WeatherCard( {name ,temp,desc,humidity,dateTime,icon}){
    const  tempThreshold=30.0;
    const[open,setOpen]=useState(false);
    

    useEffect(() => {
        
          if( temp >tempThreshold){
            setOpen(()=>true);
         
          }
        
      }, [temp]);

    const handleCloseDialog=()=>{
        setOpen(()=>false);
    }

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return(
        <>
        <Card style={{ backgroundColor: "#f5f5f5", height:"260px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                 City: {name}
                </Typography>
                <img src={iconUrl} alt="Weather Icon" />
                <Typography variant="body2" color="textSecondary">
                  Temperature: {temp} °C
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {desc}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Humidity: {humidity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                 Timestamp: {dateTime}
                </Typography>
              </CardContent>

        <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{display:"flex", alignContent:"center"}}>
        <WarningIcon style={{ color: "#ff9800", marginRight: "8px", marginTop:"5px" }} />
            {"High Temperature Alert!"}
            </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Warning: The temperature in {name} is currently {temp}°C, which exceeds the threshold of {tempThreshold}°C.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
        </Card>
        </>
    )
}

export default WeatherCard;