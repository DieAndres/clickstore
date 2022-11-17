
// import your route components too
import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDireccion from './addDireccion';
import Header from '../header';
import { qualificationAverage } from '../../services/service';
const EditPerfile = () =>{
  const [modalShow, setModalShow] = useState(false);
  const [qualification, setQualification] = useState(0);
  useEffect(() => {
    try {
      async function getqualification() {
        const res = await qualificationAverage()
        if(res[0] =='Exito'){
          setQualification(res[1])
        }
        
       
      }
      getqualification()
    } catch (error) {
      console.log(error)
    }
  }, []);

  const RenderRating = () =>{
    const row = [];
    for (var i = 0; i < qualification; i++) {
      row.push(<i key={i} class="fa fa-star"></i>);
    }
    return row;
  }
    return (
      <>
        <Header></Header>
        <div class="d-flex justify-content-center">


          <div class="content text-center">

            <div class="ratings d-flex flex-column">
              <span>Calificacion Promedio</span>
              <span class="product-rating">{qualification}</span>
              <div class="stars">
              <RenderRating></RenderRating>
              </div>
              
              <div class="rating-text">
              </div>

            </div>

          </div>

        </div>
        <AddDireccion show={modalShow} onHide={() => setModalShow(false)} />
        <button onClick={() => setModalShow(true)} >Agregar direccion</button>
      </>
      );
}

export default EditPerfile;
