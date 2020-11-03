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
import { Link, useLocation } from 'react-router-dom'
import { TasksPageContext } from '../pages/TasksPage';

export const drawerWidth = 240;

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
    paddingTop: theme.spacing(7.5),
    zIndex: 60,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(9),
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
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  show: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  btnActive: {
    backgroundColor: theme.palette.background.grey
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,

  }
});

const MenuLeft = (props) => {
  const { classes, changeSearchTerm, changeLink } = props
  const [isOpen, setIsOpen] = React.useState(false)

  const location = useLocation()

  const handleBtnMenuClick = () => setIsOpen(!isOpen)

  const handleOverlayClick = () => setIsOpen(!isOpen)

  const handleIconClick = () => {
    changeSearchTerm('')
  }

  const isBtnActive = btnName => {
    const { pathname } = location
    const reg = new RegExp(`${btnName}$`, 'g')
    return reg.test(pathname)
  }

  return (
    <div>
      <div className={clsx(classes.overlay,
        { [classes.hide]: !isOpen },
        { [classes.show]: isOpen }
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
          <Link to="/tasks/myday" className={classes.link} onClick={() => changeLink('myday')}>
            <ListItem
              onClick={handleIconClick}
              button
              className={clsx({ [classes.btnActive]: isBtnActive('myday') })}
            >
              <ListItemIcon><FlareIcon /></ListItemIcon>
              <ListItemText primary="Ngày của tôi" />
            </ListItem>
          </Link>
          <Link to="/tasks/important" className={classes.link} onClick={() => changeLink('important')}>
            <ListItem button
              onClick={handleIconClick}
              className={clsx({ [classes.btnActive]: isBtnActive('important') })}
            >
              <ListItemIcon><StarBorderIcon /></ListItemIcon>
              <ListItemText primary="Quan trọng" />
            </ListItem>
          </Link>
          <Link to="/tasks/planned" className={classes.link} onClick={() => changeLink('planned')}>
            <ListItem button
              onClick={handleIconClick}
              className={clsx({ [classes.btnActive]: isBtnActive('planned') })}
            >
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Đã lập kế hoạch" />
            </ListItem>
          </Link>
          <Link to="/tasks" className={classes.link} onClick={() => changeLink('tasks')}>
            <ListItem button
              onClick={handleIconClick}
              className={clsx({ [classes.btnActive]: isBtnActive('tasks') })}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Tác vụ" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(MenuLeft)