import {Link,useNavigate} from 'react-router-dom';
import logo from "../assets/CSFinal-3.png";
import React, { useState,useEffect  } from 'react';
import { getHeader } from '../services/service';
const Header = () =>{
    const [tipoUser, setTipoUser] = useState('');
    const navigate = useNavigate();
      useEffect(() => {
        async function getRol() {
            const res = await getHeader()
            setTipoUser(res[1])
          }
          getRol()
      }, []);
    const logout = () =>{
        sessionStorage.setItem("user",'');
        sessionStorage.setItem("rol", '');
        sessionStorage.setItem("token", '');
        navigate('/')
    }
    const MenuVendedor = ()=>{
        return (
            <React.Fragment>
                <MenuCliente></MenuCliente>
                <MenuAdministrador></MenuAdministrador>
            <div className="nav-item">
                
                        <div className="dropdown show">
                            <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Vendedor
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li className="nav-item"> <Link className='nav-link' to='/createproduct'>Crear Producto</Link></li>
                                <li className="nav-item"> <Link className='nav-link' to='/listProductVendedor'>Mis productos</Link></li>
                                <li className="nav-item"> <Link className='nav-link' to='/productpendingSeller'>Confirmar Ventas</Link></li>
                                <li className="nav-item"> <Link className='nav-link' to='/listClaim'>Gestion de Reclamos</Link></li>
                                <li className="nav-item"> <Link className='nav-link' to='/qualificationClient'>Calificar Cliente</Link></li>
                            </div>
                        </div>
            </div>
            </React.Fragment>
        )
    }
    const MenuAdministrador= ()=>{
        debugger
        return (
            <>
                <div className="nav-item">

                    <div className="dropdown show">
                        <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Administrador
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li className="nav-item"> <Link className='nav-link' to='/createadmin'>Crear Administrador</Link></li>
                            <li className="nav-item"> <Link className='nav-link' to='/listSellerRequest'>Confirmar Vendedores</Link></li>
                            <li className="nav-item"> <Link className='nav-link' to='/userlist'>Gestion de Usuarios</Link></li>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const MenuCliente = () =>{
        return (
            <>
                {tipoUser != 'ROL_VENDEDOR' ? <li className="nav-item"> <Link className='nav-link' to='/registravendedor'>Registrarse como vendedor</Link></li> :''}
                <li className="nav-item"> <Link className='nav-link' to='/pendingshoppinglist'>Confirmar Entregas</Link></li>
                <li className="nav-item"> <Link className='nav-link' to='/listshoppinghistory'>Historial de Compras</Link></li>
                <li className="nav-item"> <Link className='nav-link' to='/qualificationSeller'>Calificar Vendedor</Link></li>
                
            </>
        )
    }
    const BtnLogeado = () =>{
        if(tipoUser == ''){
            return(
                <>
                <form className="d-flex">
                    <Link to='/'>
                        <button className="btn btn-outline-dark" type="submit"> 
                            Ingresar
                        </button>
                    </Link>
                </form>
            </>
            )
        }else{
            return(
                <>
                    <form className="d-flex">
                        <Link to='/shopcart'><button className="btn btn-outline-dark" type="submit">
                            <i className="fa-solid fa-cart-shopping"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button></Link>
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
                                            <Link className='nav-link' to='/editperfile'>Editar Perfil</Link>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a onClick={logout} className="dropdown-item" href="#">Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <Link to='/home'><img src={logo} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", width: "100px" }} ></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            
                            {tipoUser == 'ROL_VENDEDOR' ? <MenuVendedor></MenuVendedor> : ''}
                            {tipoUser == 'ROL_ADMIN' ? <MenuAdministrador></MenuAdministrador> : ''}
                            {tipoUser == 'ROL_CLIENTE' ? <MenuCliente></MenuCliente> : ''}
                            
                        </ul>
                        <BtnLogeado></BtnLogeado>

                    </div>

                </div>
            </nav>
        </>
      );
}

export default Header;
