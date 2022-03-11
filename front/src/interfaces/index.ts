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
