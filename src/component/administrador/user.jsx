import { useState,useEffect } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { activeUser } from '../../services/service';
const User = ({id,correo, rol, nombre, bloqueado,alluser, setAllUser}) =>{
    const [bloqueadouser, setBloqueado] = useState(true);
    useEffect(() => {
        setBloqueado(bloqueado)
      }, []);
   const handlelock = async () =>{
    debugger
        try{
            const res =  await activeUser(correo,rol,true)
            if(res=='Exito'){
                Noti('El usuario fue bloquear')
                setBloqueado(true)
            }else{
                NotiError('Error al bloquear el usuario');
            }
        }catch(error){
            console.log(error)
        }
   }
    const  handlactive = async () =>{
        try{
            const res = await activeUser(correo,rol,false)
            if(res=='Exito'){
                Noti('El usuario fue desbloqueado')
                setBloqueado(false)
            }else{
                NotiError('Error al desbloqueado el usuario');
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <tr>
                <td className="text-center">
                    <span className="label label-default">{id}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{nombre}</span>
                </td>
                <td>
                    <span className="label label-default">{correo}</span>
                </td>
                <td>
                    <span className="label label-default">{rol}</span>
                </td>
                <td>
                    <span>{bloqueadouser ? <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem",backgroundColor:'#FF0206' }}>Bloqueado</div> : <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem",backgroundColor:'#00B020' }}>Activo</div>}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    {bloqueadouser ? <button style={{ padding: "0px", fontSize: "20px" }} onClick={handlactive} className="table-link" >
                        <span className="fa-stack">
                        <i className="fa-solid fa-lock-open"></i>
                        </span>
                    </button>  : <button style={{ padding: "0px", fontSize: "20px" }}onClick={handlelock} className="table-link" >
                        <span className="fa-stack">
                        <i className="fa-solid fa-lock"></i>
                        </span>
                    </button>}
                                 
                </td>
            </tr>
        </>
      );
}

export default User;
