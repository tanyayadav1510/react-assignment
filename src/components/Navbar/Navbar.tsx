import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, drawerWidth, drawerBackgroundColor, menuItems } from './navbar.styles';


export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label={open ? 'close drawer' : 'open drawer'}
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                edge="start"
                style={{ marginRight: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{ width: 56, height: 56 }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: drawerBackgroundColor,
            zIndex: 20,
            justifyContent: 'center',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {menuItems.map((menuItem, idx) => (
            <div>
              <ListItem key={menuItem.text}>
                <ListItemButton
                  component={Link}
                  to={menuItem.url}
                  onClick={handleDrawerClose}
                  disabled={location.pathname === menuItem.url}
                >
                  <ListItemText primary={menuItem.text} style={{ color: 'white' }} />
                  <ListItemIcon>{idx > 0 ? <ChevronRightIcon /> : null}</ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
