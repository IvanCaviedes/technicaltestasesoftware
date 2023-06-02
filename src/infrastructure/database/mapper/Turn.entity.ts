import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Servicios } from './Services.entity';
@Entity()
export class Turnos {
  @PrimaryGeneratedColumn()
  id_turno: number;

  @ManyToOne(() => Servicios, (servicio) => servicio.turnos)
  @JoinColumn({ name: 'id_servicio' })
  id_servicio: Servicios;

  @Column({ nullable: false, type: 'datetime' })
  fecha_turno: Date;

  @Column({ nullable: false, type: 'timestamp' })
  hora_inicio: Date;

  @Column({ nullable: false, type: 'timestamp' })
  hora_fin: Date;

  @Column({ nullable: false, type: 'bit' })
  estado: boolean;
}
