import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './component/login';
import Home from './component/home';
import Listuser from './component/listuser';
import CreateAdmin from './component/administrador/createAdmin';
import CreateProduct from './component/vendedor/createProduct';
import ShopCart from './component/shopcart';
import RegistroVendedor from './component/cliente/registrarvendedor';
import EditPerfile from './component/cliente/editprofile';
import ListProductVendedor from './component/vendedor/listproductvendedor';
import ProductBuy from './component/cliente/productbuy';
import ProductPending from './component/vendedor/productpending';
import { ProtectedRouteClient ,ProtectedRouteVendeor} from './component/utils/protectedRoute';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
function App() {
  const [user, setUser] = useState({
    token:'dwewaeaea',
    tipouser:'CLIENTE'
  })
  useEffect(() => {
    const idClient = sessionStorage.getItem('user')
    setUser(idClient)
  }, []);
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/listuser' element={<Listuser></Listuser>} />
          <Route path='/createadmin' element={<CreateAdmin></CreateAdmin>} />
          
          <Route element={<ProtectedRouteClient isAllowed={!!user} />}>
            <Route path='/shopcart' element={<ShopCart></ShopCart>} />
          </Route>
          <Route element={<ProtectedRouteVendeor isAllowed={!!user && user.tipouser =='VENDEDOR'} />}>
            <Route path='/createproduct' element={<CreateProduct></CreateProduct>} />
          </Route>

          
          <Route path='/registravendedor' element={<RegistroVendedor></RegistroVendedor>} />
          <Route path='/editperfile' element={<EditPerfile></EditPerfile>} />
          <Route path='/listProductVendedor' element={<ListProductVendedor></ListProductVendedor>} />
          <Route path='/productpending' element={<ProductBuy></ProductBuy>} />
          <Route path='/productpendingSeller' element={<ProductPending></ProductPending>} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
