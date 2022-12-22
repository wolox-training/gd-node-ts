import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../models/user';
import { Card } from '../models/card';

@Entity({ name: 'Set' })
export class Set {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true
  })
  name: string;

  @ManyToOne(
    () => User,
    // eslint-disable-next-line @typescript-eslint/typedef
    user => user.sets,
    {
      cascade: true
    }
  )
  user: User;

  @OneToMany(
    () => Card,
    // eslint-disable-next-line @typescript-eslint/typedef
    card => card.set
  )
  cards: Card[];
}
