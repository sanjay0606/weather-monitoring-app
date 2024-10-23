
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TemperatureSummary = ({ minTemp, maxTemp, avgTemp }) => {
    return (
        <Card variant="contained" style={{ marginTop: "20px" }}>
            <CardContent>
               
                <Typography color="textSecondary">
                    Minimum Temperature: {minTemp.toFixed(2)} °C
                </Typography>
                <Typography color="textSecondary">
                    Maximum Temperature: {maxTemp.toFixed(2)} °C
                </Typography>
                <Typography color="textSecondary">
                    Average Temperature: {avgTemp.toFixed(2)} °C
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TemperatureSummary;