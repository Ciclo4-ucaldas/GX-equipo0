import {authenticate} from '@loopback/authentication';
import { service } from '@loopback/core';
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
import {Veterinario} from '../models';
import {VeterinarioRepository} from '../repositories';
import { MensajeriaService } from '../services';

@authenticate("veterinario")
export class VeterinarioController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository : VeterinarioRepository,
    @service(MensajeriaService)
    public mensajeriaService :MensajeriaService
  ) {}

  @post('/veterinarios')
  @response(200, {
    description: 'Veterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario | any> {
    let clave = this.mensajeriaService.Generarclave();
    let claveCifrada=this.mensajeriaService.CifrarClave(clave);
   veterinario.contrasena=claveCifrada;
     let veteri = await this.veterinarioRepository.create(veterinario);
     let destino=veterinario.usuario;
     let asunto="Registro en la plataforma"
 //    let contenido="prueba"
     let contenido=`hola${veterinario.nombre} ${veterinario.apellidos} su usuario es:${veterinario.usuario} y su contraseña temporal es: ${veterinario.contrasena}`
     let mensajeEmail= await this.mensajeriaService.envioMensajeEmail(destino,asunto,contenido);
     let mensajeSMS= await this.mensajeriaService.envioMensajeSMS(veterinario.celular,contenido);
    // return mensaje;
     if(mensajeSMS&&mensajeEmail){
      return veteri;
     }else{
      return new HttpErrors[400]("No se pudo mandar el correo al crear el veteri")
     }
  }

  @get('/veterinarios/count')
  @response(200, {
    description: 'Veterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.count(where);
  }

  @get('/veterinarios')
  @response(200, {
    description: 'Array of Veterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinario) filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.veterinarioRepository.find(filter);
  }

  @patch('/veterinarios')
  @response(200, {
    description: 'Veterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.updateAll(veterinario, where);
  }

  @get('/veterinarios/{id}')
  @response(200, {
    description: 'Veterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinario>
  ): Promise<Veterinario> {
    return this.veterinarioRepository.findById(id, filter);
  }

  @patch('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.updateById(id, veterinario);
  }

  @put('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.replaceById(id, veterinario);
  }

  @del('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinarioRepository.deleteById(id);
  }
}
