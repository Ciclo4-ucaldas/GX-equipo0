import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {

  public readonly MascotasAcargo: HasManyRepositoryFactory<Mascota, typeof Veterinario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Veterinario, dataSource);
    this.MascotasAcargo = this.createHasManyRepositoryFactoryFor('MascotasAcargo', mascotaRepositoryGetter,);
    this.registerInclusionResolver('MascotasAcargo', this.MascotasAcargo.inclusionResolver);
  }
}
