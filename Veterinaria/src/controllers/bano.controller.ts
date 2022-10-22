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
} from '@loopback/rest';
import {Bano} from '../models';
import {BanoRepository} from '../repositories';

export class BanoController {
  constructor(
    @repository(BanoRepository)
    public banoRepository : BanoRepository,
  ) {}

  @post('/banos')
  @response(200, {
    description: 'Bano model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bano)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bano, {
            title: 'NewBano',
            exclude: ['id'],
          }),
        },
      },
    })
    bano: Omit<Bano, 'id'>,
  ): Promise<Bano> {
    return this.banoRepository.create(bano);
  }

  @get('/banos/count')
  @response(200, {
    description: 'Bano model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bano) where?: Where<Bano>,
  ): Promise<Count> {
    return this.banoRepository.count(where);
  }

  @get('/banos')
  @response(200, {
    description: 'Array of Bano model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bano, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bano) filter?: Filter<Bano>,
  ): Promise<Bano[]> {
    return this.banoRepository.find(filter);
  }

  @patch('/banos')
  @response(200, {
    description: 'Bano PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bano, {partial: true}),
        },
      },
    })
    bano: Bano,
    @param.where(Bano) where?: Where<Bano>,
  ): Promise<Count> {
    return this.banoRepository.updateAll(bano, where);
  }

  @get('/banos/{id}')
  @response(200, {
    description: 'Bano model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bano, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bano, {exclude: 'where'}) filter?: FilterExcludingWhere<Bano>
  ): Promise<Bano> {
    return this.banoRepository.findById(id, filter);
  }

  @patch('/banos/{id}')
  @response(204, {
    description: 'Bano PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bano, {partial: true}),
        },
      },
    })
    bano: Bano,
  ): Promise<void> {
    await this.banoRepository.updateById(id, bano);
  }

  @put('/banos/{id}')
  @response(204, {
    description: 'Bano PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bano: Bano,
  ): Promise<void> {
    await this.banoRepository.replaceById(id, bano);
  }

  @del('/banos/{id}')
  @response(204, {
    description: 'Bano DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.banoRepository.deleteById(id);
  }
}
