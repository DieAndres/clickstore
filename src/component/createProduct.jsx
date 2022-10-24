import { Form } from 'react-bootstrap';
import { useState } from 'react'
import Header from './header';
import { createProduct } from '../services/service';
const CreateProduct = ({setCantpro,cantpro}) =>{
    const [formValues, setFormValues] = useState([{ ruta: ""}])
    const [datos, setDatos] = useState({
        nombreproducto:'',
        precioproducto : '',
        stockproducto : '',
        categoriaproducto : '',
        descripcionproducto : '' 
      });
    const handleInputChange =(event) =>{
        setDatos({
          ...datos,
          [event.target.name] : event.target.value
        })
        console.log(datos)
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
            {cantpro == undefined && <Header></Header>}
            <section className="vh-100" style={{}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                                <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                                    <div className="form-group">
                                        <input type="text" onChange={handleInputChange} name="nombreproducto" id="nombreproducto" className="form-control" placeholder="Nombre"></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" onChange={handleInputChange} name="precioproducto" id="precioproducto" className="form-control" placeholder="Precio"></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" onChange={handleInputChange} name="stockproducto" id="stockproducto" className="form-control" placeholder="Cantidad"></input>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-select" onChange={handleInputChange} name="categoriaproducto" id="categoriaproducto" aria-label="Default select example">
                                            <option defaultValue>Categoria</option>
                                            <option value="INDUMENTARIA">INDUMENTARIA</option>
                                            <option value="ELECTRODOMÉSTICOS">ELECTRODOMÉSTICOS</option>
                                            <option value="VIVERES">VIVERES</option>
                                            <option value="INSTRUMENTOS">INSTRUMENTOS</option>
                                            <option value="CALZADO">CALZADO</option>
                                            <option value="LIBROS">LIBROS</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Descripción</label>
                                        <textarea className="form-control" onChange={handleInputChange} name="descripcionproducto" id="descripcionproducto"  rows="3"></textarea>
                                    </div>
                                    <div className="form-group" id='containerfiles'>
                                        {formValues.map((element, index) => (
                                            <div className="form-inline" key={index}>
                                                <input className="form-control" onChange={e => handleChange(index, e)} name="ruta" id="ruta" type="file"></input>
                                                {
                                                    index ?
                                                        <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                                        : null
                                                }
                                            </div>
                                        ))}


                                    </div>
                                    <div className="form-group">
                                        <p>Cargar otra imagen</p><button type="button" className="btn btn-primary" onClick={() => addFormFields()}><i className="fa-regular fa-plus"></i></button>
                                    </div>
                                    <button className="btn btn-info btn-block my-4" onClick={handleSubmit} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Registrase</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CreateProduct;