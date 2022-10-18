import axios from "axios";

/*export const createusuario = () =>{
    debugger
  /*  const dato = {
      documento: "22542122-5",
      nombre: "lucas",
      apellido: "martin",
      fechaNacimiento: "2019-04-28T14:45:15",
      correo: "lmartin@correo.com",
      contrasena: "pass123",
      direcciones: [{
         calle: "Bulevar artigas",
         numero: 225,
         apto: "1",
         barrio: "Pocitos",
         ciudad: "MVD",
         departamento: "MVD",
         principal: false
        }]
    }

  axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar",dato, {headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },},{mode: 'no-cors'})
  .then((response) =>{
    console.log(response)
  })*/
  /*fetch('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar', {
  method: 'POST',
  body: {
    "documento": "22542123-5",
	"nombre": "lucas",
	"apellido": "martin",
	"fechaNacimiento": "2019-04-28T14:45:15",
	"correo": "lmartineee@correo.com",
	"contrasena": "pass123",
	"direcciones": [{
		"calle": "Bulevar artigas",
		"numero": 225,
		"apto": "1",
		"barrio": "Pocitos",
		"ciudad": "MVD",
		"departamento": "MVD",
		"principal": false
	}]
  }
  ,
  mode: 'no-cors',    
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Content-Type': 'application/json'
  },
})
  .then((response) => console.log(response))
  .then((json) => console.log(json));
*/
/*
e.preventDefault()
const post = { userName: userName }
try {
  const res = await axios.post('http://localhost:3001/users', post)
  console.log(res.data)
} catch (e) {
  alert(e)
}*/

/*fetch('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get', {
  method: 'GET',
  mode: 'no-cors',    
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Content-Type': 'application/json'
  },
})
  .then((response) => console.log(response))
  .then((json) => console.log(json));



  axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get", {headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Content-Type': 'application/json'
  },},{mode: 'no-cors'})
  .then((response) =>{
    console.log(response)
  })
}*/


export const createusuario = async () => {
 
 /*  const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get",{    
   headers: {
     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
     'Content-Type': 'application/json'
   }});
   //console.log(res)*/
  /* const datos = {
    "documento": "12542323-5",
	"nombre": "lucas",
	"apellido": "martin",
	"fechaNacimiento": "2019-04-28T14:45:15",
	"correo": "lmartineeettttt@correo.com",
	"contrasena": "pass123",
	"direcciones": [{
		"calle": "Bulevar artigas",
		"numero": 225,
		"apto": "1",
		"barrio": "Pocitos",
		"ciudad": "MVD",
		"departamento": "MVD",
		"principal": false
	}]
  }
  try {
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar",datos);
    console.log(res)
   } catch (error) {
     console.log(error)
   }
*/
   /*try {
   const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get");
   console.log(res)
  } catch (error) {
    console.log(error)
  }*/
  /*.then((response) => console.log(response))
  .then((json) => console.log(json));*/
}