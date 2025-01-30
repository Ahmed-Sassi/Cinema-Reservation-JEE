import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import DownloadIcon from '@mui/icons-material/Download';
import DevicesIcon from '@mui/icons-material/Devices';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const features = [
  {
    title: 'Modern Cinema Experience',
    description: 'Experience movies in our state-of-the-art theaters with premium sound and picture quality.',
    icon: MovieIcon,
    image: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg',
    direction: 'row'
  },
  {
    title: 'Comfortable Seating',
    description: 'Relax in our luxurious seats designed for maximum comfort during your movie experience.',
    icon: EventSeatIcon,
    image: 'https://images.pexels.com/photos/7991514/pexels-photo-7991514.jpeg',
    direction: 'row-reverse'
  },
  {
    title: 'Premium Sound System',
    description: 'Immerse yourself in crystal clear Dolby Atmos sound that brings movies to life.',
    icon: TheatersIcon,
    image: 'https://images.pexels.com/photos/7991432/pexels-photo-7991432.jpeg',
    direction: 'row'
  },
  {
    title: 'Family Entertainment',
    description: 'Bring your whole family and enjoy special screenings and events for all ages.',
    icon: ChildCareIcon,
    image: 'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg',
    direction: 'row-reverse'
  }
];

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        className="hero"
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("/cinema-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '7.4rem',
            background: 'linear-gradient(180deg, transparent, #141414)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="fade-in" sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    fontWeight: 700,
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Welcome to Cinema
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  Experience the magic of movies in the best quality. Book your tickets now and enjoy the show!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/films"
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    Browse Films
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<InfoIcon />}
                    sx={{
                      bgcolor: 'rgba(109, 109, 110, 0.7)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(109, 109, 110, 0.9)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    More Info
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  transform: { xs: 'scale(0.9)', md: 'scale(1)' },
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: { xs: 'scale(0.95)', md: 'scale(1.02)' },
                  }
                }}
              >
                <img
                  src="https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg"
                  alt="Modern Cinema"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }}>
              <MovieIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom color="primary">
                Latest Movies
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Watch the latest blockbusters in high definition with state-of-the-art projection technology.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }}>
              <EventSeatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom color="primary">
                Easy Booking
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Book your tickets in just a few clicks with our user-friendly reservation system.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }}>
              <TheatersIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom color="primary">
                Great Experience
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enjoy the best cinema experience with comfortable seating and amazing sound quality.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features with Images Section */}
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            borderBottom: '8px solid #222',
            bgcolor: 'black',
            py: { xs: 4, md: 8 },
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={8}
              alignItems="center"
              direction={feature.direction}
            >
              <Grid item xs={12} md={6}>
                <Box sx={{ color: 'white', p: 2 }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2rem', md: '3rem' },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}
    </Box>
  );
}

export default Home;
