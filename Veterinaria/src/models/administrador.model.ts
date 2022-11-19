import {model, property} from '@loopback/repository';
import {Persona} from '.';

@model()
export class Administrador extends Persona {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
