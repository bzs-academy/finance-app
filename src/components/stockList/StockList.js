import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function StockList(props) {
    const classes = useStyles();
    console.log(1,props.data)
    const listItems = props.data.map(item=>{

        
        return(
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <div>
                        <p>{item.symbol}</p>
                        <p>{item.quoteType.longName}</p>
                    </div>
                    </ListItemAvatar>
                    <ListItemText
                    

                    secondary={

                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            <br/> {item.price.regularMarketPrice.fmt} <br/>
                        </Typography>
                         <br/> {item.price.regularMarketVolume.fmt}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        )
    });
    //console.log(listItems);
    return (
    <List className={classes.root}>
        {listItems}
    </List>
    );
}