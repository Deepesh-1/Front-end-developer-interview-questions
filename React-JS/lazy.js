// Result.js
//We need to import lazy and Suspense
import { lazy, Suspense, useState } from 'react';
import Loading from './Loading';
// Insted of normal import for the componen
//import Lazyloadcomponent from './Components/Lazyloading/Lazyloadcomponent'
// we need to use following format
//To defer loading this component’s code until it’s rendered for the first time, replace this import with:
// const SomeComponent = lazy(load) //load is function
//Do not declare lazy components inside other components
//Instead, always declare them at the top level of your module:
const Lazyloadcomponent = lazy(()=> delayForDemo(import('./Lazyloadcomponent')));
//load: A function that returns a Promise or another thenable (a Promise-like object with a then method). React will not call load until the first time you attempt to render the returned component. After React first calls load, it will wait for it to resolve, and then render the resolved value as a React component. Both the returned Promise and the Promise’s resolved value will be cached, so React will not call load more than once. If the Promise rejects, React will throw the rejection reason for the nearest Error Boundary to handle.
//lazy returns a React component you can render in your tree. While the code for the lazy component is still loading, attempting to render it will suspend.
function Result() {
  const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('');

//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };
  return (
    <div>
        {/* <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
      /> */}
      <button onClick={() => setLoading(true)}>Click Me</button>
     { loading &&
     // While the code for the lazy component is still loading, attempting to render it will suspend. Use <Suspense> to display a loading indicator while it’s loading.
    //  fallback will contain the component name which we need to show as fallback
    // Now that your component’s code loads on demand, you also need to specify what should be displayed while it is loading. You can do this by wrapping the lazy component or any of its parents into a <Suspense> boundary:
      <Suspense fallback={<Loading />}> 
        <Lazyloadcomponent/>
      </Suspense>
       }
    </div>
  );
}
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
export default Result;

//App.js

import './App.css';
// Lazy Loading component
import Result from './Components/Lazyloading/Result';
// Lazy Loading component
function App() {
  return (
    <div>
    {/* Lazy Loading component */}
   <Result/>
   {/* Lazy Loading component */}
   </div>
  );
}

export default App;


// loading.js

export default function Loading() {
  return (
   <div>...Loading</div>
  );
}
// Lazyloadcomponent.js
export default function Lazyloadcomponent() {
    return (
     <div>Some text...</div>
    );
  }
  
  
