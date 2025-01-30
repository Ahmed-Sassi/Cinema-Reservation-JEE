import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import salleService from '../services/salleService';

function SalleProg() {
  const [salles, setSalles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await salleService.getAllSalles();
        console.log('Fetched salles:', data);
        if (Array.isArray(data)) {
          setSalles(data);
        } else {
          console.error('Unexpected data format:', data);
          setError('Format de données inattendu');
        }
      } catch (err) {
        console.error('Error fetching salles:', err);
        setError(err.message || 'Erreur lors du chargement des salles');
      } finally {
        setLoading(false);
      }
    };

    fetchSalles();
  }, []);

  const filteredSalles = salles.filter(salle =>
    salle.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: '#000',
          pt: { xs: 10, sm: 12 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
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
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: 'white',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Salle prog
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une salle..."
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
                borderColor: 'primary.main',
              },
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Nom
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Capacité
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Adresse
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSalles.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={3} 
                    align="center"
                    sx={{ 
                      color: 'white',
                      borderBottom: 'none',
                      py: 4,
                    }}
                  >
                    Aucune salle trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredSalles.map((salle) => (
                  <TableRow
                    key={salle.id}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                      },
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {salle.name}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {salle.capacity}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {salle.adresse}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default SalleProg;
