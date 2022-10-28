import { useState} from 'react';
import { addProductCart } from '../services/service';
const Product = ({nombre,precio,id}) =>{
    const [count, setCount] = useState(1);
    const handleaddcart = async (event) =>{
        const product = {
            id:event.target.name,
            countproduct:count
        }
        try{
            const res = await addProductCart(product)
          }catch(error){
              console.log(error)
          }
          return mensaje;
       
    }
    return (
        <>
            <div className="col mb-5">
                <div className="card h-100">

                    <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Envios</div>

                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />

                    <div className="card-body p-4">
                        <div className="text-center">

                            <h5 className="fw-bolder">{nombre}</h5>

                            <div className="d-flex justify-content-center small text-warning mb-2">
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                            </div>

                            <span className="text-muted text-decoration-line-through">{precio}</span>
                        </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="d-flex align-items-center justify-content-center">
                            <button onClick={() => setCount(count - 1)} className="ripple ripple-surface btn btn-link px-2" role="button"><i className="fas fa-minus"></i></button>
                            <div className="form-outline"><p type="number" className="form-control active form-control-sm" min="0" style={{marginBottom:0}}>{count}</p>
                                <div className="form-notch"><div className="form-notch-leading">
                                </div>
                                    <div className="form-notch-middle" style={{ width: "0px" }}>
                                    </div>
                                    <div className="form-notch-trailing">
                                    </div>
                                </div>
                            </div>
                            <button  onClick={() => setCount(count + 1)}  className="ripple ripple-surface btn btn-link px-2" role="button"><i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="text-center"><button name={id} className="btn btn-outline-dark mt-auto" onClick={handleaddcart}>Add to cart</button></div>
                        
                    </div>
                    
                </div>
            </div>
        </>
      );
}

export default Product;
