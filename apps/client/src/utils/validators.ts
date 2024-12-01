import { objectArray } from "../type/container";


export function doesContainEmptyArray(container: objectArray[]):boolean {
  if(container.length == 0){
    return true;
  }
  let containsEmptyArray = false;
  container.forEach( element => {
    if (element.length == 0){
      containsEmptyArray = true;
    } 
  })
  return containsEmptyArray;
}