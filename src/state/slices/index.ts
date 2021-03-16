import { ActionType } from "typesafe-actions";
import * as breedActions from './breedSlice';
import * as userMessageActions from './userMessageSlice';

const actions = {
  ...breedActions,
  ...userMessageActions
}

export type ActionsType = ActionType<typeof actions>;

export default actions;