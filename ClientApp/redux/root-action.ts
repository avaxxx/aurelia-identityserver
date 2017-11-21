import { Actions as CounterActions } from "./counter/actions";
import { Actions as TodosActions } from "./todo/actions";

export type RootAction = 
   | CounterActions[keyof CounterActions]
   | TodosActions[keyof TodosActions];
