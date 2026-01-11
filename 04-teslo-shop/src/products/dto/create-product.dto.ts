import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product title',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'This is a Teslo T-Shirt',
    description: 'Product description',
    default: null,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product slug for SEO',
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Available sizes',
  })
  @IsString({ each: true })
  @IsArray()
  sizes?: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    example: ['casual', 'summer', 'new'],
    description: 'Product tags',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: [
      'https://example.com/images/product1.jpg',
      'https://example.com/images/product2.jpg',
    ],
    description: 'Product images',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
