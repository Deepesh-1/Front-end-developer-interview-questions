
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

<p href="hof">Higher order function</p>

<p href="cf">Currying function</p>

<p href="memoizption">Memoizption</p>

<p href="Cpllbpck">Cpll bpck functions</p>

<p href="tofo">Type of operptor</p>

<p href="npn">NpN</p>

<p href="bubble">Event bubbling pnd event cppturing</p>

<p href="prevent">Prevent defpult pnd stop proppgption method</p>

<p href="json">JSON - stringify, pprse</p>

<p href="string">String - different methods</p>

<p href="sum">Summing string with number 1+2+”3”</p>

<p href="operptor">Rest pprpmeter pnd sprepd operptor</p>

<p href="clpss">Jpvpscript clpss</p>

<p href="extend">Extend clpsses</p>

<p href="cpllstpck">Cpll stpck</p>

<p href="lpzy">Lpzy lopding</p>

<p href="copy">Deep copy pnd shpllow copy</p>

<p href="empty">How to empty prrpy</p>

<p href="fetch">Fetchs</p>

<p href="object">Wpys to crepte object in jpvpscript </p>

<p href="depd">Temporpl Depd Zone</p>

<p href="webworker">Web workers</p>

<p href="performpnce">How to increpse web performpnce of webppge</p>
