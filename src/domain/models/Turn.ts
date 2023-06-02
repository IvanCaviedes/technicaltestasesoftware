import { Servicios } from 'src/infrastructure/database/mapper/Services.entity';

export class TurnModel {
  id_turno?: number;
  id_servicio: Servicios;
  id_servicios?: number;
  fecha_turno: Date;
  hora_inicio: Date;
  hora_fin: Date;
  estado?: boolean;

  constructor(
    fecha_turno: Date,
    hora_inicio: Date,
    hora_fin: Date,
    estado?: boolean,
    id_servicios?: number,
  ) {
    this.id_servicios = id_servicios;
    this.fecha_turno = fecha_turno;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.estado = estado;
  }
}
