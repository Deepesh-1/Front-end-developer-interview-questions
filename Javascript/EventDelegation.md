** In JavaScript, event propagation dictates the order in which event handlers fire when an event occurs on an element nested inside other elements. The lifecycle of a DOM event moves through three distinct phases: Capturing phase, Target phase, and Bubbling phase.
**
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

**Event bubbling(default)**
Event bubbling means that when an event fires on an element, it first runs the handlers on that specific element, then on its parent, and then all the way up its ancestors.
From the element to top : element -> Ancestor

child.addEventListener('click', () => console.log('Child Clicked!'));// "Child Clicked!" "Parent Clicked!" "grandparent Clicked!"
parent.addEventListener('click', () => console.log('Parent Clicked!'));//"Parent Clicked!" "grandparent Clicked!"
grandparent.addEventListener('click', () => console.log('grandparent Clicked!')); //"grandparent Clicked!"


Event capturing: Event is interscepted from ancestors element that is on top to the specific element and need to pass true or {capturing:true}
child.addEventListener('click', () => { console.log('Child Clicked!')});
"grandparent Clicked!" "Child Clicked!""Parent Clicked!"
// parent.addEventListener('click', () => console.log('Parent Clicked!'));
// // "grandparent Clicked!" "Parent Clicked!"
// grandparent.addEventLis

//Controlling Event Flow
//1. Stop Propagation (event.stopPropagation())
//If you want to prevent an event from moving up or down the DOM tree to trigger other listeners, you can call e.stopPropagation() inside your callback.tener('click', () =>console.log('grandparent Clicked!'),true); // "grandparent Clicked!"


// child.addEventListener('click', (e) => {e.stopPropagation();console.log('Child Clicked!')});// "Child Clicked!" 

// parent.addEventListener('click', (e) => {e.stopPropagation();console.log('Parent Clicked!')});//"Parent Clicked!" 

// grandparent.addEventListener('click', (e) => {e.stopPropagation();console.log('grandparent Clicked!')}); //"grandparent Clicked!"


// grandparent.addEventListener('click', (e) =>{e.stopPropagation();console.log('grandparent Clicked!')},true); // "grandparent Clicked!"
