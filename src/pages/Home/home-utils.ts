import { SET_SIZE } from './constants';

export function getNumberOfSets(count: number): number {
  return count > 0 ? count / SET_SIZE : 0;
}

export function formSets(noOfSets: number): number[] {
  return Array.from(Array(noOfSets).keys());
}
