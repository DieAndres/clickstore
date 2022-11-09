import axios from "axios";
import { storage } from "../component/firebase";

export const registerUser = async (datos) =>{
    debugger
    var mensaje = '';
    const usuario = {
        "documento": datos.documentoregistro,
        "nombre": datos.nombreregistro,
        "apellido": datos.apellidoregistro,
        "fechaNacimiento": datos.registrofechanac,
        "correo": datos.mailregistro,
        "contrasena": datos.contraseniaregistro,
        "direcciones": [{
            "calle": datos.calleregistro,
            "numero": datos.numeroregistro,
            "apto": datos.aptoregistro,
            "barrio": datos.barrioregistro,
            "ciudad": datos.ciudadregistro,
            "departamento": datos.departamentoegistro,
            "principal": true
        }]
      }
      const JSONuser = JSON.stringify(usuario);
      try {
        const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
        console.log(res)
        mensaje = res.data.mensaje;
       } catch (error) {
         console.log(error)
       }
       return mensaje;
}

export const loginUser = async (datos) =>{
  debugger
  var mensaje = [];
  const login = {
        "correo": datos.maillogin,
        "contrasena": datos.contrasenialogin,
  }
  const JSONlogin = JSON.stringify(login);
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/login",JSONlogin, {headers: {'Content-Type': 'application/json'}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.idUser;
    mensaje[2] = res.data.objeto;
    mensaje[3] = res.data.rol;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const createProduct = async (datos,imagenes) =>{
  debugger
  var arrimg = []
  console.log(datos)
  imagenes.forEach(i => arrimg.push(i.ruta.name));
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datosheader = await getHeader();
    const idClient = datosheader[0];
    const datosend = {
      "nombre": datos.nombreproducto,
      "descripcion": datos.descripcionproducto,
      "precio" :  datos.precioproducto,
      "stock" :  datos.stockproducto,
      "categoria" :  datos.categoriaproducto,
      "activo" :  true,
      //"imagenesUrl" :  arrimg,
      "imagenesUrl" :  arrimg,
      "idVendedor" : idClient,
}
const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/alta",JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    //subir imagenes a firebase
    imagenes.forEach(element => {
      debugger
      var image = element.ruta
      const uploadTask = storage.ref(`images/${res.data.objeto}_${image.name}`).put(image);
      uploadTask.on(
      "state_changed",
      snapshot => {
          const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //setProgress(progress);
      },
      error => {
          console.log(error);
      },
      () => {
          storage
          .ref("images")
          .child('prueba')
          .getDownloadURL()
          .then(url => {
          });
      }
      );
  });
  

  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const addProductCart = async (product) =>{
  debugger
  var mensaje =[];
  const id = product.id;
  const cantidad = product.countproduct
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const url = "https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/ingresar?idProducto="+id+"&idCliente="+idClient+"&cantidad="+cantidad
    const res = await axios.post(url,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const getProductCart = async () =>{
  debugger
  const mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/consultar?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje  ;
}


export const deleteProductCart = async (idProducto) =>{
  debugger
  const mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/eliminar?idProducto="+idProducto+"&idCliente="+idClient,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
    console.log(error)
  }
}


export const AllListProductActive = async () =>{
  const mensaje = [];
  debugger
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarActivos",{},{headers: {'Content-Type': 'application/json'}})
   return res.data
  }catch(error){
    console.log(error)
  }
}

export const AllListProductVendedor = async () =>{
  const mensaje = [];
  debugger
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorVendedor?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
   return res.data
  }catch(error){
    console.log(error)
  }
}


export const AllListProduct = async () =>{
  const mensaje = [];
  debugger
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarTodos",{},{headers: {'Content-Type': 'application/json'}})
   return res.data
  }catch(error){
    console.log(error)
  }
}


