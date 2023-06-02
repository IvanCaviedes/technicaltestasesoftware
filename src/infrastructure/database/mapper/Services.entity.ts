import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Comercios } from './Business.entity';
import { Turnos } from './Turn.entity';
@Entity()
export class Servicios {
  @PrimaryGeneratedColumn()
  id_servicio: number;

  @ManyToOne(() => Comercios, (comercio) => comercio.servicios)
  @JoinColumn({ name: 'id_comercio' })
  id_comercio: Comercios;

  @Column({ nullable: false })
  nom_servicio: string;

  @Column({ nullable: false, type: 'timestamp' })
  hora_apertura: Date;

  @Column({ nullable: false, type: 'timestamp' })
  hora_cierre: Date;

  @Column({ nullable: false })
  duracion: number;

  @OneToMany(() => Turnos, (turno) => turno.id_servicio)
  turnos: Turnos[];
}
