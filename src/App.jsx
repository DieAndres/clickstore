import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './component/login';
import Home from './component/home';
import Listuser from './component/listuser';
import CreateAdmin from './component/createAdmin';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Login/>}/>
      <Route path='/home' element={<Home></Home>}/>
      <Route path='/listuser' element={<Listuser></Listuser>}/>
      <Route path='/createadmin' element={<CreateAdmin></CreateAdmin>}/>
    </Routes>
  </BrowserRouter>
  
  )
}

export default App
