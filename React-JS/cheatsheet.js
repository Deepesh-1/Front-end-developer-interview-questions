//Search functionality
const filteredData = data.filter((item)=>(item.name.toLowerCase().includes(query.toLowerCase())))
//Sorting functionality
 [...users].sort((a,b)=> a.name.localeCompare(b.name))
 [...users].sort((a,b)=> b.name.localeCompare(a.name))
//Sorting toggle
const [sortType, setSortType] = useState("ascending")
  const toggleSort = () => {
    const toggleSortType = [...users].sort((a, b) =>
      sortType === 'ascending'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );
    setUsers(toggleSortType);
    setSortType((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
  };
