
import { useState } from 'react'
import CreateProduct from './createProduct';
import Header from './header';
const RegistroVendedor = (props) =>{
  const [cantpro,setCantpro] = useState(0)
  const [formValues, setFormValues] = useState([{ ruta: ""}])
    const [datos, setDatos] = useState({
      nombreComercial:'',
      envios : false 
      });
    const handleInputChange =(event) =>{
        setDatos({
          ...datos,
          [event.target.name] : event.target.value
        })
      }
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        console.log(formValues)
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { ruta: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = async (event) => {
        try{
           // const resp = await createProduct(datos,formValues);
            //setMensaje(resp)
            setDatos({
              ...datos,
              nombreproducto:'',
              precioproducto : '',
              stockproducto : '',
              categoriaproducto : ''
            })
            setCantpro(cantpro+1)
          }catch(error){
            console.log(error)
          }
    }
    return (
      <>
        <Header></Header>
        <section className="vh-100" style={{}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                  <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                    <div className="form-group">
                      <input type="text" onChange={handleInputChange} name="nombreComercial" id="nombreComercial" className="form-control" placeholder="Nombre Comercial"></input>
                    </div>
                    <div className="form-group">
                      <input className="form-check-input" onChange={(event)=>setDatos ({...datos,envios:event.target.checked})} name='envios' type="checkbox" value="" id="envios"></input>
                      <label className="form-check-label" htmlFor="envios">
                        Cuenta con Envios
                      </label>
                    </div>
                    
                            {formValues.map((element, index) => (
                              <div className="row d-flex justify-content-center align-items-center h-100" key={index}>
                              <div className="">
                                <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                                  <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="calle" id="calle" className="form-control" placeholder="Calle"></input>
                                </div>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="numero" id="numero" className="form-control" placeholder="Numero"></input>
                                </div>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="apto" id="apto" className="form-control" placeholder="Apartamento"></input>
                                </div>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="barrio" id="barrio" className="form-control" placeholder="Barrio"></input>
                                </div>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="barrio" id="barrio" className="form-control" placeholder="Barrio"></input>
                                </div>
                                <div className="form-group">
                                  <input type="text" onChange={handleInputChange} name="departamento" id="departamento" className="form-control" placeholder="Departamento"></input>
                                </div>
                                <div className="form-group">
                                  <input className="form-check-input" type="checkbox" value="" id="principal"></input>
                                  <label className="form-check-label" htmlFor="principal">
                                    Principal
                                  </label>
                                </div>
                                {
                                  index ?
                                    <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                                }
                              </div></div></div></div>
                            ))}
                         
                    <div className="form-group">
                      <p>Cargar otra direccion</p><button type="button" className="btn btn-primary" onClick={() => addFormFields()}><i className="fa-regular fa-plus"></i></button>
                    </div>
                    <button className="btn btn-info btn-block my-4" onClick={handleSubmit} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Registrase</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {datos.nombreproducto != '' && <CreateProduct setCantpro={setCantpro} cantpro={cantpro}></CreateProduct>}
        
      </>
      );
}

export default RegistroVendedor;
