import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateRolesPermissionsDto {
    @IsArray()
    @IsOptional()
    roles?: string[];

    @IsArray()
    @IsOptional()
    permissions?: string[];
}