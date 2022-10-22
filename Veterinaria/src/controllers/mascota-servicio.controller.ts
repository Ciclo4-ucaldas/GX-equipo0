import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  Servicio,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaServicioController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.mascotaRepository.susServicios(id).find(filter);
  }

  @post('/mascotas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.mascotaRepository.susServicios(id).create(servicio);
  }

  @patch('/mascotas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Mascota.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.mascotaRepository.susServicios(id).patch(servicio, where);
  }

  @del('/mascotas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Mascota.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.mascotaRepository.susServicios(id).delete(where);
  }
}
