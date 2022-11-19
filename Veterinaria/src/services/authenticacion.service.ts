import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Administrador, Persona, Veterinario} from '../models';
import {AdministradorRepository, ClienteRepository, PersonaRepository, VeterinarioRepository} from '../repositories';
import { Llaves } from '../config/Llaves';
const jwt = require("jsonwebtoken")
@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository("AdministradorRepository")
    public administradorRepository:AdministradorRepository,
    @repository("VeterinarioRepository")
    public veterinarioRepository:VeterinarioRepository,
    @repository("PersonaRepository")
    public personaRepository:PersonaRepository,
    @repository("ClienteRepository")
    public clienteRepository:ClienteRepository
  ) {}

  /*
   * Add service methods here
   */

async  IdentificarPersona(usuario:string,contraseña:string){
    try {
      console.log(usuario);
      console.log(contraseña);
      let admin=await this.administradorRepository.findOne({where:{usuario:usuario,contrasena:contraseña}})
      let veterinario=await this.veterinarioRepository.findOne({where:{usuario:usuario,contrasena:contraseña}})
      let client=await this.clienteRepository.findOne({where:{usuario:usuario,contrasena:contraseña}})
      console.log(admin)
      if(admin){
        return admin;
      }else if(veterinario){
         return veterinario;
      }else if(client){
        return client;
      }
      return false;
    } catch (error) {
     console.log(error)
     return error;
    }
  }
  /*IdentificarAdmintrador(usuario:string,contraseña:string){
    try {
      let admin=this.administradorRepository.findOne({where:{usuario:usuario,contrasena:contraseña}})
      if(admin){
        return admin;
      }
      return false;
    } catch (error) {
     console.log(error)
     return false;
    }
  }*/

  /*IdentificarVeterinario(usuario:string,contraseña:string){
    try {
      let veterinario= this.veterinarioRepository.findOne({where:{usuario:usuario,contrasena:contraseña}})
    } catch (error) {

    }
  }*/

 async GenerarTokenJWT(persona:Persona){
   let admin= await this.administradorRepository.findOne({where:{usuario:persona.usuario,contrasena:persona.contrasena}})
   let vete=await this.veterinarioRepository.findOne({where:{usuario:persona.usuario,contrasena:persona.contrasena}})
   let client=await this.clienteRepository.findOne({where:{usuario:persona.usuario,contrasena:persona.contrasena}})
   let rol;
   if(admin){
    rol=admin.constructor.name
   }else if(vete){
    rol=vete.constructor.name
   }else if(client){
    rol=client.constructor.name
   }
   console.log(rol);
   let token =jwt.sign(
      {
        data:{
          id:persona.id,
          correo:persona.usuario,
          nombres:persona.nombre,
          apellidos:persona.apellidos,
          rol:rol
        }
      },Llaves.claveJWT
    );
    return token;
  }


/*  GenerarTokenJWT(administrador:Administrador){
    let token =jwt.sign(
      {
        data:{
          id:administrador.id,
          correo:administrador.usuario,
          nombres:administrador.nombre,
          apellidos:administrador.apellidos,
          rol:administrador.constructor.name
        }
      },Llaves.claveJWT
    );
    return token;
  }*/

  ValidarTokenJWT(token:string){
     try {
      let datos = jwt.verify(token,Llaves.claveJWT)
      return datos
     } catch (error) {
       console.log(error)
       return false;
     }
  }
}
