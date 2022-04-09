
**QUESTIONS**

<a href="#closure">What are closure?</a>

<a href="#variable">var, let and const</a>

<a href="#equalto">double equalto vs tripple equalto </a>

<a href="#hoisting">Hoisting</a>

<a href="#destructuring">Destructuring</a>

<a href="#diff">Difference between arrow function and normal function</a>

<a href="#es6">ES6 features</a>

<a href="#prototype">Prototype and Inheritance</a>

<a href="#reference">Call by reference and call by value</a>

<a href="#cab">call, apply and bind</a>

<a href="#iif">Immediate Invoked Function Expression</a>

<a href="#implicitcoercion">Implicit coercion</a>

<a href="#nullundefined">Null vs. Undefined</a>

<a href="#delegation">Event delegation</a>

<a href="#this">this keyword</a>

<a href="#throttling">Throttling</a>

<a href="#debouncing">Debouncing</a>

<a href="#Asyncdefer">Async and defer</a>

<a href="#polyfills">Polyfills</a>

<a href="#promises">Promises</a>

<a href="#interval">setTimeout, setInterval, clearInterval</a>

<a href="#hof">Higher order function</a>

<a href="#cf">Currying function</a>

<a href="#memoization">Memoization</a>

<a href="#Callback">Call back functions</a>

<a href="#tofo">Type of operator</a>

<a href="#nan">NaN</a>

<a href="#bubble">Event bubbling and event capturing</a>

<a href="#prevent">Prevent default and stop propagation method</a>

<a href="#json">JSON - stringify, parse</a>

<a href="#string">String - different methods</a>

<a href="#sum">Summing string with number 1+2+”3”</a>

<a href="#operator">Rest parameter and spread operator</a>

<a href="#class">Javascript class</a>

<a href="#extend">Extend classes</a>

<a href="#callstack">Call stack</a>

<a href="#lazy">Lazy loading</a>

<a href="#copy">Deep copy and shallow copy</a>

<a href="#empty">How to empty array</a>

<a href="#fetch">Fetchs</a>

<a href="#object">Ways to create object in javascript </a>

<a href="#dead">Temporal Dead Zone</a>

<a href="#webworker">Web workers</a>

<a href="#performance">How to increase web performance of webpage</a>

<a href="#websecure">What you do for making website secure</a>

<a href="#seo">Seo best practises</a>

<a href="#webvitals">What is core web vitals</a>
 
</hr>

**EXPLANATION**

<p id="closure"><strong>What are closures?</strong></p>
A closure is the combination of a function and the lexical environment within which that function was declared. i.e, It is an inner function that has access to the outer or enclosing function’s variables. The closure has three scope chains

Own scope where variables defined between its curly brackets
Outer function’s variables
Global variables

Official document: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

Let's take an example of closure concept,
<pre>
function init(){
var name = "Deepesh";
function displayName(){
alert(name);
}
displayName();

}
var myfunc = init();
myfunc();
</pre>

<p id="variable"><strong>var, let and const</strong></p>

<p>users can declare a variable using 3 keywords that are var, let and const. var is oldest keyword to declare variable in javascript</p>

**var keyword**
**Scope**: **var**

**Global Scope** :variables defined outside the function can be accessed globally
<pre>
var a = 4; // Global variable
console.log(a);
</pre>

**local Scope** : variables defined inside a particular function can be accessed within the function. 
<pre>
function hello() {
  console.log(`variabel a is accesible inside function whose valie is : ${a}`);
  var b = 5;
  console.log(b);
}
hello();
//console.log(b); //b cannot be accessible outside of function
//ReferenceError: b is not defined
</pre>

**re-declare variable using var **
<pre>
var a = 10;
console.log(a);
</pre>

**user can update var variable**
<pre>
a = 7;
console.log(a);
</pre>

**use the var variable before the declaration, it initializes with the undefined value.**
<pre>
console.log(c);
var c = "Hi";
</pre>

**let keyword:**

