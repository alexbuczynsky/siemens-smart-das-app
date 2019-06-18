import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { createAction, FSActionNoPayload, FSAWithPayload } from './actionCreator';

interface BasicKeyValuePair { [index: string]: any; }

export type ActionMap<M extends BasicKeyValuePair> = {
  [Type in keyof M]: M[Type] extends undefined
  ? {
    type: Type;
  }
  : {
    type: Type;
    payload: M[Type];
  }
};

export function createMsg<Messages extends BasicKeyValuePair>() {

  function messageComposer<Type extends keyof Messages & string>(type: Type): FSActionNoPayload<Type>;
  function messageComposer<Type extends keyof Messages & string>(type: Type, payload: Messages[Type]): FSAWithPayload<Type, Messages[Type]>;
  function messageComposer<Type extends keyof Messages & string>(type: Type, payload?: Messages[Type]) {
    if (payload) {
      return createAction(type, payload);
    }
    return createAction(type);
  }
  return messageComposer;
}

export type ActionMapActions<M extends BasicKeyValuePair> = ActionMap<M>[keyof ActionMap<M>];

export type AsyncAction = ThunkAction<any, any, any, AnyAction>;
