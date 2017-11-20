import { Actions as CounterActions } from "./actioncreators";

export type RootAction = 
   | CounterActions[keyof CounterActions];
