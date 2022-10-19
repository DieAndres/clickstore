import {Link} from 'react-router-dom';
import logo from "../assets/CSFinal-3.png";
import { useState,useEffect  } from 'react';
const Header = () =>{
    const [tipoUser, setTipoUser] = useState(null);
    useEffect(() => {
        setTipoUser('VENDEDOR');
      });
   
    const MenuVendedor = ()=>{
        return (
            <li className="nav-item"> <Link className='nav-link' to='/createproduct'>Crear Producto</Link></li>
        )
    }
    const MenuAdministrador= ()=>{
        return (
            <>
                <li className="nav-item"> <Link className='nav-link' to='/listuser'>Busqueda Usuarios</Link></li>
                <li className="nav-item"> <Link className='nav-link' to='/createadmin'>Crear Administrador</Link></li>
            </>
        )
    }
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
            <Link to='/home'><img src={logo} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem",width:"100px"}} ></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                        <li className="nav-item"> <Link className='nav-link' to='/listuser'>Busqueda Usuarios</Link></li>
                        <li className="nav-item"> <Link className='nav-link' to='/createadmin'>Crear Administrador</Link></li>
                        <li className="nav-item"> <Link className='nav-link' to='/createproduct'>Crear Producto</Link></li>
                        {tipoUser == 'VENDEDOR' ? <MenuVendedor></MenuVendedor> : ''}
                        {tipoUser == 'ADMIN' ? <MenuAdministrador></MenuAdministrador> : ''}
                        <li className="nav-item">
                                <div className="dropdown show">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
                        <i className="fa-solid fa-cart-shopping"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form>
                    <div>
                        <div className="container-fluid">
                            <ul className="navbar-nav">                                
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                                            className="rounded-circle"
                                            height="22"
                                            alt="Portrait of a Woman"
                                            loading="lazy"
                                        />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <a className="dropdown-item" href="#">My profile</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </nav>
      </>
      );
}

export default Header;
