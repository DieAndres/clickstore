import React, { useState,useEffect } from "react";
import JsonData from "../MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import Product from "./product";
import { AllListProductActive } from "../services/service";
import { searchproduct , filterCategory} from "../services/service";
const ListProduct = () =>{
  const [allproduct, setAllProduct] = useState([
]);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [displayprod, setDisplayprod] = useState(Object);
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
    var pageCount =0;
    debugger
    if(allproduct.length != undefined){
       pageCount = Math.ceil(allproduct.length / productPerPage);
    }
  

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  var displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
      return (
        <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
      );
    
  });
  const handlesearch= (event)=>{
    setSearch(event.target.value)
  }
  const sendsearch = async() =>{
    debugger
    try{
      const resp = await searchproduct(search)
      console.log(typeof(displayUsers))
      setAllProduct(resp)
      displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
    return (
      <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
    );
  });
    }catch(error){
      console.log(error)
    }
  }
  const handleCategory = async(e) =>{
    var categoria = e.target.value
    try{
      const resp = await filterCategory(categoria)
      setAllProduct(resp)
      displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
    return (
      <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
    );
  });
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <section className="py-5 d-flex">
        <div className="option">
          <div>
            <input type="radio" name="card" id="INDUMENTARIA" value="INDUMENTARIA" onClick={(e)=>handleCategory(e)}></input>
            <label for="INDUMENTARIA" aria-label="INDUMENTARIA">
              <span></span>

              INDUMENTARIA

              <i class="fa-solid fa-shirt"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="ELECTRODOMESTICOS" value="ELECTRODOMESTICOS" onClick={(e)=>handleCategory(e)}></input>
            <label for="ELECTRODOMESTICOS" aria-label="Silver">
              <span></span>

              ELECTRODOMÉSTICOS

              <i class="fa-solid fa-shirt"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="VIVERES" value="VIVERES" onClick={(e)=>handleCategory(e)}></input>
            <label for="VIVERES" aria-label="VIVERES">
              <span></span>

              VIVERES

              <i class="fa-solid fa-utensils"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="INSTRUMENTOS" value="INSTRUMENTOS" onClick={(e)=>handleCategory(e)}></input>
            <label for="INSTRUMENTOS" aria-label="INSTRUMENTOS">
              <span></span>

              INSTRUMENTOS

              <i class="fa-solid fa-screwdriver-wrench"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="CALZADO" value="CALZADO" onClick={(e)=>handleCategory(e)}></input>
            <label for="CALZADO" aria-label="CALZADO">
              <span></span>

              CALZADOS

              <i class="fas fa-shoe-prints"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="LIBROS" value="LIBROS" onClick={(e)=>handleCategory(e)}></input>
            <label for="LIBROS" aria-label="Silver">
              <span></span>

              LIBROS
              <i class="fa-solid fa-book"></i>
              
            </label>
          </div>
        </div>
        <div className="container px-4">
          <div className="input-group">
            <div className="form-outline">
              <input id="search-input" type="search" onChange={handlesearch} className="form-control"></input>
              <label className="form-label" htmlFor="form1">Search</label>
            </div>
            <button id="search-button" onClick={sendsearch} type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
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