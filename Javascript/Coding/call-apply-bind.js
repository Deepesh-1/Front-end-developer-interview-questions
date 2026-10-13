<script>
//  Call, Apply and Bind

// The call() allows for a function/method belonging to one object to be assigned and called for a different object.
// Function/Method defined here in object personWithThis or personWithParameter can be used by other object with the help of call method by calling
// Apply method takes argument as array or object depending on this is used or parameter is passed in the in the function
// Bind Method
// lets create bound function which wraps original function with object exmple
// let bound = person.fullName.bind(person2)
// console.log(bound()); //"Austin Deepesh"


// Uses of call(), apply(), and bind() in JavaScript
// - call(): Used for function borrowing — reusing a method from one object with another object, and explicitly setting this. execution: immediatly
// - apply(): Used for function borrowing with an array of arguments, especially when arguments are already available in an array. execution: immediatly
// - bind(): Used to preserve this for later execution, particularly in callbacks, event handlers, and asynchronous operations. execution: later

const personWithThis = {
  fullName : function(){
    return this.name +" "+ this.sirName
  }
}
const personWithParameter = {
  fullName : function(name, sirName){
    return name +" "+ sirName
  }
}

const person1 = {
  name: "deepesh",
  sirName : "sontakke"
}

// Call when this is is used in person or main object
console.log("Call with this",personWithThis.fullName.call(person1))

// Call when parameter used in person object
console.log(personWithParameter.fullName.call("","H", "S"))

// Apply when this is used in main object
// No object reference passed, instead of array object is passed when this is used in the main object here it is person
console.log("Apply with this", personWithThis.fullName.apply({name:"Hi", sirName: "Hello"})) 
// when i need to pass the array in the values then in that case main object should pass parameters

//Apply when parameter used in main object
// No object reference passed, instead of array object is passed
console.log(personWithParameter.fullName.apply("",['Hi', 'Hello'])) 

// Bind with personWithThis
let myName = personWithThis.fullName.bind(person1)
console.log("Bind with this",myName()) 

let bound = personWithParameter.fullName.bind()
console.log(bound("veda","sontakke"))
</script>


