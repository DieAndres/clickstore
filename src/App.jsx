import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './component/login';
import Home from './component/home';
import Listuser from './component/listuser';
import CreateAdmin from './component/administrador/createAdmin';
import CreateProduct from './component/vendedor/createProduct';
import ShopCart from './component/shopcart';
import Prueba from './component/pruebacosas';
import RegistroVendedor from './component/cliente/registrarvendedor';
import EditPerfile from './component/cliente/editprofile';
import ListProductVendedor from './component/vendedor/listproductvendedor';
import ProductBuy from './component/cliente/productbuy';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/listuser' element={<Listuser></Listuser>} />
          <Route path='/createadmin' element={<CreateAdmin></CreateAdmin>} />
          <Route path='/createproduct' element={<CreateProduct></CreateProduct>} />
          <Route path='/shopcart' element={<ShopCart></ShopCart>} />
          <Route path='/registravendedor' element={<RegistroVendedor></RegistroVendedor>} />
          <Route path='/editperfile' element={<EditPerfile></EditPerfile>} />
          <Route path='/listProductVendedor' element={<ListProductVendedor></ListProductVendedor>} />
          <Route path='/productpending' element={<ProductBuy></ProductBuy>} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
