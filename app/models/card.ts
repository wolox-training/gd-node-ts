import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../models/user';
@Entity({ name: 'Card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  cardId: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  dbfId: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  cardSet: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  type: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  faction: string;

  @Column({
    type: 'integer',
    nullable: true
  })
  cost: number;

  @Column({
    type: 'varchar',
    nullable: true
  })
  attack: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  health: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  durability: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  rarity: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  text: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  flavor: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  artist: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  race: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  collectible: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  playerClass: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  img: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  locale: string;

  @ManyToMany(
    () => User,
    // eslint-disable-next-line @typescript-eslint/typedef
    user => user.cards,
    {
      cascade: true
    }
  )
  @JoinTable()
  users: User[];
}
