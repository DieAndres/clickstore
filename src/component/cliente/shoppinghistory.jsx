import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { startclaim } from '../../services/service';
import { storage } from "../firebase";
const Shoppinghistory = ({id,fecha, nombreProducto,cantidad,total,metodosEntrega,allproduct,setAllproduct,imagenesUrl}) =>{    
    const [modalShow, setModalShow] = useState(false);
    const [reclamo, setReclamo] = useState('');
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
    const formatearFecha = (fecha) =>{
        if(fecha !='' && fecha !=undefined){
            const fechafor = fecha.split('T')
            const hour = fechafor[1].split('.');
            return fechafor[0]+' '+hour[0];
        }
        return '';
    }
    const handlesubmit = async () =>{
        try{
            debugger
            const res = await startclaim(id,reclamo)
            if(res[0]=='Exito'){
                Noti('Reclamo Realizado')
            }else{
                NotiError('Ya hay un reclamo en curzo')
            }
        }catch(error){
            console.log(error)
        }
    }
    const ViewImgs = () =>{
        debugger
       if(imagenesUrl.length>0){
        imagenesUrl.forEach(element => {
            debugger
                if(element !=''){
                    setImagenret(element)
                }
            });
            if(imagenret != ''){
                storage
            .ref("images")
            .child(imagenret)
            .getDownloadURL()
            .then(url => {
               setUrl(url)
            });
            
            return(
                <img className="" style={{width: 140, height: 140}} src={url} alt="..." />
            )
            }else{
                return <img className="" style={{width: 140, height: 140}} src='https://img.icons8.com/bubbles/2x/000000/product.png' alt="..." />
            }
          
       }
        
    }
    return (
        <>
            <tr>
                <td>
                    <div className="d-flex justify-content-center">
                        <ViewImgs></ViewImgs>
                    </div>
                </td>
                <td className="text-center">
                    <span className="label label-default">{nombreProducto}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{cantidad}</span>
                </td>
                <td>
                    <span className="label label-default">${total}</span>
                </td>
                <td>
                    <span className="label label-default">{formatearFecha(fecha)}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={() => setModalShow(true)}>
                        <span className="fa-stack">

                            <i className="fa-solid fa-comment"></i>
                        </span>
                    </button>
                </td>
            </tr>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='moda-registro-header'>
                    <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{ width: '100%' }}>
                        <h5 className="modal-title" id="exampleModalLabel">Reclamo</h5>
                        <i onClick={() => setModalShow(false)} className="fa-solid fa-xmark"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-registro flex-column align-items-center'>
                    <Form.Group controlId="dob" style={{ width: '50%' }}>
                        <label htmlFor="exampleFormControlTextarea1">Descripción</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e) => setReclamo(e.target.value)} rows="3"></textarea>
                    </Form.Group>
                    <button className="btn btn-info btn-block my-4" onClick={handlesubmit} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '50%' }}>CONFIRMAR</button>
                </Modal.Body>
            </Modal>
        </>
      );
}

export default Shoppinghistory;
