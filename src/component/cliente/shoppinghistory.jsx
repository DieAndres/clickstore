import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import { sellerEnable } from '../../services/service';
const Shoppinghistory = ({id,fecha, nombreProducto,cantidad,total,metodosEntrega}) =>{
    const [aprobado, setAprobado] = useState(true);
    
    const handlesend = async() =>{
        try{
        }catch(error){

        }
    }
    return (
        <>
        <tr>
            <td className="text-center">
                    <span className="label label-default">{nombreProducto}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{cantidad}</span>
                </td>
                <td>
                    <span className="label label-default">{total}</span>
                </td>
                <td>
                    <span className="label label-default">{formatearFecha(fecha)}</span>
                </td>
                <td>
                    <span className="label label-default">{metodosEntrega}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={handlesend}>
                        <span className="fa-stack">

                   <i class="fa-solid fa-square-check"></i>
                   </span>
               </button>
           </td>
       </tr>
 </>
      );
}

export default Shoppinghistory;
