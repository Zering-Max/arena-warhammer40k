import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('character')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  attaque: number;
  @Column()
  pv: number;
  @Column()
  image: string;
}
