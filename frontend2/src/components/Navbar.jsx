import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, Avatar } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: isScrolled 
          ? 'rgba(20, 20, 20, 0.9)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        boxShadow: isScrolled ? 1 : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              mr: 4,
              fontWeight: 700,
              letterSpacing: '-1px',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.light',
              },
            }}
          >
            CINEMA
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/films"
              color="inherit"
              sx={{
                opacity: location.pathname === '/films' ? 1 : 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              Films
            </Button>
            <Button
              component={Link}
              to="/salleprog"
              color="inherit"
              sx={{
                opacity: location.pathname === '/salleprog' ? 1 : 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              Salle Prog
            </Button>
            <Button
              component={Link}
              to="/seances"
              color="inherit"
              sx={{
                opacity: location.pathname === '/seances' ? 1 : 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              Séances
            </Button>
            {user && (
              <Button
                component={Link}
                to="/mybookings"
                color="inherit"
                sx={{
                  opacity: location.pathname === '/mybookings' ? 1 : 0.7,
                  '&:hover': { opacity: 1 },
                }}
              >
                Mes Réservations
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {user ? (
              <>
                <Typography variant="body2" color="inherit" sx={{ mr: 2 }}>
                  Balance: ${user.solde}
                </Typography>
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  sx={{
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant={location.pathname === '/login' ? 'contained' : 'text'}
                  color="inherit"
                  sx={{
                    opacity: location.pathname === '/login' ? 1 : 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
