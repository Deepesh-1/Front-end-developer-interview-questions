
**INDEX**

<a href="#closure">What are closure?</a>

<a href="variable">var, let and const </a>

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

You can find code here: https://jsfiddle.net/deepesh26/kfr65o48/85/

