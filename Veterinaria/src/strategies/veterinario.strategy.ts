import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AuthenticacionService} from '../services';

export class EstrategiaVeterinario implements AuthenticationStrategy {
  name: string = "veterinario";
  constructor(@service(AuthenticacionService)
  public servicioAuthenticacion: AuthenticacionService
  ) { }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    console.log("autenticando...")
  let token=parseBearerToken(request);
  if(token){
    let datos=this.servicioAuthenticacion.ValidarTokenJWT(token);
    console.log(datos.data.rol)
    if(datos.data.rol=="Veterinario"){
    let perfil:UserProfile=Object.assign({
      nombre:datos.data.nombre,
      rol:datos.data.rol
    })
    return perfil;
    }else{
      throw new HttpErrors[401]("el token no es valido")
    }
  }else{
    throw new HttpErrors[401]("no se ha incluido un token valido en la solicitud")
  }
  }
}
