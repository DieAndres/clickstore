import { useState } from 'react'
import { deleteProductVendedor } from '../../services/service';
const ProductVendedor = ({nombre,descripcion, categoria, stock, precio ,id,numerDelete,setNumerDelete}) =>{
    const deleteproduct = async() =>{
        try{
            setNumerDelete(numerDelete+1);
            const res = await deleteProductVendedor(id);
            console.log(res)
        }catch(error){

        }
    }
    return (
      <>
             <tr>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></img>
                    <a href="#" className="user-link">{nombre}</a>
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
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <button onClick={deleteproduct} className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </button>
                </td>
            </tr>
      </>
      );
}

export default ProductVendedor;
