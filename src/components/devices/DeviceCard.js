import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavigationButton } from '../shared/NavigationButton';


export const DeviceCard = (device) => {
  const data = device.device;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://www.student-circuit.com/wp-content/uploads/sites/54/2019/03/IoT-devices.png"
        alt="device image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <NavigationButton path={`/devices/${data.id}`}>
          <Button size="small">Details</Button>
        </NavigationButton>
      </CardActions>
    </Card>
  )
}
