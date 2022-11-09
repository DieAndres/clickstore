import { useState } from 'react'
import { deleteProductVendedor } from '../../services/service';
import { storage } from "../firebase";
import { Noti,NotiError } from '../Notification';
const ProductVendedor = ({nombre,descripcion, categoria, stock, precio ,id,imagen,activo}) =>{
    const [url, setUrl] = useState('');
    const deleteproduct = async() =>{
        try{
            debugger
            const res = await deleteProductVendedor(id);
            if(res =='Producto dado de baja'){
                Noti('Se dio de baja el producto')
                window.location.reload(true);
            }else{
                NotiError('No se pudo dar de baja el producto')
            }
            
        }catch(error){
            console.log(error)
        }
    }
    const RenderImg = ({imagen})=>{
      storage
      .ref("images")
      .child(imagen[0])
      .getDownloadURL()
      .then(url => {
        setUrl(url)
        
      });
      return(
        <img src={url}></img>
      )
    }
    return (
      <>
             <tr>
                <td>{
                     imagen !='' && <RenderImg imagen={imagen}></RenderImg>
                    }
                   
                    <a href="#" className="user-link">{nombre}</a>
                    {activo ? <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem",backgroundColor:'#00B020' }}>Activo</div> : <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem",backgroundColor:'#FF0206' }}>De Baja</div>}
                </td>
                <td>
                    {descripcion}
                </td>
                <td className="text-center">
                    <span className="label label-default">{precio}</span>
                </td>
                <td>
                    <span className="label label-default">{stock}</span>
                </td>
                <td>
                 <span className="label label-default">{categoria}</span>
                </td>
                <td style={{width:" 20%"}}>
                    {activo && <button onClick={()=>deleteproduct(id)} className="table-link danger">
                    <i class="fa-solid fa-trash-can" style={{fontSize :'20px'}}></i>
                    </button>}
                </td>
            </tr>
      </>
      );
}

export default ProductVendedor;
