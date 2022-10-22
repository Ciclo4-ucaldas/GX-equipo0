import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Servicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ServicioRepository} from './servicio.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly Susmascotas: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly susServicios: HasManyRepositoryFactory<Servicio, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Mascota, dataSource);
    this.susServicios = this.createHasManyRepositoryFactoryFor('susServicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('susServicios', this.susServicios.inclusionResolver);
    this.Susmascotas = this.createBelongsToAccessorFor('Susmascotas', clienteRepositoryGetter,);
    this.registerInclusionResolver('Susmascotas', this.Susmascotas.inclusionResolver);
  }
}
