import React from 'react'
import { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { GetAllDevices, GetSingleDevice, GetSingleDeviceChildren } from '../../services/deviceService';
import { DeviceList } from './DeviceList';
import { RecursiveTreeItem } from './RecursiveTreeItem';
import { appendOwnerState } from '@mui/base';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import { CircularProgress } from '@mui/material';



export const DeviceListPage = () => {
  const [devices, setDevices] = useState();
  const [loading, setLoading] = useState(true);
  // const [devicesTree, setDevicesTree] = useState({});

  const RecursiveTreeStructure = async (deviceId) => {
    var currentDevice = (await GetSingleDevice(deviceId)).data;
    if (currentDevice?.childDevices?.references.length > 0) {
      var promises = currentDevice?.childDevices?.references.map( async (child) => {
        return {
          "id": child?.managedObject.id,
          "name": child?.managedObject.name,
          "children": await RecursiveTreeStructure(child?.managedObject.id)
        }
      });
      
      return Promise.all(promises);
    }else{
      return { "id" : currentDevice?.id, "name": currentDevice?.name }
    }
  };

  useEffect(() => {
    GetAllDevices().then(res => {
      setLoading(false);
      setDevices(res.data)
    });
  }, [])

  // useEffect(async () => {
  //   // for (const deviceId in devices) {
  //   //   console.log(await RecursiveTreeStructure(devices[deviceId]?.id));
  //   // }
  //   var rootDevices = [];
  //   for (const deviceId in devices) {
  //     var children = (await GetSingleDeviceChildren(devices[deviceId]?.id)).data;
  //     if(Array.isArray(children)){
  //       rootDevices.push({
  //         "id": devices[deviceId]?.id,
  //         "name": devices[deviceId]?.name,
  //         "children": children
  //       });
  //     }else{
  //       rootDevices.push(children);
  //     }
        
      
  //     console.log("data fetched");
  //   }

  //   setDevicesTree({
  //     "id": "root",
  //     "name": "Devices",
  //     "children": rootDevices
  //   })
  // }, [devices])

  // useEffect(() => {
  //   console.log(devicesTree)
  // }, [devicesTree])
  

  const mapFunc = (node) => {
    console.log(node)
    renderTree(node)
  }

  const renderTree = (nodes) => {
    return (
      <TreeItem key={nodes?.id ?? "0"} nodeId={nodes?.id ?? "0"} label={nodes?.name}>
        {Array.isArray(nodes?.children)
          ? nodes?.children.map(mapFunc)
          : null}
      </TreeItem>
    )
  };

  return (
    <div>
      <DeviceList devices={devices} />
      {/* <TreeView defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 1000, overflowY: 'auto' }}>
        {renderTree(devicesTree)}
      </TreeView> */}
      {loading && (<CircularProgress />) }
    </div>
    
  )
}
