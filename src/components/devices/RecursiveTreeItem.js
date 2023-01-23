import React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import { useState, useEffect } from 'react';
import { GetSingleDevice, GetSingleDeviceChildren } from '../../services/deviceService';


export const RecursiveTreeItem = ({ id }) => {
    const [device, setDevice] = useState();
    const [children, setChildren] = useState([]);

    useEffect(() => {
        GetSingleDevice(id).then(res => setDevice(res.data));
    }, [id])


    const handleClick = async () => {
        setChildren((await GetSingleDeviceChildren(id)).data.references);
    };

    useEffect(() => {
    }, [children])

    return (
        <TreeItem nodeId={device?.id ?? "0"} label={device?.name}  onClick={handleClick}>
            {children?.map(child => {
                <RecursiveTreeItem id={child.managedObject?.id}></RecursiveTreeItem>
            })}
        </TreeItem>)
}
