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
    /*try {
        const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
        console.log(res)
        mensaje = res.data.mensaje;
       } catch (error) {
         console.log(error)
       }*/
       return mensaje;
}