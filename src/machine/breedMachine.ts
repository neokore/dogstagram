import { assign, Machine, StateNodeConfig } from 'xstate';
import { Breed, getBreedList, getBreedPhotoList } from 'api/dogApi';

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
  breedPhotoList: string[]
}

export enum BreedEventType {
  select = 'SELECT',
  retry = 'RETRY'
}

export type BreedEvent =
  | { type: BreedEventType.select; name: string }
  | { type: BreedEventType.retry };

const fetchBreedListState: StateNodeConfig<BreedContext, BreedListStateSchema, BreedEvent> = {
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
        RETRY: 'loading'
      }
    }
  }
};

const fetchBreedPhotoListState: StateNodeConfig<BreedContext, BreedListStateSchema, BreedEvent> = {
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
          target: 'failure'
        }
      }
    },
    loaded: {
      type: 'final'
    },
    failure: {
      /* TODO: Send failure messages to UserMessageMachine
       * Use custom action when calling useMachine among entry
       * Use observer
       * Use effect and subscribe
       * ...or...
       * Create RootMachine
       *
       * https://xstate.js.org/docs/packages/xstate-react/#usemachine-machine-options
       */
      on: {
        RETRY: 'loading'
      }
    }
  }
};

export const breedMachine = Machine<BreedContext, BreedStateSchema, BreedEvent>(
  {
    id: 'breeds',
    initial: 'idle',
    context: {
      breedList: [],
      selectedBreed: null,
      breedPhotoList: []
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
      [BreedEventType.select]: {
        target: 'selected',
        actions: assign((context, event) => {
          return {
            ...context,
            selectedBreed: event.name,
            breedPhotoList: []
          };
        })
      }
    }
  },
  {
    actions: {
      catchMe: () => {
        throw new Error('catch me if you can xD')
      }
    },
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