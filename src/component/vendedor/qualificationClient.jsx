import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import { confirmpendingshopping } from '../../services/service';
import { storage } from "../firebase";
const QualificationClient = ({id, nombre, imagenesUrl, descripcion, precio, categoria}) =>{
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
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
                    <span className="label label-default">{nombre}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{descripcion}</span>
                </td>
                <td>
                    <span className="label label-default">${precio}</span>
                </td>
                <td>
                    <span className="label label-default">{categoria}</span>
                </td>
                <td style={{ width: " 20%" }}>


                </td>
            </tr>
        </>
      );
}

export default QualificationClient;
