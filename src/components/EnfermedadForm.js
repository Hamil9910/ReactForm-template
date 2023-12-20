import { useState } from 'react';
import Confirm from './Confirm';
import Success from './Success';
import Enfermedades from './Enfermedades';

const EnfermedadForm = () => {

  const [ step, setStep ] = useState(1);

  const [ state, setState ] = useState({
    id_enfermedad: Math.floor(Math.random() * 90000) + 10000,
    enfermedad_selected: '',
    enfermedad_nombre: '',
    enfermedad_descripcion: ''
  });

  //const { step } = state.step;
  //  const { id_enfermedad, enfermedad_selected, enfermedad_nombre, enfermedad_descripcion, enfermedad_file } = state;
  const values = state;

  // Proceed to next step
  const nextStep = () =>  setStep(step + 1);
  const prevStep = () =>  setStep(step - 1);

  // Handle fields change
  const handleChange = (input) => (e) => {
    setState((prevState) => ({
      ...prevState,
      [input]: e.target.value,
    }));
  };

  const render = () => {
  switch (step) {
    case 1:
      return (
        <Enfermedades
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          values={state}
        />
      );
    case 3:
      return <Success/>;
    default:
      (console.log('This is a multi-step form built with React.'))
  }
  }
  return(
    <>
    { 
    render()
    }
    </>
  );
}

export default EnfermedadForm;