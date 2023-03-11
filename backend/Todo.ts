import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
