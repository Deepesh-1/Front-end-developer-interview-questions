//link to sandbox: https://codesandbox.io/p/sandbox/ecstatic-poitras-kzqfsn?file=%2Fsrc%2FApp.js
import { useState } from "react";
export default function App() {
  const [data, setData] = [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Bob Martinez",
      department: "Design",
    },
  ];
  const [query, setQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="App">
      <input
        placeholder="Search products"
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <ul>
        {filteredData.map((item) => (
          <li style={{ listStyle: "none" }} value={query} key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
