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
import seanceService from '../services/seanceService';

function Seances() {
  const [seances, setSeances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await seanceService.getAllSeances();
        console.log('Fetched seances:', data);
        if (Array.isArray(data)) {
          setSeances(data);
        } else {
          console.error('Unexpected data format:', data);
          setError('Format de données inattendu');
        }
      } catch (err) {
        console.error('Error fetching seances:', err);
        setError(err.message || 'Erreur lors du chargement des séances');
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, []);

  const filteredSeances = seances.filter(seance =>
    seance.film?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          Séances
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une séance par film..."
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
                  Film
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Date et Heure
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Places
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Tarif
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Salle
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSeances.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={5} 
                    align="center"
                    sx={{ 
                      color: 'white',
                      py: 4,
                    }}
                  >
                    Aucune séance trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredSeances.map((seance) => (
                  <TableRow
                    key={seance.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
                    }}
                  >
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {seance.film?.name}
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {formatDateTime(seance.datetime)}
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {seance.places}
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {seance.tarif} DH
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {seance.salle?.name}
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

export default Seances;
