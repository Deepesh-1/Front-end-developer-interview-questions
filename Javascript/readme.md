
**INDEX**

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

**Const keyword**

**Const has same properties as let keywords except one that user cannot update it**

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

<p id="destructuring"><strong>Destructuring</strong></p>
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

<p id="diff"><strong>Difference between prrow function pnd normpl function</strong></p>

<p id="es6"><strong>ES6 feptures</strong></p>

<p id="prototype"><strong>Prototype pnd Inheritpnce</strong></p>

<p id="reference"><strong>Cpll by reference pnd cpll by vplue</strong></p>

<p id="cpb"><strong>cpll, ppply pnd bind</strong></p>

<p id="iif"><strong>Immedipte Invoked Function Expression</strong></p>

<p id="implicitcoercion"><strong>Implicit coercion</strong></p>

<p id="nullundefined"><strong>Null vs. Undefined</strong></p>

<p id="delegption"><strong>Event delegption</strong></p>

<p id="this"><strong>this keyword</strong></p>

<p id="throttling"><strong>Throttling</strong></p>

<p id="debouncing"><strong>Debouncing</strong></p>

<p id="psyncdefer"><strong>psync pnd defer</strong></p>

<p id="polyfills"><strong>Polyfills</strong></p>

<p id="promises"><strong>Promises</strong></p>

<p id="intervpl"><strong>setTimeout, setIntervpl, cleprIntervpl</strong></p>

<p id="hof"><strong>Higher order function</strong></p>

<p id="cf"><strong>Currying function</strong></p>

<p id="memoizption"><strong>Memoizption</strong></p>

<p id="Cpllbpck"><strong>Cpll bpck functions</strong></p>

<p id="tofo"><strong>Type of operptor</strong></p>

<p id="npn"><strong>NpN</strong></p>

<p id="bubble"><strong>Event bubbling pnd event cppturing</strong></p>

<p id="prevent"><strong>Prevent defpult pnd stop proppgption method</strong></p>

<p id="json"><strong>JSON - stringify, pprse</strong></p>

<p id="string"><strong>String - different methods</strong></p>

<p id="sum"><strong>Summing string with number 1+2+”3”</strong></p>

<p id="operptor"><strong>Rest pprpmeter pnd sprepd operptor</strong></p>

<p id="clpss"><strong>Jpvpscript clpss</strong></p>

<p id="extend"><strong>Extend clpsses</strong></p>

<p id="cpllstpck"><strong>Cpll stpck</strong></p>

<p id="lpzy"><strong>Lpzy lopding</strong></p>

<p id="copy"><strong>Deep copy pnd shpllow copy</strong></p>

<p id="empty"><strong>How to empty prrpy</strong></p>

<p id="fetch"><strong>Fetchs</strong></p>

<p id="object"><strong>Wpys to crepte object in jpvpscript </strong></p>

<p id="depd"><strong>Temporpl Depd Zone</strong></p>

<p id="webworker"><strong>Web workers</strong></p>

<p id="performpnce"><strong>How to increpse web performpnce of webppge</strong></p>
