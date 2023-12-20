import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider as MuiThemeProvider,createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const theme = createTheme();

const Enfermedades = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { values, handleChange } = props;

  const continueHandler = e => {
    e.preventDefault();
    props.nextStep();
    
  };

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    if (newFiles.length > 0) {
      props.handleChange('enfermedad_file')({
        target: { value: newFiles[0].name },
      });
    }

    setUploadedFiles(prevState => [...prevState, ...newFiles]);
    props.handleChange('uploadedFiles')({
      target: { value: newFiles },
    });
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prevState => {
      const updatedFiles = [...prevState];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  async function crearChequeo(data) {
    
    const parsed = {};

    parsed.id_enfermedad = data.id_enfermedad;
    parsed.nombre_enfermedad = data.enfermedad_nombre;
    parsed.descripcion_enfermedad = data.enfermedad_descripcion;
    parsed.documento_enfermadad = data.enfermedad_descripcion;


    try{
    await axios.post(`<AQUI LA URL DEL SERVICIO POST>`, parsed).then((response) => {
      console.log("Error del servidor", response.data);
    });
   }catch(error){
   
   }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <form>
        <Dialog
          open
          fullWidth
          maxWidth='sm'>
          <AppBar title="Enter User Details" />
          <h2>Ingreso de Enfermedades</h2>
          <TextField
            placeholder="Ingresa el Id de la enfermedad"
            label="ID enfermedad"
            onChange={() => handleChange('id_enfermedad')}
            defaultValue={values.id_enfermedad}
            disabled
            margin="normal"
            fullWidth
          />
          <br />
          <br />
          <InputLabel id="tipo-enfermedad">Tipo de Enfermedad</InputLabel>
          <br/>
          <Select
            value={values.enfermedad_selected}
            onChange={handleChange('enfermedad_selected')}
            defaultValue="Sin seleccion..."
            fullWidth >
            <MenuItem value="Sin seleccion...">Seleccione su tipo de enfermedad...</MenuItem>
            <MenuItem value="Infecciosa">Infecciosa</MenuItem>
            <MenuItem value="Cardiovascular">Cardiovascular</MenuItem>
            <MenuItem value="Respiratoria">Respiratoria</MenuItem>
            <MenuItem value="Endocrina">Endocrina</MenuItem>
          </Select>
          <br />
          <TextField
            placeholder="Ingresa el nombre de la enfermedad"
            label="Nombre Enfermedad"
            onChange={handleChange('enfermedad_nombre')}
            defaultValue={values.enfermedad_nombre}
            margin="normal"
            fullWidth
          />
          <br />
          <TextField
            placeholder="Ingrese una descripcion de la enfermedad"
            label="Descripcion de La Enfermedad"
            onChange={handleChange('enfermedad_descripcion')}
            defaultValue={values.enfermedad_descripcion}
            margin="normal"
            fullWidth
          />
          <br />
          <br />
          <Dropzone onDrop={handleDrop} accept=".pdf">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta archivos PDF aquí, o haz clic para seleccionar archivos.</p>
              </div>
            )}
          </Dropzone>
          {uploadedFiles.length > 0 && (
            <div>
              <h4>Archivos Subidos:</h4>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({file.size} bytes)
                    <Button
                      color="secondary"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={ (e) => {
              try {
                crearChequeo(values)
              } catch (error) {
                
              } finally {
                continueHandler(e)
              }
              
            }
            }
          >Continuar</Button>
        </Dialog>
      </form>
    </MuiThemeProvider>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Enfermedades;