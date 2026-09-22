import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'C', price: 100 },
    { id: 2, name: 'B', price: 200 },
    { id: 3, name: 'A', price: 300 },
  ]);
  const [sortType, setSortType] = useState('ascending');

  const sortAsc = () => {
    const asc = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(asc);
  };
  const sortDesc = () => {
    const desc = [...users].sort((a, b) => b.name.localeCompare(a.name));
    setUsers(desc);
  };
  const toggleSort = () => {
    const toggleSortType = [...users].sort((a, b) =>
      sortType === 'ascending'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );
    setUsers(toggleSortType);
    setSortType((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
  };

  return (
    <div>
      <button onClick={sortAsc}>Ascending</button>
      <button onClick={sortDesc}>Descending</button>
      <button onClick={toggleSort}>ToggleSort</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
