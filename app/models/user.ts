import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Card } from '../models/card';
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
    (card: Card) => card.users
  )
  cards: Card[];
}
