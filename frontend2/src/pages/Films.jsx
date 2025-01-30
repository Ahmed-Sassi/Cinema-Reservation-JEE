import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  useTheme,
  Chip,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import filmService from '../services/filmService';
import { movieImages } from '../assets/images';

const staticMovies = [
  {
    id: 1,
    image: movieImages.movie1,
    title: 'The Dark Knight',
    genre: 'Action'
  },
  {
    id: 2,
    image: movieImages.movie2,
    title: 'Inception',
    genre: 'Sci-Fi'
  },
  {
    id: 3,
    image: movieImages.movie3,
    title: 'Pulp Fiction',
    genre: 'Crime'
  },
  {
    id: 4,
    image: movieImages.movie4,
    title: 'Interstellar',
    genre: 'Sci-Fi'
  },
  {
    id: 5,
    image: movieImages.movie5,
    title: 'Fight Club',
    genre: 'Drama'
  },
  {
    id: 6,
    image: movieImages.movie6,
    title: 'The Godfather',
    genre: 'Crime'
  }
];

function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await filmService.getAllFilms();
        setFilms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const filteredFilms = films.filter(film =>
    film.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          bgcolor: '#000',
        }}
      >
        <Typography color="white">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: '#000' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: '#000',
        pt: { xs: 10, sm: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        {/* Table Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: 'white',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Films List
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search films..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer 
            component={Paper} 
            sx={{ 
              bgcolor: '#121212',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bold',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      py: 2,
                      width: '30%',
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bold',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      py: 2,
                      width: '70%',
                    }}
                  >
                    Film Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFilms.map((film) => (
                  <TableRow
                    key={film.id}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                      },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        py: 2,
                      }}
                    >
                      {film.id}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        py: 2,
                      }}
                    >
                      {film.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Horizontal FlatList Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: 'white',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Featured Movies
          </Typography>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              pb: 2,
              '::-webkit-scrollbar': {
                height: 8,
              },
              '::-webkit-scrollbar-track': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
              },
              '::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.4)',
                },
              },
            }}
          >
            {staticMovies.map((movie) => (
              <Card
                key={movie.id}
                sx={{
                  minWidth: 280,
                  bgcolor: '#121212',
                  borderRadius: 2,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
                    '& .movie-overlay': {
                      opacity: 1,
                    }
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={movie.image}
                    alt={movie.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    className="movie-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PlayArrowIcon />}
                      sx={{
                        textTransform: 'none',
                      }}
                    >
                      Watch Now
                    </Button>
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Chip
                    label={movie.genre}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.75rem',
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Films;
