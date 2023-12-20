import React from 'react';
import { Dialog, AppBar, Button, List, ListItem, ListItemText, ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const Confirm = (props) => {
  
  const continueHandler = e => {
    e.preventDefault();
    props.nextStep();
  };

  const backHandler = e => {
    e.preventDefault();
    props.prevStep();
  };

  const { id_enfermedad, enfermedad_selected, enfermedad_nombre, enfermedad_descripcion, enfermedad_file } = props.values;

  return (
    <ThemeProvider theme={outerTheme}>
      <Dialog
        open
        fullWidth
        maxWidth='sm'
      >
        <AppBar title="Confirm Data" />
        <h2>Chequeo de Final ingreso</h2>
        <List>
          <ListItem>
            <ListItemText primary="ID enfermedad" secondary={id_enfermedad} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tipo de Enfermedad" secondary={enfermedad_selected} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nombre Enfermedad" secondary={enfermedad_nombre} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Descripcion de La Enfermedad" secondary={enfermedad_descripcion} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Documento adjunto" secondary={enfermedad_file} />
          </ListItem>
        </List>
        <br />

        <Button
          color="secondary"
          variant="contained"
          onClick={backHandler}
        >Atras</Button>

        <Button
          color="primary"
          variant="contained"
          onClick={continueHandler}
        >Confirmar & Continuar</Button>
      </Dialog>
    </ThemeProvider>
  );
}

export default Confirm;