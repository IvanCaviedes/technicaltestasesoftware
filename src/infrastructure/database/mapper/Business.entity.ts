import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comercios {
  @PrimaryGeneratedColumn()
  id_comercio: number;

  @Column({ nullable: false })
  nom_comercio: string;

  @Column({ nullable: false })
  aforo_maximo: number;
}