**Scope: The scope of a let variable is only block scoped. It can’t be accessible outside the particular block ({block}**

<pre>
{
let z = 10;
}
//console.log(z);  //Uncaught ReferenceError: z is not defined"
</pre>

**Redeclaring variable is not allowed**

<pre>
let i =10;
//let i = 11; // Identifier 'i' has already been declared"
</pre>

**update is allowed**

<pre>
i = 7;
console.log(i);
</pre>

**use the let variable before the declaration gives reference error**

<pre>
//console.log(k); //  Uncaught ReferenceError: z is not defined"
let = 10;
</pre>

**const keyword**

**const has same properties as let keywords except one that user cannot update it**

<pre>
const q = 10;
//q = 11; //Uncaught TypeError: Assignment to constant variable
console.log(q);
</pre>

**Scope: block scoped: When users declare a const variable, they need to initialize it, otherwise, it returns an error.**

<pre>
const l;
//console.log(l);
</pre>

**Cannot redeclare**
<pre>
const o = 9;
//const o = 0;
</pre>

<img width="1030" alt="Screenshot 2022-04-08 at 5 59 16 PM" src="https://user-images.githubusercontent.com/32305096/162435799-70dbc240-58ce-46db-8ef8-e08a2adda622.png">


<p>You can find code here: https://jsfiddle.net/deepesh26/kfr65o48/85/</p>

<p id="equplto"><strong>double equplto vs tripple equplto</strong></p>

<p id="hoisting"><strong>Hoisting</strong></p>
<hr/>
<p id="destructuring"><strong>Destructuring</strong></p>
<hr/>
<p>
Destructing: Destructing assignment is javascript expression which allows us to unpack the values from arrays or properties from objects into distinct variables

 <pre>
let a, b, rest;
[a,b] = [1,2];
console.log(a); // 1
console.log(b); // 2
[a, b, ...rest] = [1, 2, 3, 4, 5, 6]; 
console.log([a, b, ...rest]); // [1, 2, 3, 4, 5, 6]

let x, y, z, k, l;
const arr = [9, 10, 11];
[x] = [...arr]; // 9
[x, y] = [...arr]; //[9, 10]
[x, y, z] = [...arr]; // [9, 10, 11]
[x, y, z, k] = [...arr]; // [9, 10, 11, undefined]
[x, y, z, ...l] = [...arr];// [9, 10, 11]

console.log(x); // 9
console.log(y); // 10
console.log(z); // 11
console.log(k); // undefined
console.log([x, y, z, ...l]);// [9, 10, 11]
</pre>

**Default values**
variable can be assigned a default, in the case that the value unpacked from the array is undefined.

<pre>
let o, p;
[o=5, p=2] = [1];
console.log(o); //1
console.log(p); //2
console.log([x, y, z, k=12,...l]);// [9, 10, 11, 12]
</pre>

**Swaping variables**
Two variables values can be swapped in one destructuring expression.**

<pre>
let s1= 1, s2=2;
[s1, s2] = [s2, s1];
console.log(s1);
console.log(s2);
</pre>

**Passing array returned from function**

<pre>
function f(){
return [1,2];
}
let val1, val2;
[val1, val2] = f();
console.log(val1); //1
console.log(val2); //2
</pre>

**ignoring some values**

<pre>
let val3;
function f1(){
return [1,2,3];
}
[val1, ,val3] = f1();
//console.log([val1, ,val3]); //[1, undefined, 3]
console.log(val3); // 3

//You can also ignore all returned values:
[, ,] = f1(); 
//console.log([, ,]); //[undefined, undefined]
</pre>

**Object Destructing**

<pre>
const user = {
id : "1",
name : "deepesh"
};
const {id, name} = user;
console.log(id);
console.log(name);
</pre>

</p>
<hr/>
<p id="diff"><strong>Difference between arrow function pnd normpl function</strong></p>
<hr/>
<p id="es6"><strong>ES6 feptures</strong></p>
<hr/>
<p id="prototype"><strong>Prototype pnd Inheritance</strong></p>
<hr/>
<p id="reference"><strong>Call by reference pnd call by value</strong></p>
<hr/>
<p id="cab"><strong>call, apply and bind</strong></p>
<p>

<strong>call</strong>
 
Definition of MDN docs:
 
The call() allows for a function/method belonging to one object to be assigned and called for a different object.

Function/Method defined here in object person can be used by other object with the help of call method by calling  

<pre>
object.methodname.call(object2);
person.fullName.call(person2)
</pre>

Also methods takes argument separately

<pre>
object.methodname.call(object2, argument1, argument2);
person1.test.call(" ","Hi", "Hello")
</pre>

With call we can write method in one object and inherit it in another object so there is no need to rewrite it

Example:
<pre>
const person = {
  fullName: function() {
    return this.address +" "+ this.name;
  }
}

const person1 = {
  test: function(x, y) {
    return x +" "+ y;
  }
}
const person2 = {
  address: "Austin",
  name: "Deepesh"
}

console.log(person.fullName.call(person2));//"Austin Deepesh"
console.log(person1.test.call(" ","Hi", "Hello"))//"Hi Hello"
</pre>

**Apply method takes argument as array**
<pre>
console.log(person1.test.apply(" ",["Hi", "Hello"])) // "Hi Hello"

//Example: Math.max.apply([1,2,3])
</pre>

**Bind Method**

lets create bound function which wraps original function with object

<pre>
let bound = person.fullName.bind(person2)
console.log(bound()); //"Austin Deepesh"

//lets see example with argument
let bound1 = person1.test.bind();
console.log(bound1("Bind","Example")); //"Bind Example"
</pre>

<p>JSfiddle link: https://jsfiddle.net/deepesh26/p40md76j/86/</p>

</p>

<hr/>
<p id="iif"><strong>Immediate Invoked Function Expression</strong></p>
<hr/>
<p id="implicitcoercion"><strong>Implicit coercion</strong></p>
<hr/>
<p id="nullundefined"><strong>Null vs. Undefined</strong></p>
<hr/>
<p id="delegation"><strong>Event delegation</strong></p>
<hr/>
<p id="this"><strong>this keyword</strong></p>
<hr/>
<p id="throttling"><strong>Throttling</strong></p>
<hr/>
<p id="debouncing"><strong>Debouncing</strong></p>
<hr/>
<p id="asyncdefer"><strong>async pnd defer</strong></p>
<hr/>
<p id="polyfills"><strong>Polyfills</strong></p>
<hr/>
<p id="promises"><strong>Promises</strong></p>
<hr/>
<p id="interval"><strong>setTimeout, setInterval, cleprInterval</strong></p>
<hr/>
<p id="hof"><strong>Higher order function</strong></p>
<hr/>
<p id="cf"><strong>Currying function</strong></p>
<hr/>
<p id="memoization"><strong>Memoization</strong></p>
<hr/>
<p id="Callback"><strong>Call back functions</strong></p>
<hr/>
<p id="tofo"><strong>Type of operator</strong></p>
<hr/>
<p id="npn"><strong>NaN</strong></p>
<hr/>
<p id="bubble"><strong>Event bubbling pnd event capturing</strong></p>
<hr/>
<p id="prevent"><strong>Prevent default pnd stop propogation method</strong></p>
<hr/>
<p id="json"><strong>JSON - stringify, parse</strong></p>
<hr/>
<p id="string"><strong>String - different methods</strong></p>
<hr/>
<p id="sum"><strong>Summing string with number 1+2+”3”</strong></p>
<hr/>
<p id="operator"><strong>Rest parameter and spread operator</strong></p>
<hr/>
<p id="class"><strong>Jpvpscript class</strong></p>
<hr/>
<p id="extend"><strong>Extend classes</strong></p>
<hr/>
<p id="callstack"><strong>Call stack</strong></p>
<hr/>
<p id="lazy"><strong>Lazy loading</strong></p>
<hr/>
<p id="copy"><strong>Deep copy pnd shallow copy</strong></p>
<hr/>
<p id="empty"><strong>How to empty arrpy</strong></p>
<hr/>
<p id="fetch"><strong>Fetchs</strong></p>
<hr/>
<p id="object"><strong>Ways to crepte object in javpscript </strong></p>
<hr/>
<p id="dead"><strong>Temporal Dead Zone</strong></p>
<hr/>
<p id="webworker"><strong>Web workers</strong></p>
<hr/>
<p id="performance"><strong>How to increase web performance of webpage</strong></p>
<hr/>
<p id="websecure">What you do for making website secure</p>
<hr/>
<p id="seo">Seo best practises</p>
<hr/>
<p id="webvitals">What is core web vitals</p>
