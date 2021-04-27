import { assign, Machine } from "xstate";

export interface UserMessageMachineSchema {
  states: {
    hidden: {};
    shown: {};
  }
};

export enum UserMessageEvent {
  SHOW = 'SHOW',
  CLEAR = 'CLEAR'
};

export type UserMessageEventType =
  | { type: UserMessageEvent.CLEAR }
  | { type: UserMessageEvent.SHOW; severity: UserMessageSeverity; message: string }

export enum UserMessageSeverity {
  INFO = 'info',
  ERROR = 'error'
};

export interface UserMessageContext {
  message?: string;
  severity?: UserMessageSeverity;
};

export const userMessageMachine = Machine<UserMessageContext, UserMessageMachineSchema, UserMessageEventType>(
  {
    id: 'userMessage',
    initial: 'hidden',
    context: {
      message: undefined,
      severity: undefined
    },
    states: {
      hidden: {
        entry: 'clearMessages',
        on: {
          [UserMessageEvent.SHOW]: 'shown'
        }
      },
      shown: {
        entry: 'showMessage',
        on: {
          [UserMessageEvent.CLEAR]: 'hidden'
        },
        after: {
          2000: { target: 'hidden', cond: 'isAutoClose' },
        },
      }
    }
  },
  {
    actions: {
      clearMessages: assign((context) => ({
        severity: undefined,
        message: undefined
      })),
      showMessage: assign((context, event: any) => ({
        severity: event.severity,
        message: event.message
      }))
    },
    guards: {
      isAutoClose: (context) => context.severity !== UserMessageSeverity.ERROR,
    }
  }
);