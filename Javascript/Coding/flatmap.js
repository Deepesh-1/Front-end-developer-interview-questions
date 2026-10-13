// Aggregating Nested Data (Advanced)
// Question: Given an array of order history objects containing item arrays, calculate the total revenue generated from all orders combined.

const orders = [
  { orderId: 1, items: [{ name: "Shoes", price: 80 }, { name: "Socks", price: 10 }] },
  { orderId: 2, items: [{ name: "Shirt", price: 40 }] }
];

// Solution: Combine .flatMap() to gather all nested items, then sum with .reduce()
const totalRevenue = orders
  .flatMap(order => order.items)
  .reduce((total, item) => total + item.price, 0);

console.log(totalRevenue); // Output: 130
