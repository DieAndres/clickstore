
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { listshoppinghistory } from "../../services/service";
    import ReactPaginate from "react-paginate";
    import Shoppinghistory from "./shoppinghistory";
  // This values are the props in the UI
  
    export default function ListShoppinghistory() {
      const [allproduct, setAllproduct] = useState([
      ]);
    const [pageNumber, setPageNumber] = useState(0);
    
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    useEffect(() => {
      try {
        async function getListShoppinghistory() {
          const res = await listshoppinghistory()
          const arrprod = res[1];
          setAllproduct(arrprod)
        }
        getListShoppinghistory()
      } catch (error) {
        console.log(error)
      }
  
    }, []);
    const pageCount = Math.ceil(allproduct.length / productPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
 
    const displayUsers = allproduct
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((p) => {
      return (
           <Shoppinghistory id={p.id} fecha={p.fecha} nombreProducto={p.nombreProducto} cantidad={p.cantidad} total={p.total} metodosEntrega={p.metodosEntrega} allproduct={allproduct} setAllproduct={setAllproduct}></Shoppinghistory>
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
                                          
                                            <th><span>Id Vendedor</span></th>
                                            <th ><span>Nombre Comercio</span></th>
                                            <th><span>Aprobar/Rechazar</span></th>
                                            <th><span>Confirmar</span></th>
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