import { IsString, IsEnum } from 'class-validator';
import { StatutCon, TypeCon } from 'src/schemas/conge.schema';


export class CreateCongeDto {
  @IsString()
  nom: string;

  @IsEnum(StatutCon) // Use the @IsEnum decorator with your enum class
  statutCon: StatutCon;

  @IsEnum(TypeCon) // Use the @IsEnum decorator with your enum class
  typeCon: TypeCon;

  // ... other properties
}