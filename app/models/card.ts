import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user';

@Entity({ name: 'Card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false
  })
  cardId: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false
  })
  dbfId: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  cardSet: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  type: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  faction: string;

  @Column({
    type: 'integer',
    nullable: false
  })
  cost: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  text: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  playerClass: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  locale: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
