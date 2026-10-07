STEP 1
↓
Write synchronous output

STEP 2
↓
Create:
Microtask Queue
Task Queue

STEP 3
↓
Finish ALL synchronous code

STEP 4
↓
Drain Microtask Queue completely

STEP 5
↓
Take ONE Task

STEP 6
↓
Execute that Task

STEP 7
↓
Drain ALL Microtasks created by that Task

STEP 8
↓
Take next Task

STEP 9
↓
Repeat
