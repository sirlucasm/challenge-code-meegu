import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsPostalCode,
  Length,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @Length(2, 100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty()
  @IsPostalCode('BR')
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  acceptedTerms: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;
}

export class UpdateUserDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Length(2, 100)
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPostalCode('BR')
  zipcode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  acceptedTerms?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
