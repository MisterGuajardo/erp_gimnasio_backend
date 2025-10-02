import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMemberDto {
    @ApiProperty({ required: false, example: 'Peter' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    firstName?: string;

    @ApiProperty({ required: false, example: 'Parker' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    lastName?: string;
}