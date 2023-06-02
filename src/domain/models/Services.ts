import { Comercios } from 'src/infrastructure/database/mapper/Business.entity';

export class ServicesModel {
  id_servicio?: number;
  id_comercio: Comercios;
  id_comercios?: number;
  nom_servicio: string;
  hora_apertura: Date;
  hora_cierre: Date;
  duracion: number;

  constructor(
    nom_servicio: string,
    hora_apertura: Date,
    hora_cierre: Date,
    duracion: number,
    id_comercios?: number,
  ) {
    this.id_comercios = id_comercios;
    this.nom_servicio = nom_servicio;
    this.hora_apertura = hora_apertura;
    this.hora_cierre = hora_cierre;
    this.duracion = duracion;
  }
}
