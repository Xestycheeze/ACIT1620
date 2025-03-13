let numbers = new Array(1,2,3,4,5); // [1,2,3,4,5]

let values = new Array(5); // An empty array allocated with 5 slots.

let arr = Array.of(5); // [5]

let arr1 = [1,2,3];
arr.push(4); // [1,2,3,4]
arr.pop(); // [1,2,3]
arr.unshift(0); // [0,1,2,3]
arr.shift(); // [1,2,3]
console.log(arr.indexOf(3)); // 2
console.log(arr.indexOf(7)); // -1, because index not found
console.log(arr.lastIndexOf(2)); // 1, searches thru the arr backwards
console.log(arr.includes(1)); // true, because value `1` exists
console.log(arr.includes(8)); // false, becuz value `8` not found
console.log(arr.splice(2,0,10,20)); // [1,2,10,20,3]

let sliced = arr.slice(1,4); // [2,10,20]; last value is exclusive

let arr2 = [1,2,3];
let arr3 = [4,5,6];
let combined = arr2.concat(arr3); // [1,2,3,4,5,6]

let words = ["hello", "world"];
console.log(words.join(" ")); // "hello world"

let sentence = "JS is fun";
let wordsArr = sentence.split(" "); // ["JS", "is", "fun"]

// arrow function
let substract = (a,b) => {
    let dif = a - b
    console.log(`${dif}`);
    return dif;
}

// anon fxn
const square = x => x * x;

// Interacting with the DOM
let access = document.getElementById("code9"); // get the HTML segment where id="code9"
let code = access.innerHTML; // get the contend inside the tag
