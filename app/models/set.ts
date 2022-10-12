import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../models/user';
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
}
