import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DeviceCard } from './DeviceCard';

export const DeviceList = ({devices}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {devices?.map(element => {
                    return (
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            >
                                <DeviceCard device={element} />
                            </Paper>
                        </Grid>
                        )
                    })}
            </Grid>
        </Container>
  )
}
