import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator= require('password-generator')
const cryptoJS= require("crypto-js");
const fetch = require("node-fetch");
@injectable({scope: BindingScope.TRANSIENT})
export class MensajeriaService {
  envio:string="sin cambio"
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  Generarclave(){
    let clave = generator(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let clavefiltrada=cryptoJS.MD5(clave);
    return clavefiltrada;
  }

  envioMensajeEmail(destino:string,asunto:string,contenido:string){
    //let envio=false
    fetch(`http://127.0.0.1:5000/email?correo_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
    .then((result:any) => {
      console.log(result)
      this.envio=result;
    }).catch((err:any) => {
      console.log(err);
      this.envio=err;
    });
    return this.envio;
  }
}
