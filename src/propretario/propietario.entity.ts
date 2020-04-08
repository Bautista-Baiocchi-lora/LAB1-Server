import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Propietario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  doc_id: string;

  @Column()
  doc_type: number;

  @Column()
  creation_date: string;
}