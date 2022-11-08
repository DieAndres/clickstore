import React, { useState,useEffect } from "react";
import JsonData from "../../MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import Header from "../header";
import ProductVendedor from "./productvendedor";
import { AllListProductVendedor } from "../../services/service";
import { deleteProductVendedor } from "../../services/service";
import '../../assets/listuser.css'
const ListProductVendedor= () =>{
    const [allproduct, setAllProduct] = useState([
    ]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numerDelete, setNumerDelete] = useState(0);
  
  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  useEffect(() => {
    try {
        console.log(numerDelete)
      async function getListProduct() {
        const res = await AllListProductVendedor()
        debugger
        const arrprod = res.objeto;
        setAllProduct(arrprod)
      }
      getListProduct()
    } catch (error) {
      console.log(error)
    }

  }, []);
  const pageCount = Math.ceil(allproduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const deleteproduct = async(id) =>{
    try{
        setNumerDelete(numerDelete+1);
        const res = await deleteProductVendedor(id);
        window.location.reload(true);
    }catch(error){

    }
}
  const displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
    return (
        <>
             <tr key={p.id}>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></img>
                    <div>
                        <div className="user-link">
                            <p>{p.nombre}</p>
                            {p.activo== true ? <p className="badge text-white position-absolute" style={{backgroundColor:'#00B611',marginLeft:'1rem',marginBottom:'0' }}>Activo</p> : <p className="badge text-white position-absolute" style={{backgroundColor:'#FA0105',marginLeft:'1rem',marginBottom:'0' }}>De baja</p>}
                        </div>
                        
                    </div>
                    
                </td>
                <td>
                    {p.descripcion}
                </td>
                <td className="text-center">
                    <span className="label label-default">{p.precio}</span>
                </td>
                <td>
                    <span className="label label-default">{p.stock}</span>
                </td>
                <td>
                 <span className="label label-default">{p.categoria}</span>
                </td>
                <td style={{width:" 20%"}}>
                    <button style={{padding:"0px"}} className="table-link">
                        <span className="fa-stack">
                        <i style={{color: "#646cff"}} className="fa-sharp fa-solid fa-pen-to-square"></i>
                        </span>
                    </button>
                    <button style={{padding:"0px",fontSize :"20px"}} onClick={()=>deleteproduct(p.id)} className="table-link">
                        <span className="fa-stack">
                            
                            <i style={{color: "#646cff"}} className="fa-solid fa-trash-can"></i>
                        </span>
                    </button>
                </td>
            </tr>
      </>
    ); 
  });

  return (
      <>
          <Header></Header>  
          <div className="container" style={{marginTop:"4rem"}}>
              <div className="row">
                  <div className="col-lg-12">
                      <div className="main-box clearfix">
                          <div className="table-responsive">
                              <table className="table user-list">
                                  <thead>
                                      <tr>
                                        
                                          <th><span>Nombre</span></th>
                                          <th><span>Descripción</span></th>
                                          <th className="text-center"><span>Precio</span></th>
                                          <th><span>Stock</span></th>
                                          <th><span>Categoria</span></th>
                                          <th>&nbsp;</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {displayUsers}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>
              <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
              />
          </div>
      </>
  );
}

export default ListProductVendedor;