export const VendedorRegistro = async (datos,formValues) =>{
  debugger
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const datosend = {
      "idUsr": idClient,
      "nombreComercial": datos.nombreComercial,
      "habilitaEnvio" :  datos.envios,
      "direcciones" :  formValues
    } 
  const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/vendedor/registrarVendedor",JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}}
    );
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}


export const agregarDireccion = async (datos) =>{
  debugger
  var mensaje = [];
  var arraydir = [];
  arraydir.push(datos)

  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const datosend = {
      "idUsuario": idClient,
      "direcciones": arraydir,
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/altadireccion", JSONdatosend,  {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const deleteProductVendedor = async (idProducto) =>{
  debugger
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/baja?idProducto="+idProducto+"&idVendedor="+idClient,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    return mensaje[0]=res.data.mensaje;
  }catch(error){
    console.log(error)
  }
}

export const totalizarcompra = async () =>{
  debugger
  const mensaje = '';
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/totalizar?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
   return res.data.mensaje
  }catch(error){
    console.log(error)
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

export const confirmarCompra = async (method) =>{
  debugger
  const hoy = formatDate(new Date())
  
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const datosend = {
      "idCliente": idClient,
      "fecha": hoy,
      "metodo": method,
      "referenciaExterna" : "99999"
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompra", JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    /*mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;*/
  }catch(error){
    console.log(error)
  }
}

export const listproductpending = async ()  =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/pendientesDeElegirEntrega?idC="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch{
    console.log(console.error())
  }
}

export const methodsend = async (datos,idDir) =>{
  var mensaje=[];
  const token = sessionStorage.getItem('token')
  try{
    debugger
    for (const element of datos) {
      const url="https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/asignarMetodoEntrega?idCompra="+element.idCompra+"&tipoEntrega="+element.tipoEntrega+"&idDireccion="+idDir;
      const res =  await axios.post(url,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
    }
    return mensaje
  }catch{
    console.log(console.error())
  }
}

export const getDireccion = async () =>{
  var mensaje=[];
  debugger
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/consultarDirecciones?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch{
    console.log(console.error())
  }
}

export const searchproduct = async (search) =>{
  try{
    debugger
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/buscarPorNombre?nombre="+search,{},{
      params: {
        nombre : search,
      }
    },{headers: {'Content-Type': 'application/json'}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch(error){
    console.log(error)
  }
}


export const filterCategory = async(category) =>{
  try{
    debugger
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorCategoria?categoria="+category,{},{
      params: {
        categoria : category,
      }
    },{headers: {'Content-Type': 'application/json'}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch(error){
    console.log(error)
  }
}

export const listproductpendingSeller = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/listarVentasEntregaPendiente?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const getHeader = async () =>{
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/priv/getHeader",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.idUser;
    mensaje[1] = res.data.rol;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const getImageProduct = (image) =>{
  debugger
  let imagenret =''
  storage
  .ref("images")
  .child(image)
  .getDownloadURL()
  .then(url => {
    debugger
     console.log(url)
  });
    return imagenret
}

export const setFechaentrega = async(fecdes,fechas,id) =>{
  let mensaje = ''
  debugger
  const token = sessionStorage.getItem('token')
  const fecdesG = fecdes.split('T')
  fecdes = fecdesG[0]+' '+fecdesG[1]+':00';

  const fechasG = fechas.split('T')
  fechas = fechasG[0]+' '+fechasG[1]+':00';
  const datosend = {
    "idCompra": id,
    "fechaHoraDesde": fecdes,
    "fechaHoraHasta": fechas,
  }
  const JSONdatosend = JSON.stringify(datosend);
  try{
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/setearEntrega",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }

}

export const listSellerRquest = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/getPendientes",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const sellerEnable = async(idVendedor,aprobado) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/cambiarEstado?idVendedor="+idVendedor+"&aprobado="+aprobado,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const getListpendingshopping = async() =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasEntregaPendiente?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const confirmpendingshopping = async (idCompra) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompraRecibida?idCompra="+idCompra,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const listshoppinghistory = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasCliente?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}