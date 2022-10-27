import {model, property, hasMany} from '@loopback/repository';
import {Persona} from '.';
import {Mascota} from './mascota.model';

@model()
export class Veterinario extends Persona {
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
  especializacion: string;

  @hasMany(() => Mascota)
  MascotasAcargo: Mascota[];

  constructor(data?: Partial<Veterinario>) {
    super(data);
  }
}

export interface VeterinarioRelations {
  // describe navigational properties here
}

export type VeterinarioWithRelations = Veterinario & VeterinarioRelations;
