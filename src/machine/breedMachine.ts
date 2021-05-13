import { ActorRef, assign, Machine, sendParent, StateNodeConfig } from 'xstate';
import { Breed, getBreedList, getBreedPhotoList } from 'api/dogApi';
import { UserMessageEvent, UserMessageSeverity } from './userMessageMachine';

export interface BreedStateSchema {
  states: {
    idle: BreedListStateSchema;
    selected: BreedListStateSchema;
  };
}

interface BreedListStateSchema {
  states: {
    loading: {};
    loaded: {};
    failure: {};
  }
}

export interface BreedContext {
  breedList: Breed[], // {id: "breed/subbreed", name: "breed (subbreed)"}
  selectedBreed?: string | null, // id from breedList
  breedPhotoList: string[],
  errorMsg?: string | null
}

export enum BreedEvent {
  SELECT = 'breeds/select',
  RETRY = 'breeds/retry'
}

export type BreedEventType =
  | { type: BreedEvent.SELECT; name: string }
  | { type: BreedEvent.RETRY };

export type BreedMachineRefType = ActorRef<BreedEventType>;

const fetchBreedListState: StateNodeConfig<BreedContext, BreedListStateSchema, BreedEventType> = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'fetch-breeds',
        src: 'getBreedList',
        onDone: {
          target: 'loaded',
          actions: assign({
            breedList: (_, event) => event.data
          })
        },
        onError: {
          target: 'failure'
        }
      }
    },
    loaded: {
      type: 'final'
    },
    failure: {
      on: {
        [BreedEvent.RETRY]: 'loading'
      }
    }
  }
};

const fetchBreedPhotoListState: StateNodeConfig<BreedContext, BreedListStateSchema, BreedEventType> = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'fetch-breed-photo-list',
        src: 'getBreedPhotoList',
        onDone: {
          target: 'loaded',
          actions: assign({
            breedPhotoList: (_, event) => event.data
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            errorMsg: (_, event) => event.data.message
          })
        }
      }
    },
    loaded: {
      type: 'final'
    },
    failure: {
      /* Send failure messages to UserMessageMachine
       * Options: 
       *   - [ ] Use custom action when calling useMachine among entry
       *   - [ ] Use observer
       *   - [ ] Use effect and subscribe
       *   - [x] Create RootMachine and route calls
       *
       * https://xstate.js.org/docs/packages/xstate-react/#usemachine-machine-options
       */
      entry: sendParent(
        (context) => ({
          type: UserMessageEvent.SHOW,
          severity: UserMessageSeverity.ERROR,
          message: context.errorMsg
        })
      ),
      on: {
        [BreedEvent.RETRY]: 'loading'
      }
    }
  }
};

export const breedMachine = Machine<BreedContext, BreedStateSchema, BreedEventType>(
  {
    id: 'breeds',
    initial: 'idle',
    context: {
      breedList: [],
      selectedBreed: null,
      breedPhotoList: [],
      errorMsg: null
    },
    states: {
      idle: {
        ...fetchBreedListState
      },
      selected: {
        ...fetchBreedPhotoListState
      }
    },
    on: {
      [BreedEvent.SELECT]: {
        target: 'selected',
        actions: assign((_, event) => {
          return {
            selectedBreed: event.name,
            breedPhotoList: []
          };
        })
      }
    }
  },
  {
    services: {
      getBreedList: () => getBreedList(),
      getBreedPhotoList: (context) => {
        if (!context.selectedBreed) {
          throw new Error('Breed not selected');
        }
        return getBreedPhotoList(context.selectedBreed);
      }
    }
  },
);