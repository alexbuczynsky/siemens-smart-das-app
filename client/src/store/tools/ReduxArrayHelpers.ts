
/**
 * Remove item from array
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {*} value
 * @param {keyof T} key
 * @returns
 */
export function RemoveItem<T extends any>(array: T[], value: any, key: keyof T, ) {
  array = array.filter(x => x[key] !== value);
  return array;
}

/**
 * Updates item in array
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {Partial<T>} newProps
 * @param {keyof T} key
 * @returns
 */
export function UpdateItem<T extends any>(array: T[], newProps: Partial<T>, key: keyof T) {
  array = array.map((item) => {
    if (item[key] !== newProps[key]) {
      return item;
    }

    return {
      ...item,
      ...newProps,
    };
  });
  return array;
}

/**
 * Add item to array
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {T} newProps
 * @returns
 */
export function CreateItem<T extends any>(array: T[], newProps: T) {
  const newArray = array.slice();
  array = newArray.splice(-1, 0, newProps);
  return newArray;
}
