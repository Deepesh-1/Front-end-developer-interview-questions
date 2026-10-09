ONE operation
    ↓
O(1)


ONE loop
    ↓
O(n)


TWO independent loops
    ↓
O(n + n)
    ↓
O(n)


NESTED loops
    ↓
O(n × n)
    ↓
O(n²)


3 nested loops
    ↓
O(n³)


DIVIDE BY 2 repeatedly
    ↓
O(log n)


PROCESS n elements at log n levels
    ↓
O(n log n)


CREATE array/set/map of n elements
    ↓
O(n) space


⭐ The sentence to use in an interview
When asked for complexity, say:
"I'll look at how the amount of work grows with the input size for time complexity, and how the additional memory grows with the input size for space complexity."


Only a few variables
    ↓
O(1) space
