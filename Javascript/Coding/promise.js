const p1 = Promise.resolve("p1")
const p2 = Promise.resolve("p2")
const p3 = Promise.resolve("p3")

// Promise.all([p1,p2,p3]).then(result => console.log(result)).catch((error)=>console.log(error))
// all input promise should fulfill, rely on each other, output on success is array of pure resolved values ["p1", "p2", "p3"], [[PromiseState]]: "fulfilled" 
// if we one of them is rejected no output will come and it will show resolution condition as Promise {<rejected>: 'p2'}
// if we handle it with catch then it outputs the rejected value and promise condtion is fulfilled e.g reject("p3") so it gives output: p2
//and codition as Promise {<fulfilled>: undefined}

//  Promise.allSettled([p1,p2,p3]).then(result => console.log(result)).catch((error)=>console.log(error))

// Promise.any([p1,p2,p3]).then(result => console.log(result)).catch((error)=>console.log(error))
//Return first successfull promise: "p1" and condition: Promise {<fulfilled>: undefined}
// if we give all of them rejected then we will get output as : "AggregateError: All promises were rejected" and rejected contion. but with catch condition will come fullfill with same "AggregateError: All promises were rejected"

//Promise.race([p1,p2,p3]).then(result => console.log(result))
// first promise should be successfull or we can say resolve

