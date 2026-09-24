// https://jsfiddle.net/mwv25qcf/3/

let users = [
  {
    id: 1,
    name: 'Deepesh',
    age: 37,
  },
  {
    id: 2,
    name: 'Rahul',
    age: 30,
  },
]

const newUser = {
  id: 3,
  name: "Amit",
  age: 28,
};

// ADD
// → spread / concat

// UPDATE
// → map()

// DELETE
// → filter()

// FIND
// → find()

// FIND MANY
// → filter()

// ADD // → spread / concat
users = [...users, newUser]
// console.log(users)
 setUser(prev => [...prev, newUser]) //React version

// UPDATE // → map()
const x = users.map(item=> item.id===2?{...item,age:31}:item)
setUser(prev => prev.map(item=> item.id===2?{...item,age:31}:item)) //React version

users = [...x]
//console.log(users)

// DELETE // → filter()
const filteredArray = users.filter(user => user.id!=2)
setUsers(prev => prev.filter(user => user.id!=2)) //React
users = [...filteredArray]
console.log(users)
