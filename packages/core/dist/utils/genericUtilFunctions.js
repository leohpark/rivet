export function isNotNull(value) {
    return value != null;
}
/**
 * Checks that the given tuple is exhaustive, ie. it represents all possible values in the union T.
 * Note that this function returns a function, so the function needs to be called like
 * `SpecificStrings.exhaustiveTuple<Furniture>()('v1', 'v2', ...)`.
 * If you miss a value, the type error will tell you which value you missed.
 *
 * Taken from https://stackoverflow.com/a/55266531/
 *
 * @example
 *   type Furniture = 'chair' | 'table' | 'lamp' | 'ottoman';
 *   const furniture = SpecificStrings.exhaustiveTuple<Furniture>()('chair', 'table', 'lamp', 'ottoman');
 *
 *   // error, argument of type '"chair"' is not assignable to parameter of type '"You are missing ottoman"'.
 *   const missingFurniture = SpecificStrings.exhaustiveTuple<Furniture>()('chair', 'table', 'lamp');
 */
export const exhaustiveTuple = () => 
// impressive inference from TS: it knows when the condition and the true branch can't both be satisfied
(...x) => x;
/**
 * See exhaustiveTuple above. Does the same thing except returns a Set, not an array.
 */
export const exhaustiveSet = () => (...x) => new Set(x);
