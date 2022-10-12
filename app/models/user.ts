import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Card } from '../models/card';
import { Set } from '../models/set';
@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  lastname: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'standard'
  })
  role: string;

  @ManyToMany(
    () => Card,
    // eslint-disable-next-line @typescript-eslint/typedef
    card => card.users
  )
  cards: Card[];

  @OneToMany(
    () => Set,
    // eslint-disable-next-line @typescript-eslint/typedef
    set => set.user
  )
  sets: Set[];
}
