import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {request} from 'http';
import {Veterinario} from '../models';
import {AdministradorRepository, VeterinarioRepository} from '../repositories';
const jwt = require("jsonwebtoken")
@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository("AdministradorRepository")
    public administradorRepository:AdministradorRepository,
    @repository("VeterinarioRepository")
    public veterinarioRepository:VeterinarioRepository
  ) {}

  /*
   * Add service methods here
   */
  IdentificarAdmintrador(usuario:string,contraseña:string){
    
  }
}
