import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useState } from 'react'
import Header from './header';
const CreateAdmin = (props) =>{
  const [datos, setDatos] = useState({
    nombreregistro:'',
    apellidoregistro : '',
    documentoregistro : '',
    mailregistro : '',
    contraseñaregistro : '',
    registrofechanac: format(new Date())
  });
  const handleInputChange =(event) =>{
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
    console.log(datos)
  }
  function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }
    return (
        <>
            <Header></Header>
            <section className="vh-100" style={{  }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                                <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={handleInputChange} name="nombreregistro" id="nombreregistro" className="form-control form-control-lg form-inp"></input>
                                        <label className="form-label" htmlFor="nombreregistro">Nombre</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={handleInputChange} name="apellidoregistro" id="apellidoregistro" className="form-control form-control-lg form-inp"></input>
                                        <label className="form-label" htmlFor="apellidoregistro">Apellido</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={handleInputChange} name="documentoregistro" id="documentoregistro" className="form-control form-control-lg form-inp"></input>
                                        <label className="form-label" htmlFor="documentoregistro">Documento</label>
                                    </div>
                                    <Form.Group controlId="dob">
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                        <Form.Control type="date" onChange={handleInputChange} name="registrofechanac" placeholder="Date of Birth" />
                                    </Form.Group>
                                    <div className="form-outline mb-4" style={{ marginTop: '2rem' }}>
                                        <input type="email" onChange={handleInputChange} name="mailregistro" id="mailregistro" className="form-control form-control-lg form-inp"></input>
                                        <label className="form-label" htmlFor="mailregistro">Email</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={handleInputChange} name="contraseñaregistro" id="contraseñaregistro" className="form-control form-control-lg form-inp"></input>
                                        <label className="form-label" htmlFor="contraseñaregistro">Contraseña</label>
                                    </div>
                                    <button className="btn btn-info btn-block my-4" onClick={() => console.log(datos)} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Registrase</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
      );
}

export default CreateAdmin;
