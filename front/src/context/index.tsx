import React, { createContext, useReducer } from "react";
import { IAppState, ArenaProviderProps } from "../interfaces/index";

const initialState: IAppState = {
  selectedToFight: [],
  characters: [],
};

type Action = {
  type: string;
  payload: any;
};

const SET_SELECTEDTOFIGHT = "SET_SELECTEDTOFIGHT";
const SET_CHARACTERS = "SET_CHARACTERS";

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_SELECTEDTOFIGHT:
      return {
        ...state,
        selectedToFight: action.payload,
      };
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    default:
      return state;
  }
};

export const ArenaContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function ArenaProvider({ children }: ArenaProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ArenaContext.Provider value={{ state, dispatch }}>
      {children}
    </ArenaContext.Provider>
  );
}
