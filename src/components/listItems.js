import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ConstructionIcon from '@mui/icons-material/Construction';
import DevicesIcon from '@mui/icons-material/Devices';
import { Link } from 'react-router-dom';
import { NavigationButton } from './shared/NavigationButton';

export const mainListItems = (
  <React.Fragment>
    <NavigationButton path="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavigationButton>
    
    <NavigationButton path="/devices">
      <ListItemButton>
        <ListItemIcon>
          <DevicesIcon />
        </ListItemIcon>
        <ListItemText primary="Devices" />
      </ListItemButton>
    </NavigationButton>

    <NavigationButton path="/studio">
      <ListItemButton>
        <ListItemIcon>
          <ConstructionIcon />
        </ListItemIcon>
        <ListItemText primary="Data Studio" />
      </ListItemButton>
    </NavigationButton>

    <NavigationButton path="/algorithms">
      <ListItemButton>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText primary="Algorithm Selection" />
      </ListItemButton>
    </NavigationButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);