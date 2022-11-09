
// import your route components too
import { useState } from 'react'
import {Link, Navigate,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDireccion from './addDireccion';
const EditPerfile = () =>{
   const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

    
    return (
      <>
        <AddDireccion show={modalShow} onHide={() => setModalShow(false)} />
        <button onClick={() => setModalShow(true)} >Agregar direccion</button>
      </>
      );
}

export default EditPerfile;
