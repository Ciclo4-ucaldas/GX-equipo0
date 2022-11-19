import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/Llaves';
const generator= require('password-generator')
const cryptoJS= require("crypto-js");
const fetch = require("node-fetch");
@injectable({scope: BindingScope.TRANSIENT})
export class MensajeriaService {
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
    let envio=true
    fetch(Llaves.urlServiceMicroservicePython+`email?correo_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
    .then((result:any) => {
      console.log(result)
    }).catch((err:any) => {
      console.log(err);
      envio=false;
    });
    return envio;
  }
  envioMensajeSMS(destino:string,mensaje:string){
    let envio=true
    fetch(Llaves.urlServiceMicroservicePython+`sms?message=${mensaje}&phone=${destino}`)
    .then((result:any) => {
      console.log(result)
    }).catch((err:any) => {
      console.log(err);
      envio=false;
    });
    return envio;
  }
}
