import { TypeMeta } from './types';
import {
  validateEmpty,
  validateActionCreatorInArray,
} from './utils/validation';

export type AC<T extends { type: string }> = ((...args: any[]) => T) &
  TypeMeta<T['type']>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @inner If you need more than 5 arguments -> use switch
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreators: [AC<T1>],
  action: { type: string }
): action is [T1][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A
>(
  actionCreators: [AC<T1>, AC<T2>],
  action: { type: string }
): action is [T1, T2][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>],
  action: { type: string }
): action is [T1, T2, T3][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>],
  action: { type: string }
): action is [T1, T2, T3, T4][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>],
  action: { type: string }
): action is [T1, T2, T3, T4, T5][number];

export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreator: AC<T1>,
  action: { type: string }
): action is T1;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @inner If you need more than 5 arguments -> use switch case instead of filter
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreators: [AC<T1>]
): (action: A) => action is [T1][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A
>(actionCreators: [AC<T1>, AC<T2>]): (action: A) => action is [T1, T2][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>]
): (action: A) => action is [T1, T2, T3][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>]
): (action: A) => action is [T1, T2, T3, T4][number];

export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>]
): (action: A) => action is [T1, T2, T3, T4, T5][number];

export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreator: AC<T1>
): (action: A) => action is T1;

/** implementation */
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  actionCreatorOrCreators:
    | AC<T1>
    | [AC<T1>]
    | [AC<T1>, AC<T2>]
    | [AC<T1>, AC<T2>, AC<T3>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>],
  action?: A
) {
  validateEmpty(actionCreatorOrCreators);

  const actionCreators = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];

  actionCreators.forEach(validateActionCreatorInArray);

  const assertFn = (_action: A) =>
    actionCreators.some(
      actionCreator => _action.type === actionCreator.getType!()
    );

  // 1 arg case => return curried version
  if (action === undefined) {
    return assertFn;
  }
  // 2 args case => invoke assertFn and return the result
  return assertFn(action);
}
