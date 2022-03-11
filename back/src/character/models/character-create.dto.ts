import { IsNotEmpty } from 'class-validator';

export class CharacterCreateDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  attaque: number;
  @IsNotEmpty()
  pv: number;
  @IsNotEmpty()
  image: string;
}
