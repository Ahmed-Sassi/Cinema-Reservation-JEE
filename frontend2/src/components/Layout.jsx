import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          pt: { xs: '56px', sm: '64px' }, // Hauteur de la navbar
          pb: '60px', // Hauteur du footer
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
