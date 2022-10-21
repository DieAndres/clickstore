import Header from "./header";
import Product from "./product";
import ListProduct from "./listproduct";
import Listuser from "./listuser";
import Prueba from "./pruebacosas";
const Home = () =>{
    return (
      <>
        <Header></Header>
        <header className="bg-dark py-5 header-menu">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Shop in style</h1>
              <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
            </div>
          </div>
        </header>
        <ListProduct></ListProduct>
      </>
      );
}

export default Home;
