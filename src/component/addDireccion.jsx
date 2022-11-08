import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import { agregarDireccion } from '../services/service';
const AddDireccion = (props) =>{
  const [datos, setDatos] = useState({
    calle:'',
    numero : '',
    apto : '',
    barrio : '',
    ciudad : '',
    departamento: '',
    principal : false
  });

  const [mensaje,setMensaje] = useState('')

  const handleInputChange =(event) =>{
    
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  const handleregister = async () => {
    try{
      console.log(datos)
      const resp = await agregarDireccion(datos);
      setMensaje(resp)
      setDatos({
        ...datos,
        calle:'',
        numero : '',
        apto : '',
        barrio : '',
        ciudad : '',
        departamento: '',
        principal : false
      })
    }catch(error){
      console.log(error)
    }
    
  }

    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className='moda-registro-header'>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5 className="modal-title" id="exampleModalLabel">Agregar Direccion</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-registro'>
            <div className="text-center border border-light p-5" action="#!" style={{width:"70%"}}>
              <div className="form-group">
                <input type="text" value={datos.calle} onChange={handleInputChange} name="calle" id="calle" className="form-control" aria-describedby="emailHelp" placeholder="Calle"></input>
              </div>
              <div className="form-group">
                <input type="text"  value={datos.numero}  onChange={handleInputChange}  name="numero" id="numero"className="form-control" aria-describedby="emailHelp" placeholder="Numero"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.apto} onChange={handleInputChange} name="apto"  id="apto"className="form-control" aria-describedby="emailHelp" placeholder="Apartamento"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.barrio}  onChange={handleInputChange}  name="barrio" id="barrio"className="form-control" aria-describedby="emailHelp" placeholder="Barrio"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.ciudad}  onChange={handleInputChange}  name="ciudad"  id="ciudad" className="form-control" aria-describedby="Ciudad" placeholder="Ciudad"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.departamento} onChange={handleInputChange}  name="departamento"  id="departamento"className="form-control" aria-describedby="emailHelp" placeholder="Departamento"></input>
                
              </div>
              <div className="form-group">
                                <input className="form-check-input" type="checkbox" value={datos.principal} name='principal' id="principal" onChange={(event) => setDatos({ ...datos, principal: event.target.checked })}></input>
                                <label className="form-check-label" htmlFor="principal">
                                  Principal
                                </label>
                </div>
              <button className="btn btn-info btn-block my-4" onClick={handleregister}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Agregar</button>
            </div>
            
          </Modal.Body>
        </Modal>
        
      </>
      );
}

export default AddDireccion;
