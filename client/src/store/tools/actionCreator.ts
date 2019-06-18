// -------------------------------------------------------------------------
// Flux Standard Action Pattern (FSA)
// - We will use FSA as our response pattern
// - The message style is a simple type and payalod response
// - learn more here: https://github.com/redux-utilities/flux-standard-action
// -------------------------------------------------------------------------

/**
 * Action implementing FSA Pattern
 *
 * Flux Standard Action Pattern (FSA)
 *
 * @export
 * @interface FSA
 * @alias FluxStandardAction
 * @template TAction
 */
export interface FSAction<Type extends string, Payload = undefined, Meta = undefined> {
  /**
   * The `type` of an action identifies to the consumer the nature of the action that has occurred.
   * Two actions with the same `type` MUST be strictly equivalent (using `===`)
   */
  type: Type;
  /**
   * The optional `payload` property MAY be any type of value.
   * It represents the payload of the action.
   * Any information about the action that is not the type or status of the action should be part of the `payload` field.
   * By convention, if `error` is `true`, the `payload` SHOULD be an error object.
   * This is akin to rejecting a promise with an error object.
   */
  payload?: Payload;
  /**
   * The optional `error` property MAY be set to true if the action represents an error.
   * An action whose `error` is true is analogous to a rejected Promise.
   * By convention, the `payload` SHOULD be an error object.
   * If `error` has any other value besides `true`, including `undefined`, the action MUST NOT be interpreted as an error.
   */
  error?: boolean;
  /**
   * The optional `meta` property MAY be any type of value.
   * It is intended for any extra information that is not part of the payload.
   */
  meta?: Meta;
}

/**
 * Flux Standard Action with no payload or meta
 *
 * @export
 * @interface FSActionNoPayload
 * @extends {FSAction<Type, undefined, undefined>}
 * @template Type
 */
export interface FSActionNoPayload<Type extends string> extends FSAction<Type, undefined, undefined> {
}

/**
 * An extension of the Flux Standard action that represents an action containing an error as its payload.
 *
 * @export
 * @interface FSActionError
 * @extends {FSAction<Type, CustomError, Meta>}
 * @template Type
 * @template CustomError
 * @template Meta
 */
export interface FSActionError<Type extends string, CustomError extends Error = Error, Meta = undefined> extends FSAction<Type, CustomError, Meta> {
  /**
   * The required `error` property MUST be set to `true` if the action represents an error.
   */
  error: true;
}

/**
 * Flux Standard Action with Payload
 *
 * @export
 * @interface FSActionWithPayload
 * @extends {FSAction<TAction>}
 * @template TAction
 * @template TPayload
 */
export interface FSAWithPayload<Type extends string, Payload> extends FSAction<Type, Payload, undefined> {
  payload: Payload;
}

// export interface FSActionWithError

// type CreateAction<T extends string, P, M> = (type: T, payload?: P, meta?: M) => FSAction<T, P, M>

export function createAction<T extends string>(type: T): FSActionNoPayload<T>;
export function createAction<T extends string, P>(type: T, payload: P): FSAWithPayload<T, P>;
export function createAction<T extends string, P, M>(type: T, payload: P, meta?: M): FSAction<T, P, M>;
export function createAction<T extends string, P, M>(type: T, payload?: P, meta?: M) {
  return {
    type,
    payload,
    meta,
  };
}
