//link to sandbox: https://codesandbox.io/p/sandbox/ecstatic-poitras-kzqfsn?file=%2Fsrc%2FApp.js
// STATE DEFINE FOR SEARCH VALUE
// const [query, setQuery] =  useState("") 

// CREATE INPUT FIELD WHICH WILL CONTAIN THE onChange={(e)=>{setQuery(e.target.valu)}}

// CREATE A FUNCTION THAT WILL CHECK IF THE INPUT VALUE IS PART OF ARRAY VALUE: item.key.includes(query)

// WE WILL CONVERT INPUT VALUE AND VALUE OF ARRAY TO toLowerCase BEFORE CHECKING IF IT includes OR NOT
// array.key.toLowerCase().includes(query.toLowerCase())

// FUNCTION WILL LOOK LIKE THIS
// const filteredData = EMPLOYEES.filter((item)=>{item.name.toLowerCase().includes(query.toLowerCase())})

// WE WILL DISPLAY THIS FILTERED VALLUES IN UI
// <ul>{filteredData.map((item)=>(<li key={item.id}>{item.name}</li>))}</ul>

import { useState } from "react";
export default function App() {
  const EMPLOYEES = [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Bob Martinez",
      department: "Design",
    }
  ];
  const [query, setQuery] = useState("")
  const filteredData = EMPLOYEES.filter((item)=>(item.name.toLowerCase().includes(query.toLowerCase())))
  return (
    <div className="App">
     <input type="text" onChange={(e)=>{setQuery(e.target.value)}}/>
      <ul > { filteredData.map((item)=>
         (<li style={{listStyle:"none"}} value={query} key={item.id}>{item.name}</li> 
         ))}
      </ul>
    </div>
  );
}


