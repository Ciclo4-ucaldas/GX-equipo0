import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly susServicios: HasManyRepositoryFactory<Mascota, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Servicio, dataSource);
    this.susServicios = this.createHasManyRepositoryFactoryFor('susServicios', mascotaRepositoryGetter,);
    this.registerInclusionResolver('susServicios', this.susServicios.inclusionResolver);
  }
}
