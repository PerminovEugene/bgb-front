import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole, UserStatus } from './users.interfaces';
import { IsEmail } from 'class-validator';
import { BasicEntity } from '../core/interfaces/entity';

@Entity()
export class Users implements BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, unique: true })
  @IsEmail()
  email: string;

  @Column('text')
  password: string;

  @Column()
  salt: string;

  @Column('text')
  role: UserRole;

  @Column('text')
  status: UserStatus;
}
