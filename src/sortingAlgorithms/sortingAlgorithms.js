export function getQuickSortAnimations(arr) {

  const animations = [];

  if(arr.length <= 1)
      return animations;

  /// deep copy the array without copying the color field
  const aux = new Array(arr.length);
  for(let i = 0;i < arr.length;++i)
      aux[i] = arr[i].height;

  quickSort(aux, 0, aux.length - 1, animations);
  return animations;
}

function quickSort(arr, left, right, animations) {
  if(left < right) {
      const index = partition(arr, left, right, animations);
      quickSort(arr, left, index - 1, animations);
      quickSort(arr, index + 1, right, animations);
  }
}

function partition(arr, left, right, animations) {

  /// 'color' means we change the color of the two indexes in the main array
  /// 'revert' means we revert the color change
  /// 'swap' means we swap the two indexes in the main array

  let index = left;
  const pivot = arr[right];

  for(let i = left; i < right;++i) {
      animations.push([index, i, 'color']);
      animations.push([index, i,'revert']);

      if(arr[i] <= pivot) {
          animations.push([index, i, 'swap']);
          [arr[index], arr[i]] = [arr[i], arr[index]];
          index++;
      }
  }

  animations.push([index, right, 'color']);
  animations.push([index, right, 'revert']);
  animations.push([index, right, 'swap']);

  [arr[index], arr[right]] = [arr[right], arr[index]];
  return index;
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }




export function getBubbleSortAnimations(array) {
    const animations = [];
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([j, j + 1]);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                // We overwrite the value at index j in the original array with the
                // value at index j + 1 in the original array.
                animations.push([j, array[j + 1]]);
                // We overwrite the value at index j + 1 in the original array with the
                // value at index j in the original array.
                animations.push([j + 1, array[j]]);
                // Swap elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return animations;
}

export function getInsertionSortAnimations(arr) {

  const animations = [];

  if(arr.length <= 1)
      return animations;

  /// deep copy the arr array into a new array
  const aux = new Array(arr.length);
  for(let i = 0;i < arr.length;++i)
      aux[i] = arr[i].height;

  insertionSort(aux, animations);
  return animations;
}

function insertionSort(arr, animations) {

  /// 'color' means color change in the animation
  /// 'revert' means change the color back to its initial state
  /// 'take' arr[hole] takes the value of arr[hole - 1]

  for(let i = 1;i < arr.length;++i) {

      const val = arr[i];
      let hole = i;

      while(hole > 0 && arr[hole - 1] > val) {

          animations.push([hole, hole - 1, 'color']);
          animations.push([hole, hole - 1, 'revert']);
          animations.push([hole, arr[hole - 1], 'take']);

          arr[hole] = arr[hole - 1];
          hole--;
      }

      animations.push([hole, i, 'color']);
      animations.push([hole, i, 'revert']);
      animations.push([hole, val, 'take']);

      arr[hole] = val;
  }
}