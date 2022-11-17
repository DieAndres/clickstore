import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import Header from "../header";
import '../../assets/listuser.css'
import { userListAll } from "../../services/service";
import CreateAdmin from "./createAdmin";
import User from "./user";
const UserList= () =>{
    const [alluser, setAllUser] = useState([
    ]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numerDelete, setNumerDelete] = useState(0);
  const [search, setSearch] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  useEffect(() => {
    try {
      async function getListProduct() {
        const res = await userListAll()
        const arrprod = res[1];
        setAllUser(arrprod)
      }
      getListProduct()
    } catch (error) {
      console.log(error)
    }

  }, []);
  const pageCount = Math.ceil(alluser.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  
  const displayUsers = alluser
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
    return (
        <>
           <User key={p.idUsr} id={p.idUsr} correo={p.correo} rol={p.rol} nombre={p.nombre} bloqueado={p.bloqueado} alluser={alluser} setAllUser={setAllUser}></User> 
        </>
    ); 
  });
 
  return (
    <>
      <Header></Header>
      <div className="container" style={{ marginTop: "4rem" }}>
      <button className="btn btn-info btn-block my-4 d-flex flex-column justify-content-center align-items-center" onClick={()=>setModalShow(true)} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '20%' }}><i style={{fontSize:'20px'}} class="fa-solid fa-user-plus"></i>CREAR ADMINISTRADOR </button> 
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th><span>Id Usuario</span></th>
                      <th><span>Nombre</span></th>
                      <th><span>Correo</span></th>
                      <th><span>Rol</span></th>
                      <th><span>Activo/Bloqueado</span></th>
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
      <CreateAdmin modalShow={modalShow} setModalShow={setModalShow}></CreateAdmin>
    </>
  );
}

export default UserList;