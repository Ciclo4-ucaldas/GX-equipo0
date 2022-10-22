import {model, property} from '@loopback/repository';
import {Servicio} from '.';

@model()
export class Vacuna extends Servicio {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimiento: string;


  constructor(data?: Partial<Vacuna>) {
    super(data);
  }
}

export interface VacunaRelations {
  // describe navigational properties here
}

export type VacunaWithRelations = Vacuna & VacunaRelations;
