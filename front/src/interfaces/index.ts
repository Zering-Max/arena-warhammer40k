import React from "react";
export interface IAppState {
  selectedToFight: Character[];
  characters: Character[];
}

export interface BattleState {
  charactersInBattle: Character[];
}

export interface CreateCharacter {
  name: string;
  image: string;
  pv: number;
  attaque: number;
}

export interface ArenaProviderProps {
  children: React.ReactNode;
}
export interface Character {
  id: number;
  name: string;
  pv: number;
  attaque: number;
  image: string;
}

export interface logObject {
  id: number;
  log: string;
}

export type BloodBoxProps = {
  medium?: boolean;
  large?: boolean;
};

export type BlueBoxProps = {
  alignItems?: boolean;
  spaceBetween?: boolean;
  width?: number;
};

export type FlexBoxProps = {
  height?: number;
};
