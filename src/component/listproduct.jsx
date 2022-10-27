import React, { useState,useEffect } from "react";
import JsonData from "../MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import Product from "./product";
import Prueba from "./pruebacosas";
import { AllListProductActive } from "../services/service";
const ListProduct = () =>{
  const [allproduct, setAllProduct] = useState([
]);
  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;

  /*const displayUsers = allproduct
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <Product key={user.id} nombre={user.firstName} precio={user.id}></Product>   
      );
    });*/
    useEffect(() => {
      try {
        async function getListProduct() {
          const res = await AllListProductActive()
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
  const displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
    return (
      <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id}></Product>   
    );
  });
  return (
    <>
    <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                     {displayUsers}
                </div>
            </div>
    </section>
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

export default ListProduct;