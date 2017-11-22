import { Actions as CounterActions } from "./counter/actions";
import { Actions as TodosActions } from "./todo/actions";
import { Actions as UserActions } from "./user/actions";
export type RootAction = 
   | CounterActions[keyof CounterActions]
   | TodosActions[keyof TodosActions]
   | UserActions[keyof UserActions];
