export function validateEmpty(arg: any, position: number = 1): void {
  if (arg == null) {
    throw new Error(`Argument ${position} is empty`);
  }
}

export function validateActionType(arg: any, position: number = 1): void {
  validateEmpty(arg, position);
  if (typeof arg !== 'string' && typeof arg !== 'symbol') {
    throw new Error(
      `Argument ${position} is invalid, it should be of type: string | symbol`
    );
  }
}

export function validateActionCreator(arg: any, position: number = 1): void {
  validateEmpty(arg, position);
  if (arg.getType == null) {
    throw new Error(
      `Argument ${position} is invalid, it should be an action-creator from "typesafe-actions"`
    );
  }
}

export function validateActionTypeInArray(arg: any, idx: number): void {
  if (arg == null) {
    throw new Error(
      `Argument contains array with empty element at index ${idx}`
    );
  } else if (typeof arg !== 'string' && typeof arg !== 'symbol') {
    throw new Error(
      `Argument contains array with invalid element at index ${idx}, it should be of type: string | symbol`
    );
  }
}

export function validateActionCreatorInArray(arg: any, idx: number): void {
  if (arg == null) {
    throw new Error(
      `Argument contains array with empty element at index ${idx}`
    );
  } else if (arg.getType == null) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      `Argument contains array with invalid element at index ${idx}, it should be an action-creator from "typesafe-actions"`
    );
  }
}
