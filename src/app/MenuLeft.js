import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlareIcon from '@material-ui/icons/Flare';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';


export const drawerWidth = 240;
const menuIcons = [<FlareIcon />, <StarBorderIcon />, <EventNoteIcon />, <PersonOutlineIcon />, <HomeIcon />]

const styles = (theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
  },
  paper: {
    position: 'fixed',
    paddingTop: theme.spacing(7),
    zIndex: 60,
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      height: '100vh'
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: -5,
  },
  overlay: {
    position: 'fixed',
    zIndex: 59,
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  show: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  }
});

const MenuLeft = (props) => {
  const {classes, isOpen, handleToggle} = props

  const handleBtnMenuClick = () => handleToggle()
  
  const handleOverlayClick = () => handleToggle()

  return (
    <div>
      <div className={clsx(classes.overlay,
        {[classes.hide]: !isOpen},
        {[classes.show]: isOpen}
        )}
        onClick={handleOverlayClick}
      >

      </div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.menuButton}
            onClick={handleBtnMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List>
          {['Ngày của Tôi', 'Quan trọng', 'Đã lập kế hoạch', 'Đã giao cho bạn', 'Tác vụ']
            .map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{menuIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
          ))}
        </List>
      </Drawer>
    </div>  
  )
}

export default withStyles(styles)(MenuLeft)