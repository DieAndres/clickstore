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
import ListSellerRequest from './component/administrador/listSellerRequest';
import Pendingshoppinglist from './component/cliente/pendingshoppinglist';
import ListShoppinghistory from './component/cliente/listshoppinghistory';
import { ProtectedRouteClient ,ProtectedRouteVendeor} from './component/utils/protectedRoute';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import { toast } from 'react-toastify';

toast.configure({
    autoClose: 4000,
    draggable: false,
    closeButton: false,
    draggablePercent: 100,
    progressClassName: 'ourbar',
    position: 'top-left',
    style: {top: '90px'}
  });
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/listuser' element={<Listuser></Listuser>} />
          <Route path='/createadmin' element={<CreateAdmin></CreateAdmin>} />
          
          <Route element={<ProtectedRouteClient />}>
            <Route path='/shopcart' element={<ShopCart></ShopCart>} />
            <Route path='/registravendedor' element={<RegistroVendedor></RegistroVendedor>} />
            <Route path='/productpending' element={<ProductBuy></ProductBuy>} />
            <Route path='/editperfile' element={<EditPerfile></EditPerfile>} />
            <Route path='/pendingshoppinglist' element={<Pendingshoppinglist></Pendingshoppinglist>} />
            <Route path='/listshoppinghistory' element={<ListShoppinghistory></ListShoppinghistory>} />
          </Route>
          <Route element={<ProtectedRouteVendeor />}>
            <Route path='/createproduct' element={<CreateProduct></CreateProduct>} />
            <Route path='/listProductVendedor' element={<ListProductVendedor></ListProductVendedor>} />
            <Route path='/productpendingSeller' element={<ProductPending></ProductPending>} />
          </Route>

          
          <Route path='/listSellerRequest' element={<ListSellerRequest></ListSellerRequest>} />
          
          
         
          
          
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
