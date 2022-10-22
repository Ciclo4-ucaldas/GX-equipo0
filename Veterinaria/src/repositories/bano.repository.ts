import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Bano, BanoRelations} from '../models';

export class BanoRepository extends DefaultCrudRepository<
  Bano,
  typeof Bano.prototype.id,
  BanoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Bano, dataSource);
  }
}
