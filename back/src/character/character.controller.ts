import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './models/character.entity';
import { CharacterCreateDto } from './models/character-create.dto';

@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  async allCharacters(): Promise<Character[]> {
    return this.characterService.getAllCharacters();
  }

  @Get(':id')
  async character(@Param('id') id: number): Promise<Character> {
    return this.characterService.getCharacter(id);
  }

  @Post()
  async create(@Body() body: CharacterCreateDto): Promise<Character> {
    return this.characterService.createCharacter(body);
  }

  @Post('mass')
  async createMass(@Body() body: CharacterCreateDto[]): Promise<Character[]> {
    return this.characterService.createMassCharacters(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    let response = await this.characterService.deleteCharacter(id);

    if (response.affected !== 1) {
      throw new BadRequestException(`this ID: ${id} to delete is not valid`);
    }
  }
}
