import axios from "axios";

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
        const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
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
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/login",JSONlogin, {headers: {'Content-Type': 'application/json'}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const createProduct = async (datos,imagenes) =>{
  debugger
  var arrimg = []
  console.log(datos)
  imagenes.forEach(i => arrimg.push(i.ruta));
  var mensaje = [];
  const datosend = {
        "nombre": datos.nombreproducto,
        "descripcion": datos.descripcionproducto,
        "precio" :  12.00,
        "stock" :  datos.stockproducto,
        "categoria" :  datos.categoriaproducto,
        "activo" :  true,
        "imagenesUrl" :  arrimg,
        "idVendedor" : 2,
  }
  const JSONdatosend = JSON.stringify(datosend);
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/alta",JSONdatosend, {headers: {'Content-Type': 'application/json'}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const addProductCart = async (product) =>{
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