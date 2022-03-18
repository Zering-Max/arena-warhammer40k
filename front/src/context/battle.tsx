import React, { createContext, useReducer } from "react";
import {
  ArenaProviderProps,
  BattleState,
  Character,
} from "../interfaces/index";

const initialState: BattleState = {
  charactersInBattle: [],
};

type Action = {
  type: "SET_CHARACTERS_INBATTLE";
  payload: Character[];
};

const SET_CHARACTERS_INBATTLE = "SET_CHARACTERS_INBATTLE";

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CHARACTERS_INBATTLE:
      return {
        ...state,
        charactersInBattle: action.payload,
      };

    default:
      return state;
  }
};

export const BattleContext = createContext<{
  state: BattleState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function BattleProvider({ children }: ArenaProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
}
