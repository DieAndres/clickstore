import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
  import React from "react";
  import Header from "./header";
  import { useState,useEffect } from 'react';
  import { getProductCart, deleteProductCart } from "../services/service";
  import {
      PayPalScriptProvider,
      PayPalButtons,
      usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import ButtonWrapper from "./paypalCart";
import { totalizarcompra } from "../services/service";
// This values are the props in the UI

  export default function ShopCart() {
    const currency = "USD";
    const [productos, setproductos] = useState([{ cantidad: 0,id:0,idProducto:0,total:0,nombreProducto:''}]);
    const [preciototal, setPreciototal] =useState(0);
    const [cantproductos, setCantProducto] =useState(0);
    const [renderPago, setRenderPago] =useState(false);
    var totalprecio=0;
    useEffect(() => {
      try {
        async function getProduct() {
          const res = await getProductCart();
          const arrprod = res[1];
          setproductos(arrprod)
          arrprod.forEach(function (p) {
            console.log(p.total)
            totalprecio = totalprecio +  p.total
            setPreciototal(totalprecio)
          });
          setCantProducto(arrprod.length)
        }
        getProduct()
      } catch (error) {
        console.log(error)
      }

    }, []);

    
    
    let removeFormFields = async (i) => {
      try{
        console.log(i);
        const idProducto = productos[i].idProducto;
        let newproductos = [...productos];
        newproductos.splice(i, 1);
        setproductos(newproductos)
        debugger
        if(newproductos.length <=0){
          setPreciototal(totalprecio)
        }else{
          newproductos.forEach(function(p) {
            totalprecio = totalprecio+p.total
            console.log(totalprecio)
            setPreciototal(totalprecio)
         });
        }
        setCantProducto(newproductos.length)
        const res = await deleteProductCart(idProducto)
      }catch(error){
        
      }
  }
  let comenzarPago = async () =>{
    try{
      const res = await totalizarcompra();
      if(res=='Exito'){
        setRenderPago(true)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <Header></Header>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                            Cantidad Productos : {cantproductos}
                          </MDBTypography>
                        </div>
                        {productos.map((element, index) => (
                          <MDBRow className="mb-4 d-flex justify-content-between align-items-center" key={index}>
                            <hr className="my-4" />
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                fluid className="rounded-3" alt="Cotton T-shirt" />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h6" className="text-muted">
                                Nombre
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                {element.nombreProducto}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="">
                              <MDBTypography tag="h6" className="text-muted">
                                Cantidad
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                {element.cantidad}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="">
                              <MDBTypography tag="h6" className="text-muted">
                                Precio
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                $ {element.total}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <button className="text-muted" onClick={() => removeFormFields(index)}>
                                <MDBIcon fas icon="times" />
                              </button>
                            </MDBCol>
                            <hr className="my-4" />
                          </MDBRow>
                        ))}



                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText tag="a" href="#!" className="text-body">
                              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                              to shop
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Summary
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            items 3
                          </MDBTypography>
                          <MDBTypography tag="h5">€ 132.00</MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                            <option value="1">Standard-Delivery- €5.00</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                          </select>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Give code
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput size="lg" label="Enter your code" />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">{preciototal}</MDBTypography>
                        </div>
                        {!renderPago && <button className="btn btn-dark" onClick={comenzarPago}>Comenzar compra</button>}
                        {renderPago && <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                          <PayPalScriptProvider
                            options={{
                              "client-id": "Ab5QCDojr8-_SiXyMXmEv9GRITDE11topuPaRnlczXy4Ud39lkD0b5CQOoBwcbgyKCsd2ObQERJX08Gc",
                              components: "buttons",
                              currency: "USD"
                            }}
                          >
                            <ButtonWrapper
                              currency={currency}
                              showSpinner={false}
                              preciototal={preciototal}
                            />
                          </PayPalScriptProvider>
                        </div>}
                          
                        
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
  }