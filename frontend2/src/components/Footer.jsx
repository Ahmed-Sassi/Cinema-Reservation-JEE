import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                mb: 3,
              }}
            >
              CINEMA
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your premier destination for the latest movies and entertainment.
              Experience cinema like never before with our state-of-the-art facilities.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/films"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Films
              </Link>
              <Link
                component={RouterLink}
                to="/login"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Login
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Register
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: contact@cinema.com
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Movie Street, Cinema City, CC 12345
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} Cinema. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
