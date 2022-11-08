
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { listproductpendingSeller } from "../../services/service";
    import ReactPaginate from "react-paginate";
  // This values are the props in the UI
  
    export default function ProductPending() {
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
          const res = await listproductpendingSeller()
          debugger
          const arrprod = res[1];
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
                              <p>{p.nombreProducto}</p>
                              
                          </div>
                          
                      </div>
                      
                  </td>
                  <td className="text-center">
                      <span className="label label-default">{p.total}</span>
                  </td>
                  <td>
                      <span className="label label-default">{p.metodosEntrega}</span>
                  </td>
                  <td>
                   <span className="label label-default">{p.fecha}</span>
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
                                            <th ><span>Precio</span></th>
                                            <th><span>Metodo Entrega</span></th>
                                            <th><span>Fecha</span></th>
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