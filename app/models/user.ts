import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
