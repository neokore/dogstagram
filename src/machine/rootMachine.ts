import { Interpreter } from 'xstate';
import { createRootMachine, RootMachineSchema } from './utils';
import { UserMessageEventType, userMessageMachine, UserMessageMachineRefType } from 'machine/userMessageMachine';
import { BreedEventType, breedMachine, BreedMachineRefType } from 'machine/breedMachine';

export interface RootMachineContext {
  userMessageRef: UserMessageMachineRefType,
  breedsRef: BreedMachineRefType
};

export type RootMachineEventType = UserMessageEventType | BreedEventType;
export type RootMachineInterpreter = Interpreter<RootMachineContext, RootMachineSchema, RootMachineEventType>;

export const rootMachine = createRootMachine<RootMachineContext, RootMachineEventType>({
  userMessage: userMessageMachine,
  breeds: breedMachine
});
