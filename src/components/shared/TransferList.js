import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function not(a, b) {
    return [...a].filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return [...a].filter((value) => b.indexOf(value) !== -1);
}

export const TransferList = ({ checked, left, right, setLeft, setRight, setChecked }) => {

    useEffect(() => {}, [checked, left, right])
    

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setLeft([]);
        setRight([...right].concat([...left]));
    };

    const handleCheckedRight = () => {
        setRight([...right].concat([...intersection(checked, left)]));
        setLeft(not(left, [...intersection(checked, left)]));
        setChecked(not(checked, [...intersection(checked, left)]));
    };

    const handleCheckedLeft = () => {
        setLeft([...left].concat([...intersection(checked, right)]));
        setRight(not(right, [...intersection(checked, right)]));
        setChecked(not(checked, [...intersection(checked, right)]));
    };

    const handleAllLeft = () => {
        setLeft([...left].concat([...right]));
        setRight([]);
    };

    const handleDelete = (value) => () => {
        const leftIndex = left.indexOf(value);
        const rightIndex = right.indexOf(value);

        var leftMock = [...left];
        var rightMock = [...right];

        if (leftIndex < 0) {
            rightMock.splice(rightIndex, 1);
            setRight(rightMock);
        } else {
            leftMock.splice(leftIndex, 1);
            setLeft(leftMock);
        }
    };

    const handleDeleteAllLeft = () => () => {
        setLeft([]);
    }

    const handleDeleteAllRight = () => () => {
        setRight([]);
    }

    const customList = (items, isLeft) => (
        <Card>
            <CardHeader avatar={
                <IconButton aria-label="delete" onClick={isLeft ? handleDeleteAllLeft() : handleDeleteAllRight()}>
                    <DeleteIcon />
                </IconButton>
            } 
            title={"Delete All"} />
            <Divider />
            <Paper sx={{ width: `100%`, height: 230, overflow: 'auto' }}>
                <List dense component="div" role="list">
                    {items.map((value) => {
                        const labelId = `transfer-list-item-${value.name}-label`;
                        return (
                            <ListItem
                                key={value.id}
                                role="listitem"
                                button
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        onClick={handleToggle(value)}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.name} />
                                <ListItemIcon>
                                    <IconButton aria-label="delete" onClick={handleDelete(value)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </Card>

    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={5}>{customList(left, true)}</Grid>
            <Grid item xs={1}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={intersection(checked, left).length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={intersection(checked, right).length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>{customList(right, false)}</Grid>
        </Grid>
    );
}
