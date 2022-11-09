import { useState,useEffect } from 'react';
import { Noti, NotiError } from '../Notification';
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
    const formatearFecha = (fecha) =>{
        const fechafor = fecha.split('T')
        return fechafor[0];
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
                            <p className="text-muted mb-0 small">{formatearFecha(fecha)}</p>
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
                    
                    {
                       <Metodoentrega></Metodoentrega> 
                    }
                </div>
            </div>
        </>
      );
}

export default Productpending;
