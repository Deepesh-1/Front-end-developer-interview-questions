const employees = [
  { name: "John", dept: "C", price: 100 },
  { name: "Jane", dept: "B" , price: 200},
  { name: "Mark", dept: "A", price: 300 }
];

// sorting
const priceSortAsc = [...employees].sort((a,b)=> (a-b))
const asc = [...employees].sort((a,b)=> a.dept.localeCompare(b.dept))
const desc = [...employees].sort((a,b)=> b.dept.localeCompare(a.dept))
console.log(priceSortAsc)
