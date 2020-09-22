import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

export default User;
