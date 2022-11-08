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
  const idClient = sessionStorage.getItem('user')
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
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/alta",JSONdatosend, {headers: {'Content-Type': 'application/json'}});
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
  const id = product.id;
  const cantidad = product.countproduct
  const idClient = sessionStorage.getItem('user')
  try{
    const url = "https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/ingresar"
    const res = await axios.post(url,
    {
      // data to sent to the server - post body
      // it can be an empty object
    },
    {
      // specify query parameters
      params: {
        idProducto: id,
        idCliente : idClient,
        cantidad : cantidad
      },
    });
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
  const idClient = sessionStorage.getItem('user')
  try{
    const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/consultar?idCliente="+idClient,
    {
      // data to sent to the server - post body
      // it can be an empty object
    },
    {
      // specify query parameters
      params: {
        idCliente : idClient,
      }
    });
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
  const idClient = sessionStorage.getItem('user')
  try{
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/eliminar?idProducto="+idProducto+"&idCliente="+idClient,
    {
      // data to sent to the server - post body
      // it can be an empty object
    },
    {
      // specify query parameters
      params: {
        idCliente : idClient,
        idProducto: idProducto
      }
    });
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){

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
  const idClient = sessionStorage.getItem('user')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorVendedor?idVendedor="+idClient,{},{headers: {'Content-Type': 'application/json'}})
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



const instance = axios.create({
  baseURL: `http://186.50.151.236:8080/api/vendedor/registrarVendedor`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar Token de Acceso y Refresh Token a todos los requests de Axios
/*instance.interceptors.request.use(
  (config) => {
    debugger
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers["Authorization"] = "Bearer  " + token;
     /* const refreshToken = getRefreshToken();
      if (refreshToken) {
        config.headers["RefreshAuthentication"] = "Bearer " + refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

/*
axios.interceptors.request.use(function (config) {
  debugger
  config.headers.Authorization = 'AUTH_TOKEN';
  return config;
});*/

export const VendedorRegistro = async (datos,formValues) =>{
  debugger
  var mensaje = [];
  const idClient = sessionStorage.getItem('user')
  const token = sessionStorage.getItem('token')
  const datosend = {
        "idUsr": idClient,
        "nombreComercial": datos.nombreComercial,
        "habilitaEnvio" :  datos.envios,
        "direcciones" :  formValues
  }
  const JSONdatosend = JSON.stringify(datosend);
  //var tokensen = "Bearer "+token;
  try{
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
  const idClient = sessionStorage.getItem('user')
  const datosend = {
        "idUsuario": idClient,
        "direcciones": arraydir,
  }
  const JSONdatosend = JSON.stringify(datosend);
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/altadireccion", JSONdatosend, {headers: {'Content-Type': 'application/json'}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
    console.log(error)
  }
}

export const deleteProductVendedor = async (idProducto) =>{
  var mensaje = [];
  debugger
  const idClient = sessionStorage.getItem('user')
  try{
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/baja?idProducto="+idProducto+"&idVendedor="+idClient,
    {
      // data to sent to the server - post body
      // it can be an empty object
    },
    {
      // specify query parameters
      params: {
        idP: idProducto,
        idVendedor:idClient
      }
    });
    mensaje[0]=res.data.mensaje;
  }catch(error){
    console.log(error)
  }
}

export const totalizarcompra = async () =>{
  debugger
  const mensaje = '';
  const idClient = sessionStorage.getItem('user')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/totalizar?idCliente="+idClient,{},{
      params: {
        idCliente : idClient,
      }
    },{headers: {'Content-Type': 'application/json'}})
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
  const idClient = sessionStorage.getItem('user')
  const hoy = formatDate(new Date())
  const datosend = {
        "idCliente": idClient,
        "fecha": hoy,
        "metodo": method,
        "referenciaExterna" : "99999"
  }
  const JSONdatosend = JSON.stringify(datosend);
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompra", JSONdatosend, {headers: {'Content-Type': 'application/json'}})
    /*mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;*/
  }catch(error){
    console.log(error)
  }
}

export const listproductpending = async ()  =>{
  const mensaje = []
  const idClient = sessionStorage.getItem('user')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/pendientesDeElegirEnrega?idC="+idClient,{},{
      params: {
        idCliente : idClient,
      }
    },{headers: {'Content-Type': 'application/json'}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch{
    console.log(console.error())
  }
}

export const methodsend = async (datos,idDir) =>{
  var mensaje=[];
  try{
    debugger
    for (const element of datos) {
      const url="https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/asignarMetodoEnrega?idCompra="+element.idCompra+"&tipoEntrega="+element.tipoEntrega+"&idDireccion="+idDir;
      const res =  await axios.post(url,{},{
    },{headers: {'Content-Type': 'application/json'}})
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
  const idClient = sessionStorage.getItem('user')
  try{
    debugger
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/consultarDirecciones?idCliente="+idClient,{},{
      params: {
        idCliente : idClient,
      }
    },{headers: {'Content-Type': 'application/json'}})
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
  const idClient = sessionStorage.getItem('user')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/listarVentasEnvioPendiente?idVendedor="+idClient,{},{
      params: {
        idCliente : idClient,
      }
    },{headers: {'Content-Type': 'application/json'}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch{
    console.log(console.error())
  }
}