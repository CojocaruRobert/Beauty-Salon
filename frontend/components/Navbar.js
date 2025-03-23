import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuthenticated, selectUser, selectIsAdmin, restoreAuthState } from '../store/authSlice';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import { useRouter } from 'next/router';

// ClientOnly component to prevent hydration errors
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Restore auth state on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(restoreAuthState());
    }
  }, [dispatch]);

  // Main navigation pages
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  // User menu options
  const userMenuItems = isAuthenticated 
    ? [
        { title: 'Profile', path: '/profile' },
        { title: 'My Appointments', path: '/appointments' },
        isAdmin && { title: 'Admin Dashboard', path: '/admin' },
      ].filter(Boolean)
    : [
        { title: 'Login', path: '/login' },
        { title: 'Register', path: '/register' },
      ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    router.push('/');
  };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const AuthSection = () => (
    <Box sx={{ flexGrow: 0, position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
      {isAuthenticated && user ? (
        <Box sx={{ position: 'relative' }}>
          <IconButton 
            onClick={handleOpenUserMenu} 
            sx={{ 
              p: 0,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
            aria-label="account settings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {getUserInitials()}
            </Avatar>
          </IconButton>
          <Menu
            sx={{ 
              mt: '45px',
              '& .MuiPaper-root': {
                width: '200px',
                maxWidth: '200px',
                borderRadius: 1,
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                right: 0,
                left: 'auto',
                marginRight: 0
              }
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            disableScrollLock={true}
            MenuListProps={{
              sx: { width: '100%', padding: 0 }
            }}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  position: 'absolute',
                  right: 0,
                  left: 'auto !important'
                }
              }
            }}
          >
            {userMenuItems.map((item) => (
              <MenuItem 
                key={item.title} 
                component={Link}
                href={item.path}
                onClick={handleCloseUserMenu}
                sx={{ 
                  width: '100%', 
                  py: 1.5,
                  px: 2
                }}
              >
                <Typography textAlign="center" sx={{ width: '100%' }}>{item.title}</Typography>
              </MenuItem>
            ))}
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                width: '100%', 
                py: 1.5,
                px: 2,
                borderTop: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Typography textAlign="center" sx={{ width: '100%' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Button 
            component={Link} 
            href="/login" 
            variant="text" 
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button 
            component={Link} 
            href="/register" 
            variant="contained" 
            color="primary"
            startIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            KATY REGAL
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        my: 2
                      }}
                    >
                      KATY REGAL
                    </Typography>
                  </ListItem>
                  <Divider />
                  {pages.map((page) => (
                    <ListItem key={page.title} disablePadding>
                      <ListItemButton 
                        component={Link} 
                        href={page.path}
                        selected={router.pathname === page.path}
                      >
                        <ListItemText primary={page.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            KATY
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: 'text.primary', 
                  display: 'block',
                  fontWeight: router.pathname === page.path ? 'bold' : 'normal',
                  borderBottom: router.pathname === page.path ? '2px solid' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                  }
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* User menu - wrap in ClientOnly to prevent hydration errors */}
          <ClientOnly>
            <AuthSection />
          </ClientOnly>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 