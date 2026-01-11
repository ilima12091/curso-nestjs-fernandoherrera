import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Number of items to return',
    default: 10,
    example: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Number of items to skip',
    default: 0,
    example: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
