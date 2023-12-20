import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const Success = (props) => {

  const handleContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const handleBack = (e) => {
    e.preventDefault();
    props.prevStep();
  };

    return (
      <MuiThemeProvider theme={theme}>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Success" />
            <h1>Se ha registrado con exito</h1>
            <p>Enfermedad Agregada a la base de datos de forma correcta.</p>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
}

export default Success;
