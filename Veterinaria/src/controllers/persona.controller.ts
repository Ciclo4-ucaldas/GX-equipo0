import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Credenciales, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {AuthenticacionService} from '../services';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AuthenticacionService)
    public servicioAuthenticacion:AuthenticacionService
  ) {}

  @post("/identificarPersona",{
    responses:{
      '200':{
        description:"Identificacion de usuarios"
      }
    }
  }
  )
  async identificacionPersona(@requestBody() credenciales:Credenciales){
    let persona = await this.servicioAuthenticacion.IdentificarPersona(credenciales.usuario,credenciales.contrasena)
    if(persona){
      let token= await this.servicioAuthenticacion.GenerarTokenJWT(persona);
      return {
        datos:{
          nombres:persona.nombre,
          correo:persona.usuario,
          id:persona.id
        },
        tk:token
      }
    }else{
      throw new HttpErrors[401]("los datos no son validos")
    }
  }
}
