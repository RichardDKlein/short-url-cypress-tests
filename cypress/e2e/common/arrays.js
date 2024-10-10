/// <reference types="cypress" />

/**
 * Determine whether two arrays of objects are equal, i.e. whether they
 * contain the same objects, although not necessarily in the same order.
 *
 * @param {[object]} arr1 - One of the arrays.
 * @param {[object]} arr2 - The other array.
 * @returns {boolean} - `true` if `arr1` and `arr2` are equal, `false`
 * otherwise.
 */
export function areObjectArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = [...arr1].sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );
  const sortedArr2 = [...arr2].sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );

  for (let i = 0; i < sortedArr1.length; i++) {
    if (JSON.stringify(sortedArr1[i]) !== JSON.stringify(sortedArr2[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Subtract two arrays of objects, i.e. return an array that contains
 * all the objects in the first array that are NOT in the second array.
 * @param {[object]} arr1 - The first array.
 * @param {[object]} arr2 - The second array.
 * @returns {[object]} - The array arr1 - arr2.
 */
export function subtractObjectArrays(arr1, arr2) {
  return arr1.filter(
    (obj1) =>
      !arr2.some((obj2) => JSON.stringify(obj1) === JSON.stringify(obj2))
  );
}
