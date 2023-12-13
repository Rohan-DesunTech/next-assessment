import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// MUI imports

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@material-ui/core/styles';

// component Imports 
import ProfilePage from './profile';

// Reducer

import { selectCategories } from '@/store/categoriesSlice';

// Custom MUI Styling

const useStyles = makeStyles((theme) => ({

  listItemText: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#34422de8',
  },
  selectedItemText: {
    color: 'blue',
    fontWeight: 'bold',
  }
}));


const NavbarLayout = ({ setFilter, filter, fetchEntriesData }) => {
  const router = useRouter();
  const classes = useStyles();

  const user = useSelector(state => state.auth.user)
  const categories = useSelector(selectCategories);

  const [selectedItem, setSelectedItem] = useState(filter.category ?? null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    setOpen(true)
    handleMenuClose();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('filter');
    sessionStorage.removeItem('authToken');
    router.push('/login');
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
    setFilter(prev => { return { ...prev, category: text } })
    fetchEntriesData({ ...filter, category: text });
    handleDrawerClose();
    sessionStorage.setItem('filter', JSON.stringify({ ...filter, category: text }));
  };

  return (
    <div>
      
      {/* Navbar  */}

      <AppBar position="static" style={{ backgroundColor: '#266726' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Assignment NextJS
          </Typography>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {user?.user_first_name}
            </Typography>
            <Avatar alt="User Avatar" src={user?.profile_pic ?? ''} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Side Bar  */}

      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose} >
        <List style={{ backgroundColor: '#d8dde4' }}>
          {categories?.categories?.map((text, index) => (
            <ListItem
              button
              key={text}
              selected={selectedItem === text}
              onClick={() => handleItemClick(text)}
              style={{ background: selectedItem === text ? 'green' : '' }}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText
                primary={text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Profile Menu  */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <ProfilePage open={open} setOpen={setOpen} />

    </div>
  );
};

export default NavbarLayout;
