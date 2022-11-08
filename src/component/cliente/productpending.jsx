import { useState,useEffect } from 'react';
import { Noti, NotiError } from '../Notification';
import { ToastContainer} from "react-toastify";
const Productpending = ({ cantidad, id, total, nombre, fecha,metodoentrega,setSendpro,sendpro,dire}) =>{
    const [cantenvios, setCantenvios] =useState([]);
    const tipoEnviohandle = (id,tipo) =>{
        debugger
        if(tipo=='ENVIO' && dire == 0){
            NotiError('Debe seleccionar una direccion primero')
        }else{
            sendpro.forEach(element => {
                if(element.idCompra == id){
                    element.tipoEntrega=tipo
                }
            });
        }
    
        
    }
    const Metodoentrega = ()=>{
        console.log(cantenvios)
        if(metodoentrega !=undefined){
            if(metodoentrega.length){
                return(
                    <div className="row d-flex align-items-center">
                            <div className="btn-group" >
                                <input type="radio" className="btn-check" name={'options'+id} id={'op1'+id} onClick={()=>tipoEnviohandle(id,'RETIRO')} autoComplete="off" defaultChecked={true}  />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op1'+id}><i className="fa-solid fa-shop"></i><p style={{padding:"0",margin:"0"}}>RETIRO</p></label>
    
                                <input type="radio" className="btn-check" name={'options'+id} id={'op2'+id} onClick={()=>tipoEnviohandle(id,'ENVIO')} autoComplete="off" />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op2'+id}><i className="fa-solid fa-truck"></i><p style={{padding:"0",margin:"0"}}>ENVIO</p></label>
                            </div>
                        </div>
                )
            }else{
                return(
                    <div className="row d-flex align-items-center">
                             <div className="btn-group">
                                <input type="radio" className="btn-check" name={'options'+id} id={'op1'+id} onClick={()=>tipoEnviohandle(id,'RETIRO')} autoComplete="off" defaultChecked={true} />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op1'+id}><i className="fa-solid fa-shop"></i><p style={{padding:"0",margin:"0"}}>RETIRO</p></label>
    
                            </div>
                        </div>
                )
            }
        }
       
    }
    
    return (
        <>

            <div className="card shadow-0 border mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                                className="img-fluid" alt="Phone"></img>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Nombre</h5>
                            <p className="text-muted mb-0">{nombre}</p>
                        </div>
                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Fecha de solicitud</h5>
                            <p className="text-muted mb-0 small">{fecha}</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Cantidad</h5>
                            <p className="text-muted mb-0 small">{cantidad}</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Precio</h5>
                            <p className="text-muted mb-0 small">${total}</p>
                        </div>
                    </div>
                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }}></hr>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-2">
                            <p className="text-muted mb-0 small">Track Order</p>
                        </div>
                        <div className="col-md-10">
                            <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                <div className="progress-bar" role="progressbar"
                                    style={{ Width: "65", borderRadius: "16px", backgroundColor: "#a8729a" }} aria-valuenow="65"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-around mb-1">
                            
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                            </div>
                        </div>
                    </div>
                    {
                       <Metodoentrega></Metodoentrega> 
                    }
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            ></ToastContainer>

        </>
      );
}

export default Productpending;
