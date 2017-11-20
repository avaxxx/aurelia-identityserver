import { Actions as CounterActions } from "./counter/actions";

export type RootAction = 
   | CounterActions[keyof CounterActions];
