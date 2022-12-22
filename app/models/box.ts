import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../models/user';

@Entity({ name: 'Box' })
export class Box {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    // eslint-disable-next-line @typescript-eslint/typedef
    user => user.boxes,
    {
      cascade: true
    }
  )
  user: User;
}
