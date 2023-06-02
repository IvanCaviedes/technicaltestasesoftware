import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Servicios } from './Services.entity';

@Entity()
export class Comercios {
  @PrimaryGeneratedColumn()
  id_comercio: number;

  @Column({ nullable: false })
  nom_comercio: string;

  @Column({ nullable: false })
  aforo_maximo: number;

  @OneToMany(() => Servicios, (servicio) => servicio.id_comercio)
  servicios: Servicios[];
}
