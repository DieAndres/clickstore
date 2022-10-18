
// import your route components too
import { useState } from 'react'
import image from "../assets/login.jpg";
import logo from "../assets/CSFinal-3.png";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Registro from './registro';
import { createusuario } from '../services/prueba';
import axios from "axios";
const Login = () =>{
  const [modalShow, setModalShow] = useState(false);
  createusuario();
    return (
      <>
        <Registro show={modalShow} onHide={() => setModalShow(false)} />
        <section className="vh-100" style={{ backgroundColor: "#007f61" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img src={image} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }} ></img>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">

                        <form>

                          <div className="d-flex align-items-center mb-3 pb-1">
                            <img src={logo} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} ></img>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3">Iniciar sesión</h5>

                          <div className="form-outline mb-4">
                            <input type="email" id="form2Example17" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="form2Example17">Email</label>
                          </div>

                          <div className="form-outline mb-4">
                            <input type="password" id="form2Example27" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                          </div>

                          <div className="pt-1 mb-4">
                            <Link to='/home' className="btn btn-lg btn-block" style={{ backgroundColor: "#212326", color: "#FFFFFF" }} type="button">Iniciar sesión</Link>
                          </div>

                          <a className="small text-muted" href="#!">¿Se te olvidó tu contraseña?</a>
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>¿No tienes una cuenta?<a type="button" className="blink-dark"  onClick={() => setModalShow(true)}
                            style={{ color: "#393f81" }}> Registrarse aquí </a></p>                            
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      );
}

export default Login;
