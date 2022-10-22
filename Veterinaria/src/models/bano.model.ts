import {model, property} from '@loopback/repository';
import {Servicio} from '.';

@model()
export class Bano extends Servicio {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoBano: string;


  constructor(data?: Partial<Bano>) {
    super(data);
  }
}

export interface BanoRelations {
  // describe navigational properties here
}

export type BanoWithRelations = Bano & BanoRelations;
