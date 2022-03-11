import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './models/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async getAllCharacters(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  async getCharacter(id: number): Promise<Character> {
    return this.characterRepository.findOne({ id });
  }

  async createCharacter(data): Promise<Character> {
    return this.characterRepository.save(data);
  }

  async createMassCharacters(data): Promise<Character[]> {
    return this.characterRepository.save(data);
  }

  async deleteCharacter(id: number): Promise<any> {
    return this.characterRepository.delete(id);
  }
}
