import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: 'b3a1c4e8-5f6d-4c2a-9f1e-2d3c4b5a6d7e',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'User email',
    description: 'User email address',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'User password',
    description: 'User password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'User full name',
    description: 'User full name',
  })
  @Column('text')
  fullName: string;

  @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  normalizeFields() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  normalizeUpdateFields() {
    this.normalizeFields();
  }
}
