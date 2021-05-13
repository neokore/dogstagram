import { Machine, assign, send, spawn,  StateMachine, MachineConfig, EventObject, DefaultContext, TransitionConfig } from 'xstate';

export interface RootMachineSchema {
  states: {
    initial: {}
  }
}

export interface ChildMachinesDefinition {
  [key: string]: StateMachine<any, any, any> // Yes, any is needed here so far to allow any StateMachine configuration
}

export const createRootMachine = <TContext extends DefaultContext, TEvent extends EventObject>(children: ChildMachinesDefinition) => {
  const spawnMachinesDefinition = Object.keys(children).reduce((acum: any, currentKey) => {
    acum[`${currentKey}Ref`] = () => spawn(children[currentKey], currentKey);
    return acum;
  }, {});
  const routeToChildMachineTransition: TransitionConfig<TContext, TEvent> = {
    actions: send(
      (_, event) => event,
      { to: (_, event) => event.type.split('/')[0] }
    ),
  };
  const rootMachineDefinition: MachineConfig<TContext, RootMachineSchema, TEvent> = {
    id: 'root',
    initial: 'initial',
    entry: assign(spawnMachinesDefinition),
    states: {
      initial: {
        on: {
          '*': routeToChildMachineTransition,
        }
      }
    }
  };
  return Machine<TContext, RootMachineSchema, TEvent>(rootMachineDefinition);
}