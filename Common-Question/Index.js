/*Reverse the String*/

const str = "Greetings from Earth"
//const str = "Hello"
const reverse = str.split("").reverse().join("");
//Output : htraE morf sgniteerG
//For Hello inout Output : olleH


/*Remove Extra spaces from the string*/

let text = "       Hello World!        ";
let result = text.trim();

/*How do i fetch first two values from array using destructing*/

let x, y, z, k, l;
const arr = [9, 10, 11];
[x] = [...arr]; // 9
[x, y] = [...arr]; //[9, 10]
[x, y, z] = [...arr]; // [9, 10, 11]
[x, y, z, k] = [...arr]; // [9, 10, 11, undefined]
[x, y, z, ...l] = [...arr];// [9, 10, 11]

/*What are rest parameter*/

//Rest paramter syntax allows function to accept indefinite number of arguments as array
function sum(...arr){
    return 
    }
    
    sum(1,2,3);

/*What are spread operator*/

//Combine two arrays using spread operator

var arr = [1, 2, 3];
var arr1 = [4, 5, 6];
var arr2 = [...arr, ...arr1];
console.log(arr2);

//Remove duplicate values from array

var arr = [20,828,22,11,233,11,233];
const unique = arr.filter(function(value, index, array){
console.log("Remove duplicate value:")
console.log(array.indexOf(value) == index);
return array.indexOf(value) == index;
})
console.log(`Unique ${unique}`);

//What is virtual DOM?

Virtual DOM: React keeps a lightweight representation of the real DOM in the memory, and that is known as the virtual DOM. When the state of an object changes, virtual DOM changes only that object in the real DOM, rather than updating all the objects.

//What are fragments in react?

/*A common pattern in React is for a component to return multiple elements. 
Fragments let you group a list of children without adding extra nodes to the DOM.*/

render() {
    return (
      <React.Fragment>
        <ChildA />
        <ChildB />
        <ChildC />
      </React.Fragment>
    );
  }

  /*What are the different types of hooks in react*/

  //Implementation of useeffect hook

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("second on update");
    return () => {
      console.log("first on update");
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//Hover function in jquery

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

$(document).ready(function(){
  $("p").hover(function(){
    $(this).css("background-color", "yellow");
    }, function(){
    $(this).css("background-color", "pink");
  });
});


  
